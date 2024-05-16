// Component Imports
import Providers from '@components/Providers'
import { HorizontalNavProvider } from '@menu/contexts/horizontalNavContext'

const Layout = ({ children }) => {
  return (
    <Providers direction='ltr'>
      <HorizontalNavProvider>{children}</HorizontalNavProvider>
    </Providers>
  )
}

export default Layout
