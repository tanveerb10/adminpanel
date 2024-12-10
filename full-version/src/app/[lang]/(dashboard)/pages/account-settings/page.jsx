// Next Imports
import dynamic from 'next/dynamic'

// Component Imports
import AccountSettings from '@views/pages/account-settings'

const AccountTab = dynamic(() => import('@views/pages/account-settings/account'))
const SecurityTab = dynamic(() => import('@views/pages/account-settings/security'))

// Vars
const tabContentList = () => ({
  account: <AccountTab />,
  security: <SecurityTab />
})

const AccountSettingsPage = () => {
  return <AccountSettings tabContentList={tabContentList()} />
}

export default AccountSettingsPage
