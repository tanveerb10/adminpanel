// Next Imports
import { NextResponse } from 'next/server'

// Third-party Imports
import Negotiator from 'negotiator'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import CryptoJS from 'crypto-js'

// Config Imports
import { i18n } from '@configs/i18n'

// Util Imports
import { getLocalizedUrl, isUrlMissingLocale } from '@/utils/i18n'
import { ensurePrefix, withoutSuffix } from '@/utils/string'
import { apiClient } from '@/utils/apiClient'

// Constants
const HOME_PAGE_URL = '/dashboards/crm'
const VERIFY_TOKEN_API_URL = '/admin/admins/protected'

const getLocale = request => {
  const urlLocale = i18n.locales.find(locale => request.nextUrl.pathname.startsWith(`/${locale}`))

  if (urlLocale) return urlLocale

  const negotiatorHeaders = {}

  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  const locales = i18n.locales
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales)
  const locale = matchLocale(languages, locales, i18n.defaultLocale)

  return locale
}

const localizedRedirect = (url, locale, request) => {
  let _url = url
  const isLocaleMissing = isUrlMissingLocale(_url)

  if (isLocaleMissing) {
    _url = getLocalizedUrl(_url, locale ?? i18n.defaultLocale)
  }

  let _basePath = process.env.BASEPATH ?? ''

  _basePath = _basePath.replace('demo-1', request.headers.get('X-server-header') ?? 'demo-1')

  _url = ensurePrefix(_url, `${_basePath ?? ''}`)
  const redirectUrl = new URL(_url, request.url).toString()

  return NextResponse.redirect(redirectUrl)
}

export async function middleware(request) {
  const locale = getLocale(request)
  const pathname = request.nextUrl.pathname
  const { cookies } = request
  const token = cookies.get('accessToken')?.value || ''
  let isUserLoggedIn = !!token

  if (token) {
    const secret = process.env.NEXT_PUBLIC_SECRET_KEY
    const payloaddata = JSON.stringify({})
    const nonce = CryptoJS.lib.WordArray.random(16).toString()
    const timestamp = Date.now().toString()
    const generateSignature = (payloaddata, secret, nonce, timestamp) => {
      const payload = `${payloaddata}|${nonce}|${timestamp}`
      return CryptoJS.HmacSHA256(payload, secret).toString(CryptoJS.enc.Hex)
    }

    const signature = generateSignature(payloaddata, secret, nonce, timestamp)
    // console.log(signature)
    try {
      const response = await apiClient.post(
        VERIFY_TOKEN_API_URL,
        {},
        {
          headers: {
            'livein-key': 'livein-key',
            "Nonce": nonce,
            "Timestamp": timestamp,
            "Signature": signature,
            'Cookie': `accessToken=${token}`,
          }
        }
      )
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const verificationResponse = response.data
      isUserLoggedIn = verificationResponse.success

      if (!isUserLoggedIn) {
        console.log('Login unsuccessful (verification failed)')
        isUserLoggedIn = false
      }

      console.log('Login successful')
    } catch (error) {
      console.error('Verification Error:', error)
      isUserLoggedIn = false
    }
  }

  console.log('Is User Logged In: ', isUserLoggedIn)
  
  // Guest routes (Routes that can be accessed by guest users who are not logged in)
  const guestRoutes = ['login', 'register', 'forgot-password']

  // Private routes (All routes except guest routes that can only be accessed by logged in users)
  const privateRoutes = !guestRoutes.some(route => pathname.endsWith(route))

  // If the user is not logged in and is trying to access a private route, redirect to the login page
  if (!isUserLoggedIn && privateRoutes) {
    let redirectUrl = '/login'

    if (!(pathname === '/' || pathname === `/${locale}`)) {
      const searchParamsStr = new URLSearchParams({ redirectTo: withoutSuffix(pathname, '/') }).toString()

      redirectUrl += `?${searchParamsStr}`
    }

    return localizedRedirect(redirectUrl, locale, request)
  }

  // If the user is logged in and is trying to access a guest route, redirect to the home page
  const isRequestedRouteIsGuestRoute = guestRoutes.some(route => pathname.endsWith(route))

  if (isUserLoggedIn && isRequestedRouteIsGuestRoute) {
    return localizedRedirect(HOME_PAGE_URL, locale, request)
  }

  // If the user is logged in and is trying to access the root page, redirect to the home page
  if (pathname === '/' || pathname === `/${locale}`) {
    return localizedRedirect(HOME_PAGE_URL, locale, request)
  }

  // If pathname already contains a locale, return next() else redirect with localized URL
  return isUrlMissingLocale(pathname) ? localizedRedirect(pathname, locale, request) : NextResponse.next()
}

// Matcher Config
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - all items inside the public folder
     *    - images (public images)
     *    - next.svg (Next.js logo)
     *    - vercel.svg (Vercel logo)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.+?/hook-examples|.+?/menu-examples|images|next.svg|vercel.svg).*)'
  ]
}

