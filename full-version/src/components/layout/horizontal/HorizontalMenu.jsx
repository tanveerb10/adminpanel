// Do not remove this following 'use client' else SubMenu rendered in vertical menu on smaller screen will not work.
'use client'

// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Component Imports
import HorizontalNav, { Menu, SubMenu, MenuItem } from '@menu/horizontal-menu'
import VerticalNavContent from './VerticalNavContent'
import CustomChip from '@core/components/mui/Chip'

// import { GenerateHorizontalMenu } from '@components/GenerateMenu'
// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'
import { useSettings } from '@core/hooks/useSettings'
import {hasAbility} from "@/utils/hasAbility"

// Styled Component Imports
import StyledHorizontalNavExpandIcon from '@menu/styles/horizontal/StyledHorizontalNavExpandIcon'
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/horizontal/menuItemStyles'
import menuRootStyles from '@core/styles/horizontal/menuRootStyles'
import verticalNavigationCustomStyles from '@core/styles/vertical/navigationCustomStyles'
import verticalMenuItemStyles from '@core/styles/vertical/menuItemStyles'
import verticalMenuSectionStyles from '@core/styles/vertical/menuSectionStyles'

const RenderExpandIcon = ({ level }) => (
  <StyledHorizontalNavExpandIcon level={level}>
    <i className='tabler-chevron-right' />
  </StyledHorizontalNavExpandIcon>
)

const RenderVerticalExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const HorizontalMenu = ({ dictionary }) => {
  // Hooks
  const verticalNavOptions = useVerticalNav()
  const theme = useTheme()
  const { settings } = useSettings()
  const params = useParams()
  

  // Vars
  const { skin } = settings
  const { transitionDuration } = verticalNavOptions
  const { lang: locale, id } = params


  return (
    <HorizontalNav
      switchToVertical
      verticalNavContent={VerticalNavContent}
      verticalNavProps={{
        customStyles: verticalNavigationCustomStyles(verticalNavOptions, theme),
        backgroundColor:
          skin === 'bordered' ? 'var(--mui-palette-background-paper)' : 'var(--mui-palette-background-default)'
      }}
    >
      <Menu
        rootStyles={menuRootStyles(theme)}
        renderExpandIcon={({ level }) => <RenderExpandIcon level={level} />}
        menuItemStyles={menuItemStyles(settings, theme)}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        popoutMenuOffset={{
          mainAxis: ({ level }) => (level && level > 0 ? 14 : 12),
          alignmentAxis: 0
        }}
        verticalMenuProps={{
          menuItemStyles: verticalMenuItemStyles(verticalNavOptions, theme, settings),
          renderExpandIcon: ({ open }) => (
            <RenderVerticalExpandIcon open={open} transitionDuration={transitionDuration} />
          ),
          renderExpandedMenuItemIcon: { icon: <i className='tabler-circle text-xs' /> },
          menuSectionStyles: verticalMenuSectionStyles(verticalNavOptions, theme)
        }}
      >
        {hasAbility('dashboard') && (
          <SubMenu label={dictionary['navigation'].dashboards} icon={<i className='tabler-smart-home' />}>
            {hasAbility('summary') && (
              <MenuItem href={`/${locale}/dashboards/crm`} icon={<i className='tabler-chart-pie-2' />}>
                {dictionary['navigation'].summary}
              </MenuItem>
            )}
            {hasAbility('analytics') && (
              <MenuItem href={`/${locale}/dashboards/analytics`} icon={<i className='tabler-trending-up' />}>
                {dictionary['navigation'].analytics}
              </MenuItem>
            )}
            {hasAbility('reports') && (
              <MenuItem href={`/${locale}/dashboards/ecommerce`} icon={<i className='tabler-shopping-cart' />}>
                {dictionary['navigation'].reports}
              </MenuItem>
            )}
          </SubMenu>
        )}
        {hasAbility('admin') && (
          <SubMenu label={dictionary['navigation'].adminsection} icon={<i className='tabler-mail' />}>
            {/* <MenuItem href={`/${locale}/apps/calendar`} icon={<i className='tabler-calendar' />}>
            {dictionary['navigation'].adminusers}
          </MenuItem> */}
            <SubMenu label={dictionary['navigation'].admin} icon={<i className='tabler-file-description' />}>
              {hasAbility('adminusers') && (
                <MenuItem href={`/${locale}/apps/invoice/list`}>{dictionary['navigation'].adminusers}</MenuItem>
              )}
              {hasAbility('adminroles') && (
                <MenuItem href={`/${locale}/apps/invoice/preview/${id || '4987'}`}>
                  {dictionary['navigation'].adminroles}
                </MenuItem>
              )}
            </SubMenu>
            {hasAbility('customers') && (
              <SubMenu label={dictionary['navigation'].customers} icon={<i className='tabler-user' />}>
                {hasAbility('allcustomers') && (
                  <MenuItem href={`/${locale}/apps/user/list`}>{dictionary['navigation'].allcustomers}</MenuItem>
                )}
                {hasAbility('customersegment') && (
                  <MenuItem href={`/${locale}/apps/user/view`}>{dictionary['navigation'].customersegment}</MenuItem>
                )}
              </SubMenu>
            )}
            {/* <SubMenu label={dictionary['navigation'].rolesPermissions} icon={<i className='tabler-lock' />}>
            <MenuItem href={`/${locale}/apps/roles`}>{dictionary['navigation'].roles}</MenuItem>
            <MenuItem href={`/${locale}/apps/permissions`}>{dictionary['navigation'].permissions}</MenuItem>
          </SubMenu> */}
          </SubMenu>
        )}
          {hasAbility('products') && (
        <SubMenu label={dictionary['navigation'].productsection} icon={<i className='tabler-file' />}>
          {/* <MenuItem href={`/${locale}/pages/user-profile`} icon={<i className='tabler-user-circle' />}>
            {dictionary['navigation'].products}
          </MenuItem> */}
            <SubMenu label={dictionary['navigation'].products} icon={<i className='tabler-file-info' />}>
              {hasAbility('allproducts') && (
                <MenuItem href={`/${locale}/pages/misc/coming-soon`} target='_blank'>
                  {dictionary['navigation'].allproducts}
                </MenuItem>
              )}
              {hasAbility('categories') && (
                <MenuItem href={`/${locale}/pages/misc/under-maintenance`} target='_blank'>
                  {dictionary['navigation'].categories}
                </MenuItem>
              )}
              {hasAbility('bulkimport') && (
                <MenuItem href={`/${locale}/pages/misc/404-not-found`} target='_blank'>
                  {dictionary['navigation'].bulkimport}
                </MenuItem>
              )}
              {hasAbility('inventory') && (
                <MenuItem href={`/${locale}/pages/misc/401-not-authorized`} target='_blank'>
                  {dictionary['navigation'].inventory}
                </MenuItem>
              )}
              {hasAbility('metas') && (
                <MenuItem href={`/${locale}/pages/faq`} icon={<i className='tabler-help-circle' />}>
                  {dictionary['navigation'].metas}
                </MenuItem>
              )}
              {hasAbility('tags') && (
                <MenuItem href={`/${locale}/pages/pricing`} icon={<i className='tabler-currency-dollar' />}>
                  {dictionary['navigation'].tags}
                </MenuItem>
              )}
            </SubMenu>
          
          {hasAbility('offers') && (
            <SubMenu label={dictionary['navigation'].offers} icon={<i className='tabler-shield-lock' />}>
              {hasAbility('allcoupons') && (
                <MenuItem href={`/${locale}/pages/auth/login-v1`} target='_blank'>
                  {dictionary['navigation'].allcoupons}
                </MenuItem>
              )}
              {hasAbility('customercoupons') && (
                <MenuItem href={`/${locale}/pages/auth/login-v2`} target='_blank'>
                  {dictionary['navigation'].customercoupons}
                </MenuItem>
              )}

              {/* <SubMenu label={dictionary['navigation'].orders}>
              <MenuItem href={`/${locale}/pages/auth/register-v1`} target='_blank'>
                {dictionary['navigation'].allorders}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/register-v2`} target='_blank'>
                {dictionary['navigation'].bulkprocessing}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/register-multi-steps`} target='_blank'>
                {dictionary['navigation'].transactions}
              </MenuItem>
              
            </SubMenu>
            <SubMenu label={dictionary['navigation'].verifyEmail}>
              <MenuItem href={`/${locale}/pages/auth/verify-email-v1`} target='_blank'>
                {dictionary['navigation'].verifyEmailV1}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/verify-email-v2`} target='_blank'>
                {dictionary['navigation'].verifyEmailV2}
              </MenuItem>
            </SubMenu>
            <SubMenu label={dictionary['navigation'].forgotPassword}>
              <MenuItem href={`/${locale}/pages/auth/forgot-password-v1`} target='_blank'>
                {dictionary['navigation'].forgotPasswordV1}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/forgot-password-v2`} target='_blank'>
                {dictionary['navigation'].forgotPasswordV2}
              </MenuItem>
            </SubMenu>
           
            <SubMenu label={dictionary['navigation'].twoSteps}>
              <MenuItem href={`/${locale}/pages/auth/two-steps-v1`} target='_blank'>
                {dictionary['navigation'].twoStepsV1}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/two-steps-v2`} target='_blank'>
                {dictionary['navigation'].twoStepsV2}
              </MenuItem>
            </SubMenu> */}
            </SubMenu>
          )}
          {hasAbility('orders') && (
            <SubMenu label={dictionary['navigation'].orders} icon={<i className='tabler-dots' />}>
              {hasAbility('allorders') && (
                <MenuItem href={`/${locale}/pages/wizard-examples/checkout`}>
                  {dictionary['navigation'].allorders}
                </MenuItem>
              )}
              {hasAbility('bulkprocessing') && (
                <MenuItem href={`/${locale}/pages/wizard-examples/property-listing`}>
                  {dictionary['navigation'].bulkprocessing}
                </MenuItem>
              )}
              {hasAbility('transactions') && (
                <MenuItem href={`/${locale}/pages/wizard-examples/create-deal`}>
                  {dictionary['navigation'].transactions}
                </MenuItem>
              )}
              {hasAbility('archivedorders') && (
                <MenuItem href={`/${locale}/pages/account-settings`} icon={<i className='tabler-settings' />}>
                  {dictionary['navigation'].archivedorders}
                </MenuItem>
              )}
            </SubMenu>
          )}
          {hasAbility('taxes') && (
            <SubMenu label={dictionary['navigation'].taxes}>
              {hasAbility('taxrate') && (
                <MenuItem href={`/${locale}/pages/auth/reset-password-v1`} target='_blank'>
                  {dictionary['navigation'].taxrate}
                </MenuItem>
              )}
              {hasAbility('taxgroup') && (
                <MenuItem href={`/${locale}/pages/auth/reset-password-v2`} target='_blank'>
                  {dictionary['navigation'].taxgroup}
                </MenuItem>
              )}
            </SubMenu>
          )}
        </SubMenu>)}
        {hasAbility('cms') && (
          <SubMenu label={dictionary['navigation'].cmssection} icon={<i className='tabler-file-invoice' />}>
            {hasAbility('storesetup') && (
              <MenuItem href={`/${locale}/forms/form-layouts`} icon={<i className='tabler-layout' />}>
                {dictionary['navigation'].storesetup}
              </MenuItem>
            )}
            {hasAbility('style') && (
              <MenuItem href={`/${locale}/forms/form-validation`} icon={<i className='tabler-checkup-list' />}>
                {dictionary['navigation'].style}
              </MenuItem>
            )}
            {hasAbility('banners') && (
              <MenuItem href={`/${locale}/forms/form-wizard`} icon={<i className='tabler-git-merge' />}>
                {dictionary['navigation'].banners}
              </MenuItem>
            )}
            {hasAbility('stories') && (
              <MenuItem href={`/${locale}/react-table`} icon={<i className='tabler-table' />}>
                {dictionary['navigation'].stories}
              </MenuItem>
            )}
            {hasAbility('seo') && (
              <MenuItem href={`/${locale}/pages/widget-examples/basic`}>{dictionary['navigation'].seo}</MenuItem>
            )}
            {hasAbility('pages') && (
              <MenuItem href={`/${locale}/pages/widget-examples/advanced`}>{dictionary['navigation'].pages}</MenuItem>
            )}
            {hasAbility('media') && (
              <MenuItem href={`/${locale}/pages/widget-examples/statistics`}>{dictionary['navigation'].media}</MenuItem>
            )}
            {hasAbility('google') && (
              <MenuItem href={`/${locale}/pages/widget-examples/charts`}>{dictionary['navigation'].google}</MenuItem>
            )}
            {hasAbility('facebook') && (
              <MenuItem href={`/${locale}/pages/widget-examples/actions`}>{dictionary['navigation'].facebook}</MenuItem>
            )}
            {hasAbility('socialprofiles') && (
              <MenuItem href={`/${locale}/pages/dialog-examples`} icon={<i className='tabler-square' />}>
                {dictionary['navigation'].socialprofiles}
              </MenuItem>
            )}
          </SubMenu>
        )}
        {hasAbility('email') && (
          <SubMenu label={dictionary['navigation'].notificationsection} icon={<i className='tabler-chart-donut-2' />}>
            <SubMenu label={dictionary['navigation'].email} icon={<i className='tabler-file-description' />}>
              {hasAbility('smtp') && (
                <MenuItem href={`/${locale}/apps/invoice/list`}>{dictionary['navigation'].smtpsettings}</MenuItem>
              )}
              {hasAbility('templates') && (
                <MenuItem href={`/${locale}/apps/invoice/preview/${id || '4987'}`}>
                  {dictionary['navigation'].templates}
                </MenuItem>
              )}
              {hasAbility('sendemails') && (
                <MenuItem href={`/${locale}/apps/invoice/edit/${id || '4987'}`}>
                  {dictionary['navigation'].sendemails}
                </MenuItem>
              )}
            </SubMenu>
            {hasAbility('notifications') && (
              <SubMenu label={dictionary['navigation'].notifications} icon={<i className='tabler-user' />}>
                {hasAbility('firebasesetup') && (
                  <MenuItem href={`/${locale}/apps/user/list`}>{dictionary['navigation'].firebasesetup}</MenuItem>
                )}
                {hasAbility('smstemplates') && (
                  <MenuItem href={`/${locale}/apps/user/view`}>{dictionary['navigation'].smstemplates}</MenuItem>
                )}
                {hasAbility('sendnotification') && (
                  <MenuItem href={`/${locale}/apps/invoice/add`}>{dictionary['navigation'].sendnotifications}</MenuItem>
                )}
              </SubMenu>
            )}
            {hasAbility('sms') && (
              <SubMenu label={dictionary['navigation'].sms} icon={<i className='tabler-lock' />}>
                {hasAbility('smssetup') && (
                  <MenuItem href={`/${locale}/charts/apex-charts`} icon={<i className='tabler-chart-ppf' />}>
                    {dictionary['navigation'].smssetup}
                  </MenuItem>
                )}
                {hasAbility('smstemplates') && (
                  <MenuItem href={`/${locale}/charts/recharts`} icon={<i className='tabler-chart-sankey' />}>
                    {dictionary['navigation'].smstemplate}
                  </MenuItem>
                )}
              </SubMenu>
            )}
          </SubMenu>
        )}
        {hasAbility('payments') && (
          <SubMenu label={dictionary['navigation'].paymentsection} icon={<i className='tabler-dots' />}>
            <SubMenu label={dictionary['navigation'].payments} icon={<i className='tabler-file-description' />}>
              {hasAbility('cashondelivery') && (
                <MenuItem href={`/${locale}/apps/invoice/list`}>{dictionary['navigation'].cashondelivery}</MenuItem>
              )}
              {hasAbility('razorpay') && (
                <MenuItem href={`/${locale}/apps/invoice/preview/${id || '4987'}`}>
                  {dictionary['navigation'].razorpay}
                </MenuItem>
              )}
              {hasAbility('phonepe') && (
                <MenuItem href={`/${locale}/apps/invoice/edit/${id || '4987'}`}>
                  {dictionary['navigation'].phonepe}
                </MenuItem>
              )}
            </SubMenu>
            {hasAbility('shipping') && (
              <SubMenu label={dictionary['navigation'].shipping} icon={<i className='tabler-user' />}>
                {hasAbility('shippingzones') && (
                  <MenuItem href={`/${locale}/apps/user/list`}>{dictionary['navigation'].shippingzones}</MenuItem>
                )}
                {hasAbility('shippingcharges') && (
                  <MenuItem href={`/${locale}/apps/user/view`}>{dictionary['navigation'].shippingcharges}</MenuItem>
                )}
                {hasAbility('pincodes') && (
                  <MenuItem href={`/${locale}/apps/invoice/add`}>{dictionary['navigation'].pincodes}</MenuItem>
                )}
              </SubMenu>
            )}
            {hasAbility('shippers') && (
              <SubMenu label={dictionary['navigation'].shippers} icon={<i className='tabler-lock' />}>
                {hasAbility('delhivery') && (
                  <MenuItem href={`/${locale}/apps/roles`}>{dictionary['navigation'].delhiverysetup}</MenuItem>
                )}
                {hasAbility('bluedart') && (
                  <MenuItem href={`/${locale}/apps/permissions`}>{dictionary['navigation'].bluedartsetup}</MenuItem>
                )}
                {hasAbility('shiprocket') && (
                  <MenuItem href={`/${locale}/apps/permissions`}>{dictionary['navigation'].shiprocketsetup}</MenuItem>
                )}
                {hasAbility('shipdelight') && (
                  <MenuItem href={`/${locale}/apps/permissions`}>{dictionary['navigation'].shipdelightsetup}</MenuItem>
                )}
              </SubMenu>
            )}
          </SubMenu>
        )}
      </Menu>
      {/* <Menu
          rootStyles={menuRootStyles(theme)}
          renderExpandIcon={({ level }) => <RenderExpandIcon level={level} />}
          menuItemStyles={menuItemStyles(settings, theme)}
          renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
          popoutMenuOffset={{
            mainAxis: ({ level }) => (level && level > 0 ? 14 : 12),
            alignmentAxis: 0
          }}
          verticalMenuProps={{
            menuItemStyles: verticalMenuItemStyles(verticalNavOptions, theme, settings),
            renderExpandIcon: ({ open }) => (
              <RenderVerticalExpandIcon open={open} transitionDuration={transitionDuration} />
            ),
            renderExpandedMenuItemIcon: { icon: <i className='tabler-circle text-xs' /> },
            menuSectionStyles: verticalMenuSectionStyles(verticalNavOptions, theme)
          }}
        >
          <GenerateHorizontalMenu menuData={menuData(dictionary, params)} />
        </Menu> */}
    </HorizontalNav>
  )
}

export default HorizontalMenu
