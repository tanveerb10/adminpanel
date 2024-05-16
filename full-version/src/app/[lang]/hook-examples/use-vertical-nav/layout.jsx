// Context Imports
import { VerticalNavProvider } from '@menu/contexts/verticalNavContext'

const Layout = ({ children }) => {
  return <VerticalNavProvider>{children}</VerticalNavProvider>
}

export default Layout
