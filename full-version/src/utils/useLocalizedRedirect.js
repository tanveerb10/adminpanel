import { useRouter, useParams } from 'next/navigation'
import { getLocalizedUrl } from '@/utils/i18n'

const useLocalizedRedirect = () => {
  const { lang: locale } = useParams() // Get locale from route parameters
  const router = useRouter() // Get router instance

  const redirect = url => {
    const localizedUrl = getLocalizedUrl(url, locale) // Generate localized URL
    router.push(localizedUrl) // Perform redirect
  }

  return redirect // Return the redirect function
}

export default useLocalizedRedirect
