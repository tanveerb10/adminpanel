// Context Imports

import { QueryProvider } from '@/contexts/AuthProvider'
import { VerticalNavProvider } from '@menu/contexts/verticalNavContext'
import { SettingsProvider } from '@core/contexts/settingsContext'
import ThemeProvider from '@components/theme'
import { AuthProvider } from '@/contexts/AuthContext'
import { ProductProvider } from '@/views/products/allproducts/productContext/ProductStateManagement'
// Config Imports
import themeConfig from '@configs/themeConfig'

// Styled Component Imports
import AppReactToastify from '@/libs/styles/AppReactToastify'

// Util Imports
import { getDemoName, getMode, getSettingsFromCookie, getSystemMode } from '@core/utils/serverHelpers'

const Providers = props => {
  // Props
  const { children, direction } = props

  // Vars
  const mode = getMode()
  const settingsCookie = getSettingsFromCookie()
  const demoName = getDemoName()
  const systemMode = getSystemMode()

  return (
    <QueryProvider>
      <VerticalNavProvider>
        <AuthProvider>
          <SettingsProvider settingsCookie={settingsCookie} mode={mode} demoName={demoName}>
            <ThemeProvider direction={direction} systemMode={systemMode}>
              <ProductProvider>
                {children}
                <AppReactToastify position={themeConfig.toastPosition} hideProgressBar />
              </ProductProvider>
            </ThemeProvider>
          </SettingsProvider>
        </AuthProvider>
      </VerticalNavProvider>
    </QueryProvider>
  )
}

export default Providers
