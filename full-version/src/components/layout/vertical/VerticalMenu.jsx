'use client'

// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'
import CustomChip from '@core/components/mui/Chip'

// import { GenerateVerticalMenu } from '@components/GenerateMenu'
// Hook Imports
import { useSettings } from '@core/hooks/useSettings'
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'
import { hasAbility } from '@/utils/hasAbility'

const RenderExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ dictionary, scrollMenu }) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const { settings } = useSettings()
  const params = useParams()
  const { isBreakpointReached, transitionDuration } = verticalNavOptions

  // Vars
  // const { transitionDuration } = verticalNavOptions
  const { lang: locale } = params
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        {hasAbility('dashboard') && (
          <SubMenu
            label={dictionary['navigation'].dashboards}
            icon={<i className='tabler-dashboard' />}
            suffix={<CustomChip label='3' size='small' color='error' round='true' />}
          >
            {hasAbility('summary') && (
              <MenuItem href={`/${locale}/dashboards/crm`}>{dictionary['navigation'].summary}</MenuItem>
            )}
            {hasAbility('analytics') && (
              <MenuItem href={`/${locale}/dashboards/analytics`}>{dictionary['navigation'].analytics}</MenuItem>
            )}
            {hasAbility('reports') && (
              <MenuItem href={`/${locale}/dashboards/ecommerce`}>{dictionary['navigation'].reports}</MenuItem>
            )}
          </SubMenu>
        )}
        {hasAbility('admin') && (
          <MenuSection label={dictionary['navigation'].adminsection}>
            <SubMenu label={dictionary['navigation'].admin} icon={<i className='tabler-user-check' />}>
              {hasAbility('adminusers') && (
                <MenuItem href={`/${locale}/admin/adminusers`}>{dictionary['navigation'].adminusers}</MenuItem>
              )}
              {hasAbility('adminroles') && (
                <MenuItem href={`/${locale}/admin/adminroles`}>{dictionary['navigation'].adminroles}</MenuItem>
              )}
            </SubMenu>
          </MenuSection>
        )}

        {hasAbility('customers') && (
          <MenuSection label={dictionary['navigation'].customersection}>
            <SubMenu label={dictionary['navigation'].customers} icon={<i className='tabler-user' />}>
              {hasAbility('allcustomers') && (
                <MenuItem href={`/${locale}/customers/allcustomers`}>{dictionary['navigation'].allcustomers}</MenuItem>
              )}
              {hasAbility('customersegment') && (
                <MenuItem href={`/${locale}/customers/customersegment`}>
                  {dictionary['navigation'].customersegment}
                </MenuItem>
              )}
            </SubMenu>
          </MenuSection>
        )}
        {hasAbility('products') && (
          <MenuSection label={dictionary['navigation'].productsection}>
            <SubMenu label={dictionary['navigation'].products} icon={<i className='tabler-box' />}>
              {hasAbility('allproducts') && (
                <MenuItem href={`/${locale}/products/allproducts`}>{dictionary['navigation'].allproducts}</MenuItem>
              )}
              {hasAbility('brands') && (
                <MenuItem href={`/${locale}/products/brands`}>{dictionary['navigation'].brands}</MenuItem>
              )}
              {hasAbility('categories') && (
                <MenuItem href={`/${locale}/products/categories`}>{dictionary['navigation'].categories}</MenuItem>
              )}

              {hasAbility('bulkimport') && (
                <MenuItem href={`/${locale}/products/bulkimport`}>{dictionary['navigation'].bulkimport}</MenuItem>
              )}
              {hasAbility('inventory') && (
                <MenuItem href={`/${locale}/products/inventory`}>{dictionary['navigation'].inventory}</MenuItem>
              )}
              {hasAbility('metas') && (
                <MenuItem href={`/${locale}/products/metas`}>{dictionary['navigation'].metas}</MenuItem>
              )}
              {/* {hasAbility('productfilter') && ( */}
              <MenuItem href={`/${locale}/products/productfilter`}>{dictionary['navigation'].productfilter}</MenuItem>
              {/* )} */}
              {hasAbility('tags') && (
                <MenuItem href={`/${locale}/products/tags`}>{dictionary['navigation'].tags}</MenuItem>
              )}
            </SubMenu>
          </MenuSection>
        )}
        {hasAbility('offers') && (
          <MenuSection label={dictionary['navigation'].offersection}>
            <SubMenu label={dictionary['navigation'].offers} icon={<i className='tabler-gift' />}>
              {hasAbility('allcoupons') && (
                <MenuItem href={`/${locale}/offers/allcoupons`}>{dictionary['navigation'].allcoupons}</MenuItem>
              )}
              {hasAbility('customercoupons') && (
                <MenuItem href={`/${locale}/offers/customercoupons`}>
                  {dictionary['navigation'].customercoupons}
                </MenuItem>
              )}
            </SubMenu>
          </MenuSection>
        )}
        {hasAbility('orders') && (
          <MenuSection label={dictionary['navigation'].ordersection}>
            <SubMenu label={dictionary['navigation'].orders} icon={<i className='tabler-package' />}>
              {hasAbility('allorders') && (
                <MenuItem href={`/${locale}/orders/allorders`}>{dictionary['navigation'].allorders}</MenuItem>
              )}
              {hasAbility('bulkprocessing') && (
                <MenuItem href={`/${locale}/orders/bulkprocessing`}>{dictionary['navigation'].bulkprocessing}</MenuItem>
              )}
              {hasAbility('transactions') && (
                <MenuItem href={`/${locale}/orders/transactions`}>{dictionary['navigation'].transactions}</MenuItem>
              )}
              {hasAbility('archivedorders') && (
                <MenuItem href={`/${locale}/orders/archivedorders`}>{dictionary['navigation'].archivedorders}</MenuItem>
              )}
            </SubMenu>
          </MenuSection>
        )}
        {hasAbility('cms') && (
          <MenuSection label={dictionary['navigation'].cmssection}>
            <SubMenu label={dictionary['navigation'].cms} icon={<i className='tabler-shield-lock' />}>
              {hasAbility('storesetup') && (
                <MenuItem href={`/${locale}/cms/storesetup`}>{dictionary['navigation'].storesetup}</MenuItem>
              )}
              {hasAbility('style') && (
                <MenuItem href={`/${locale}/cms/style`}>{dictionary['navigation'].style}</MenuItem>
              )}
              {hasAbility('banners') && (
                <MenuItem href={`/${locale}/cms/banners`}>{dictionary['navigation'].banners}</MenuItem>
              )}
              {hasAbility('stories') && (
                <MenuItem href={`/${locale}/cms/stories`}>{dictionary['navigation'].stories}</MenuItem>
              )}
              {hasAbility('seo') && <MenuItem href={`/${locale}/cms/seo`}>{dictionary['navigation'].seo}</MenuItem>}
              {hasAbility('pages') && (
                <MenuItem href={`/${locale}/cms/pages`}>{dictionary['navigation'].pages}</MenuItem>
              )}
              {hasAbility('media') && (
                <MenuItem href={`/${locale}/cms/media`}>{dictionary['navigation'].media}</MenuItem>
              )}

              {hasAbility('google') && (
                <MenuItem href={`/${locale}/cms/google`}>{dictionary['navigation'].google}</MenuItem>
              )}
              {hasAbility('facebook') && (
                <MenuItem href={`/${locale}/cms/facebook`}>{dictionary['navigation'].facebook}</MenuItem>
              )}

              {hasAbility('socialprofiles') && (
                <MenuItem href={`/${locale}/cms/socialprofiles`}>{dictionary['navigation'].socialprofiles}</MenuItem>
              )}
            </SubMenu>
          </MenuSection>
        )}
        {hasAbility('payments') && (
          <MenuSection label={dictionary['navigation'].paymentsection}>
            <SubMenu label={dictionary['navigation'].payments} icon={<i className='tabler-credit-card' />}>
              {hasAbility('cashondelivery') && (
                <MenuItem href={`/${locale}/payments/cashondelivery`}>
                  {dictionary['navigation'].cashondelivery}
                </MenuItem>
              )}

              {hasAbility('razorpay') && (
                <MenuItem href={`/${locale}/payments/razorpay`}>{dictionary['navigation'].razorpay}</MenuItem>
              )}
              {hasAbility('phonepe') && (
                <MenuItem href={`/${locale}/payments/phonepe`}>{dictionary['navigation'].phonepe}</MenuItem>
              )}
            </SubMenu>
          </MenuSection>
        )}
        {hasAbility('shipping') && (
          <MenuSection label={dictionary['navigation'].shippingsection}>
            <SubMenu label={dictionary['navigation'].shipping} icon={<i className='tabler-truck' />}>
              {hasAbility('shippingzones') && (
                <MenuItem href={`/${locale}/shipping/shippingzones`}>{dictionary['navigation'].shippingzones}</MenuItem>
              )}
              {hasAbility('shippingcharges') && (
                <MenuItem href={`/${locale}/shipping/shippingcharges`} icon={<i className='tabler-square' />}>
                  {dictionary['navigation'].shippingcharges}
                </MenuItem>
              )}
              {hasAbility('pincodes') && (
                <MenuItem href={`/${locale}/shipping/pincodes`}>{dictionary['navigation'].pincodes}</MenuItem>
              )}
            </SubMenu>
          </MenuSection>
        )}
        {hasAbility('taxes') && (
          <MenuSection label={dictionary['navigation'].taxsection}>
            <SubMenu label={dictionary['navigation'].taxes} icon={<i className='tabler-calculator' />}>
              {hasAbility('taxrate') && (
                <MenuItem href={`/${locale}/taxes/taxrate`}>{dictionary['navigation'].taxrate}</MenuItem>
              )}
              {hasAbility('taxgroup') && (
                <MenuItem href={`/${locale}/taxes/taxgroup`}>{dictionary['navigation'].taxgroup}</MenuItem>
              )}
            </SubMenu>
          </MenuSection>
        )}
        {hasAbility('email') && (
          <MenuSection label={dictionary['navigation'].emailsection}>
            <SubMenu label={dictionary['navigation'].email} icon={<i className='tabler-mail' />}>
              {hasAbility('smtp') && (
                <MenuItem href={`/${locale}/email/smtpsettings`}>{dictionary['navigation'].smtpsettings}</MenuItem>
              )}
              {hasAbility('templates') && (
                <MenuItem href={`/${locale}/email/templates`}>{dictionary['navigation'].templates}</MenuItem>
              )}
              {hasAbility('sendemails') && (
                <MenuItem href={`/${locale}/email/sendemails`}>{dictionary['navigation'].sendemails}</MenuItem>
              )}
            </SubMenu>
          </MenuSection>
        )}

        {hasAbility('notifications') && (
          <MenuSection label={dictionary['navigation'].notificationsection}>
            <SubMenu label={dictionary['navigation'].notifications} icon={<i className='tabler-bell' />}>
              {hasAbility('firebasesetup') && (
                <MenuItem href={`/${locale}/notifications/firebasesetup`} icon={<i className='tabler-git-merge' />}>
                  {dictionary['navigation'].firebasesetup}
                </MenuItem>
              )}
              {hasAbility('smstemplates') && (
                <MenuItem href={`/${locale}/notifications/smstemplates`} icon={<i className='tabler-table' />}>
                  {dictionary['navigation'].smstemplates}
                </MenuItem>
              )}
              {hasAbility('sendnotification') && (
                <MenuItem icon={<i className='tabler-checkbox' />} href={`/${locale}/notifications/sendnotifications`}>
                  {dictionary['navigation'].sendnotifications}
                </MenuItem>
              )}
            </SubMenu>
          </MenuSection>
        )}
        {hasAbility('sms') && (
          <MenuSection label={dictionary['navigation'].smssection}>
            <SubMenu label={dictionary['navigation'].sms} icon={<i className='tabler-message-circle' />}>
              {hasAbility('smssetup') && (
                <MenuItem href={`/${locale}/sms/smssetup`}>{dictionary['navigation'].smssetup}</MenuItem>
              )}
              {hasAbility('smstemplates') && (
                <MenuItem href={`/${locale}/sms/smstemplate`}>{dictionary['navigation'].smstemplate}</MenuItem>
              )}
            </SubMenu>
          </MenuSection>
        )}
        {hasAbility('shippers') && (
          <MenuSection label={dictionary['navigation'].shippersection}>
            <SubMenu label={dictionary['navigation'].shippers} icon={<i className='tabler-package' />}>
              {hasAbility('delhivery') && (
                <MenuItem icon={<i className='tabler-checkbox' />} href={`/${locale}/shippers/delhiverysetup`}>
                  {dictionary['navigation'].delhiverysetup}
                </MenuItem>
              )}
              {hasAbility('bluedart') && (
                <MenuItem icon={<i className='tabler-checkbox' />} href={`/${locale}/shippers/bluedartsetup`}>
                  {dictionary['navigation'].bluedartsetup}
                </MenuItem>
              )}
              {hasAbility('shiprocket') && (
                <MenuItem icon={<i className='tabler-checkbox' />} href={`/${locale}/shippers/shiprocketsetup`}>
                  {dictionary['navigation'].shiprocketsetup}
                </MenuItem>
              )}
              {hasAbility('shipdelight') && (
                <MenuItem icon={<i className='tabler-checkbox' />} href={`/${locale}/shippers/shipdelightsetup`}>
                  {dictionary['navigation'].shipdelightsetup}
                </MenuItem>
              )}
            </SubMenu>
          </MenuSection>
        )}
      </Menu>
      {/* <Menu
          popoutMenuOffset={{ mainAxis: 23 }}
          menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)}
          renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
          renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
          menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
        >
          <GenerateVerticalMenu menuData={menuData(dictionary, params)} />
        </Menu> */}
    </ScrollWrapper>
  )
}

export default VerticalMenu
