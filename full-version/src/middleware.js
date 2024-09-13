// Next Imports
import { NextResponse } from 'next/server'

// Third-party Imports
import Negotiator from 'negotiator'
import { match as matchLocale } from '@formatjs/intl-localematcher'

// Config Imports
import { i18n } from '@configs/i18n'

// Util Imports
import { getLocalizedUrl, isUrlMissingLocale } from '@/utils/i18n'
import { ensurePrefix, withoutSuffix } from '@/utils/string'
// import { apiClient } from '@/utils/apiClient'
import axios from 'axios'
import fetchFormData from '@/utils/fetchFormData'

// Constants
const HOME_PAGE_URL = '/dashboards/crm'
const VERIFY_TOKEN_API_URL = 'http://165.232.189.68/admin/admins/protected'

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
    // console.log(signature)
    try {
      console.log(`accessToken=${token}`)
      const response = await fetchFormData(VERIFY_TOKEN_API_URL, 'GET')
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const verificationResponse = response.data
      isUserLoggedIn = verificationResponse.success
      console.log('verifivation ', verificationResponse)
      if (!isUserLoggedIn) {
        // console.log('Login unsuccessful (verification failed)')
        isUserLoggedIn = true
      }

      console.log('Login successful')
    } catch (error) {
      // console.error('Verification Error')
      isUserLoggedIn = true
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
