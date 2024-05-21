// 'use client'

// // Next Imports
// import { useParams } from 'next/navigation'

// // MUI Imports
// import { useTheme } from '@mui/material/styles'

// // Third-party Imports
// import PerfectScrollbar from 'react-perfect-scrollbar'

// // Component Imports
// import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'
// import CustomChip from '@core/components/mui/Chip'

// // import { GenerateVerticalMenu } from '@components/GenerateMenu'
// // Hook Imports
// import { useSettings } from '@core/hooks/useSettings'
// import useVerticalNav from '@menu/hooks/useVerticalNav'

// // Styled Component Imports
// import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// // Style Imports
// import menuItemStyles from '@core/styles/vertical/menuItemStyles'
// import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

// const RenderExpandIcon = ({ open, transitionDuration }) => (
//   <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
//     <i className='tabler-chevron-right' />
//   </StyledVerticalNavExpandIcon>
// )

// const VerticalMenu = ({ dictionary, scrollMenu }) => {
//   // Hooks
//   const theme = useTheme()
//   const verticalNavOptions = useVerticalNav()
//   const { settings } = useSettings()
//   const params = useParams()
//   const { isBreakpointReached } = useVerticalNav()

//   // Vars
//   const { transitionDuration } = verticalNavOptions
//   const { lang: locale, id } = params
//   const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

//   return (
//     // eslint-disable-next-line lines-around-comment
//     /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
//     <ScrollWrapper
//       {...(isBreakpointReached
//         ? {
//             className: 'bs-full overflow-y-auto overflow-x-hidden',
//             onScroll: container => scrollMenu(container, false)
//           }
//         : {
//             options: { wheelPropagation: false, suppressScrollX: true },
//             onScrollY: container => scrollMenu(container, true)
//           })}
//     >
//       {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
//       {/* Vertical Menu */}
//       <Menu
//         popoutMenuOffset={{ mainAxis: 23 }}
//         menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)}
//         renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
//         renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
//         menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
//       >
//         <SubMenu
//           label={dictionary['navigation'].dashboards}
//           icon={<i className='tabler-smart-home' />}
//           suffix={<CustomChip label='3' size='small' color='error' round='true' />}
//         >
//           <MenuItem href={`/${locale}/dashboards/crm`}>{dictionary['navigation'].crm}</MenuItem>
//           <MenuItem href={`/${locale}/dashboards/analytics`}>{dictionary['navigation'].analytics}</MenuItem>
//           <MenuItem href={`/${locale}/dashboards/ecommerce`}>{dictionary['navigation'].eCommerce}</MenuItem>
//         </SubMenu>
//         <MenuSection label={dictionary['navigation'].appsPages}>
//           <MenuItem href={`/${locale}/apps/calendar`} icon={<i className='tabler-calendar' />}>
//             {dictionary['navigation'].calendar}
//           </MenuItem>
//           <SubMenu label={dictionary['navigation'].invoice} icon={<i className='tabler-file-description' />}>
//             <MenuItem href={`/${locale}/apps/invoice/list`}>{dictionary['navigation'].list}</MenuItem>
//             <MenuItem href={`/${locale}/apps/invoice/preview/${id || '4987'}`}>
//               {dictionary['navigation'].preview}
//             </MenuItem>
//             <MenuItem href={`/${locale}/apps/invoice/edit/${id || '4987'}`}>{dictionary['navigation'].edit}</MenuItem>
//             <MenuItem href={`/${locale}/apps/invoice/add`}>{dictionary['navigation'].add}</MenuItem>
//           </SubMenu>
//           <SubMenu label={dictionary['navigation'].user} icon={<i className='tabler-user' />}>
//             <MenuItem href={`/${locale}/apps/user/list`}>{dictionary['navigation'].list}</MenuItem>
//             <MenuItem href={`/${locale}/apps/user/view`}>{dictionary['navigation'].view}</MenuItem>
//           </SubMenu>
//           <SubMenu label={dictionary['navigation'].rolesPermissions} icon={<i className='tabler-lock' />}>
//             <MenuItem href={`/${locale}/apps/roles`}>{dictionary['navigation'].roles}</MenuItem>
//             <MenuItem href={`/${locale}/apps/permissions`}>{dictionary['navigation'].permissions}</MenuItem>
//           </SubMenu>
//           <SubMenu label={dictionary['navigation'].pages} icon={<i className='tabler-file' />}>
//             <MenuItem href={`/${locale}/pages/user-profile`}>{dictionary['navigation'].userProfile}</MenuItem>
//             <MenuItem href={`/${locale}/pages/account-settings`}>{dictionary['navigation'].accountSettings}</MenuItem>
//             <MenuItem href={`/${locale}/pages/faq`}>{dictionary['navigation'].faq}</MenuItem>
//             <MenuItem href={`/${locale}/pages/pricing`}>{dictionary['navigation'].pricing}</MenuItem>
//             <SubMenu label={dictionary['navigation'].miscellaneous}>
//               <MenuItem href={`/${locale}/pages/misc/coming-soon`} target='_blank'>
//                 {dictionary['navigation'].comingSoon}
//               </MenuItem>
//               <MenuItem href={`/${locale}/pages/misc/under-maintenance`} target='_blank'>
//                 {dictionary['navigation'].underMaintenance}
//               </MenuItem>
//               <MenuItem href={`/${locale}/pages/misc/404-not-found`} target='_blank'>
//                 {dictionary['navigation'].pageNotFound404}
//               </MenuItem>
//               <MenuItem href={`/${locale}/pages/misc/401-not-authorized`} target='_blank'>
//                 {dictionary['navigation'].notAuthorized401}
//               </MenuItem>
//             </SubMenu>
//           </SubMenu>
//           <SubMenu label={dictionary['navigation'].authPages} icon={<i className='tabler-shield-lock' />}>
//             <SubMenu label={dictionary['navigation'].login}>
//               <MenuItem href={`/${locale}/pages/auth/login-v1`} target='_blank'>
//                 {dictionary['navigation'].loginV1}
//               </MenuItem>
//               <MenuItem href={`/${locale}/pages/auth/login-v2`} target='_blank'>
//                 {dictionary['navigation'].loginV2}
//               </MenuItem>
//             </SubMenu>
//             <SubMenu label={dictionary['navigation'].register}>
//               <MenuItem href={`/${locale}/pages/auth/register-v1`} target='_blank'>
//                 {dictionary['navigation'].registerV1}
//               </MenuItem>
//               <MenuItem href={`/${locale}/pages/auth/register-v2`} target='_blank'>
//                 {dictionary['navigation'].registerV2}
//               </MenuItem>
//               <MenuItem href={`/${locale}/pages/auth/register-multi-steps`} target='_blank'>
//                 {dictionary['navigation'].registerMultiSteps}
//               </MenuItem>
//             </SubMenu>
//             <SubMenu label={dictionary['navigation'].verifyEmail}>
//               <MenuItem href={`/${locale}/pages/auth/verify-email-v1`} target='_blank'>
//                 {dictionary['navigation'].verifyEmailV1}
//               </MenuItem>
//               <MenuItem href={`/${locale}/pages/auth/verify-email-v2`} target='_blank'>
//                 {dictionary['navigation'].verifyEmailV2}
//               </MenuItem>
//             </SubMenu>
//             <SubMenu label={dictionary['navigation'].forgotPassword}>
//               <MenuItem href={`/${locale}/pages/auth/forgot-password-v1`} target='_blank'>
//                 {dictionary['navigation'].forgotPasswordV1}
//               </MenuItem>
//               <MenuItem href={`/${locale}/pages/auth/forgot-password-v2`} target='_blank'>
//                 {dictionary['navigation'].forgotPasswordV2}
//               </MenuItem>
//             </SubMenu>
//             <SubMenu label={dictionary['navigation'].resetPassword}>
//               <MenuItem href={`/${locale}/pages/auth/reset-password-v1`} target='_blank'>
//                 {dictionary['navigation'].resetPasswordV1}
//               </MenuItem>
//               <MenuItem href={`/${locale}/pages/auth/reset-password-v2`} target='_blank'>
//                 {dictionary['navigation'].resetPasswordV2}
//               </MenuItem>
//             </SubMenu>
//             <SubMenu label={dictionary['navigation'].twoSteps}>
//               <MenuItem href={`/${locale}/pages/auth/two-steps-v1`} target='_blank'>
//                 {dictionary['navigation'].twoStepsV1}
//               </MenuItem>
//               <MenuItem href={`/${locale}/pages/auth/two-steps-v2`} target='_blank'>
//                 {dictionary['navigation'].twoStepsV2}
//               </MenuItem>
//             </SubMenu>
//           </SubMenu>
//           <SubMenu label={dictionary['navigation'].wizardExamples} icon={<i className='tabler-dots' />}>
//             <MenuItem href={`/${locale}/pages/wizard-examples/checkout`}>{dictionary['navigation'].checkout}</MenuItem>
//             <MenuItem href={`/${locale}/pages/wizard-examples/property-listing`}>
//               {dictionary['navigation'].propertyListing}
//             </MenuItem>
//             <MenuItem href={`/${locale}/pages/wizard-examples/create-deal`}>
//               {dictionary['navigation'].createDeal}
//             </MenuItem>
//           </SubMenu>
//           <MenuItem href={`/${locale}/pages/dialog-examples`} icon={<i className='tabler-square' />}>
//             {dictionary['navigation'].dialogExamples}
//           </MenuItem>
//           <SubMenu label={dictionary['navigation'].widgetExamples} icon={<i className='tabler-chart-bar' />}>
//             <MenuItem href={`/${locale}/pages/widget-examples/basic`}>{dictionary['navigation'].basic}</MenuItem>
//             <MenuItem href={`/${locale}/pages/widget-examples/advanced`}>{dictionary['navigation'].advanced}</MenuItem>
//             <MenuItem href={`/${locale}/pages/widget-examples/statistics`}>
//               {dictionary['navigation'].statistics}
//             </MenuItem>
//             <MenuItem href={`/${locale}/pages/widget-examples/charts`}>{dictionary['navigation'].charts}</MenuItem>
//             <MenuItem href={`/${locale}/pages/widget-examples/actions`}>{dictionary['navigation'].actions}</MenuItem>
//           </SubMenu>
//         </MenuSection>
//         <MenuSection label={dictionary['navigation'].formsAndTables}>
//           <MenuItem href={`/${locale}/forms/form-layouts`} icon={<i className='tabler-layout' />}>
//             {dictionary['navigation'].formLayouts}
//           </MenuItem>
//           <MenuItem href={`/${locale}/forms/form-validation`} icon={<i className='tabler-checkup-list' />}>
//             {dictionary['navigation'].formValidation}
//           </MenuItem>
//           <MenuItem href={`/${locale}/forms/form-wizard`} icon={<i className='tabler-git-merge' />}>
//             {dictionary['navigation'].formWizard}
//           </MenuItem>
//           <MenuItem href={`/${locale}/react-table`} icon={<i className='tabler-table' />}>
//             {dictionary['navigation'].reactTable}
//           </MenuItem>
//           <MenuItem
//             icon={<i className='tabler-checkbox' />}
//             href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/form-elements`}
//             suffix={<i className='tabler-external-link text-xl' />}
//             target='_blank'
//           >
//             {dictionary['navigation'].formELements}
//           </MenuItem>
//           <MenuItem
//             icon={<i className='tabler-layout-board-split' />}
//             href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/mui-table`}
//             suffix={<i className='tabler-external-link text-xl' />}
//             target='_blank'
//           >
//             {dictionary['navigation'].muiTables}
//           </MenuItem>
//         </MenuSection>
//         <MenuSection label={dictionary['navigation'].chartsMisc}>
//           <SubMenu label={dictionary['navigation'].charts} icon={<i className='tabler-chart-donut-2' />}>
//             <MenuItem href={`/${locale}/charts/apex-charts`}>{dictionary['navigation'].apex}</MenuItem>
//             <MenuItem href={`/${locale}/charts/recharts`}>{dictionary['navigation'].recharts}</MenuItem>
//           </SubMenu>
//           <MenuItem
//             icon={<i className='tabler-cards' />}
//             href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/foundation`}
//             suffix={<i className='tabler-external-link text-xl' />}
//             target='_blank'
//           >
//             {dictionary['navigation'].foundation}
//           </MenuItem>
//           <MenuItem
//             icon={<i className='tabler-atom' />}
//             href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/components`}
//             suffix={<i className='tabler-external-link text-xl' />}
//             target='_blank'
//           >
//             {dictionary['navigation'].components}
//           </MenuItem>
//           <MenuItem
//             icon={<i className='tabler-list-search' />}
//             href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/menu-examples/overview`}
//             suffix={<i className='tabler-external-link text-xl' />}
//             target='_blank'
//           >
//             {dictionary['navigation'].menuExamples}
//           </MenuItem>
//           <MenuItem
//             icon={<i className='tabler-lifebuoy' />}
//             suffix={<i className='tabler-external-link text-xl' />}
//             target='_blank'
//             href='https://pixinvent.ticksy.com'
//           >
//             {dictionary['navigation'].raiseSupport}
//           </MenuItem>
//           <MenuItem
//             icon={<i className='tabler-book-2' />}
//             suffix={<i className='tabler-external-link text-xl' />}
//             target='_blank'
//             href='https://demos.pixinvent.com/vuexy-nextjs-admin-template/documentation'
//           >
//             {dictionary['navigation'].documentation}
//           </MenuItem>
//           <SubMenu label={dictionary['navigation'].others} icon={<i className='tabler-box' />}>
//             <MenuItem suffix={<CustomChip label='New' size='small' color='info' round='true' />}>
//               {dictionary['navigation'].itemWithBadge}
//             </MenuItem>
//             <MenuItem
//               href='https://pixinvent.com'
//               target='_blank'
//               suffix={<i className='tabler-external-link text-xl' />}
//             >
//               {dictionary['navigation'].externalLink}
//             </MenuItem>
//             <SubMenu label={dictionary['navigation'].menuLevels}>
//               <MenuItem>{dictionary['navigation'].menuLevel2}</MenuItem>
//               <SubMenu label={dictionary['navigation'].menuLevel2}>
//                 <MenuItem>{dictionary['navigation'].menuLevel3}</MenuItem>
//                 <MenuItem>{dictionary['navigation'].menuLevel3}</MenuItem>
//               </SubMenu>
//             </SubMenu>
//             <MenuItem disabled>{dictionary['navigation'].disabledMenu}</MenuItem>
//           </SubMenu>
//         </MenuSection>
//       </Menu>
//       {/* <Menu
//           popoutMenuOffset={{ mainAxis: 23 }}
//           menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)}
//           renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
//           renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
//           menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
//         >
//           <GenerateVerticalMenu menuData={menuData(dictionary, params)} />
//         </Menu> */}
//     </ScrollWrapper>
//   )
// }

// export default VerticalMenu

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
  const { isBreakpointReached } = useVerticalNav()

  // Vars
  const { transitionDuration } = verticalNavOptions
  const { lang: locale, id } = params
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
        <SubMenu
          label={dictionary['navigation'].dashboards}
          icon={<i className='tabler-smart-home' />}
          suffix={<CustomChip label='3' size='small' color='error' round='true' />}
        >
          <MenuItem href={`/${locale}/dashboards/crm`}>{dictionary['navigation'].summary}</MenuItem>
          <MenuItem href={`/${locale}/dashboards/analytics`}>{dictionary['navigation'].analytics}</MenuItem>
          <MenuItem href={`/${locale}/dashboards/ecommerce`}>{dictionary['navigation'].reports}</MenuItem>
        </SubMenu>

        <MenuSection label={dictionary['navigation'].adminsection}>
          <SubMenu label={dictionary['navigation'].admin} icon={<i className='tabler-file-description' />}>
            <MenuItem href={`/${locale}/apps/invoice/list`}>{dictionary['navigation'].adminusers}</MenuItem>
            <MenuItem href={`/${locale}/apps/invoice/preview/${id || '4987'}`}>
              {dictionary['navigation'].adminroles}
            </MenuItem>
          </SubMenu>
        </MenuSection>
        <MenuSection label={dictionary['navigation'].customersection}>
          <SubMenu label={dictionary['navigation'].customers} icon={<i className='tabler-user' />}>
            <MenuItem href={`/${locale}/apps/user/list`}>{dictionary['navigation'].allcustomers}</MenuItem>
            <MenuItem href={`/${locale}/apps/user/view`}>{dictionary['navigation'].customersegment}</MenuItem>
          </SubMenu>
        </MenuSection>
        <MenuSection label={dictionary['navigation'].productsection}>
          <SubMenu label={dictionary['navigation'].products} icon={<i className='tabler-lock' />}>
            <MenuItem href={`/${locale}/apps/roles`}>{dictionary['navigation'].categories}</MenuItem>
            <MenuItem href={`/${locale}/apps/permissions`}>{dictionary['navigation'].allproducts}</MenuItem>

            <MenuItem href={`/${locale}/pages/user-profile`}>{dictionary['navigation'].bulkimport}</MenuItem>
            <MenuItem href={`/${locale}/pages/account-settings`}>{dictionary['navigation'].inventory}</MenuItem>
            <MenuItem href={`/${locale}/pages/faq`}>{dictionary['navigation'].metas}</MenuItem>
            <MenuItem href={`/${locale}/pages/pricing`}>{dictionary['navigation'].tags}</MenuItem>
          </SubMenu>
        </MenuSection>
        <MenuSection label={dictionary['navigation'].offersection}>
          <SubMenu label={dictionary['navigation'].offers}>
            <MenuItem href={`/${locale}/pages/misc/coming-soon`} target='_blank'>
              {dictionary['navigation'].allcoupons}
            </MenuItem>
            <MenuItem href={`/${locale}/pages/misc/under-maintenance`} target='_blank'>
              {dictionary['navigation'].customercoupons}
            </MenuItem>
          </SubMenu>
        </MenuSection>
        <MenuSection label={dictionary['navigation'].ordersection}>
          <SubMenu label={dictionary['navigation'].orders}>
            <MenuItem href={`/${locale}/pages/misc/404-not-found`} target='_blank'>
              {dictionary['navigation'].allorders}
            </MenuItem>
            <MenuItem href={`/${locale}/pages/misc/401-not-authorized`} target='_blank'>
              {dictionary['navigation'].bulkprocessing}
            </MenuItem>
            <MenuItem href={`/${locale}/pages/auth/login-v1`} target='_blank'>
              {dictionary['navigation'].transactions}
            </MenuItem>
            <MenuItem href={`/${locale}/pages/auth/login-v2`} target='_blank'>
              {dictionary['navigation'].archivedorders}
            </MenuItem>
          </SubMenu>
        </MenuSection>
        <MenuSection label={dictionary['navigation'].cmssection}>
          <SubMenu label={dictionary['navigation'].cms} icon={<i className='tabler-shield-lock' />}>
            <MenuItem href={`/${locale}/pages/auth/register-v1`} target='_blank'>
              {dictionary['navigation'].storesetup}
            </MenuItem>
            <MenuItem href={`/${locale}/pages/auth/register-v2`} target='_blank'>
              {dictionary['navigation'].style}
            </MenuItem>
            <MenuItem href={`/${locale}/pages/auth/register-multi-steps`} target='_blank'>
              {dictionary['navigation'].banners}
            </MenuItem>

            <MenuItem href={`/${locale}/pages/auth/verify-email-v1`} target='_blank'>
              {dictionary['navigation'].stories}
            </MenuItem>
            <MenuItem href={`/${locale}/pages/auth/verify-email-v2`} target='_blank'>
              {dictionary['navigation'].seo}
            </MenuItem>

            <MenuItem href={`/${locale}/pages/auth/forgot-password-v1`} target='_blank'>
              {dictionary['navigation'].pages}
            </MenuItem>
            <MenuItem href={`/${locale}/pages/auth/forgot-password-v2`} target='_blank'>
              {dictionary['navigation'].media}
            </MenuItem>

            <MenuItem href={`/${locale}/pages/auth/reset-password-v1`} target='_blank'>
              {dictionary['navigation'].google}
            </MenuItem>
            <MenuItem href={`/${locale}/pages/auth/reset-password-v2`} target='_blank'>
              {dictionary['navigation'].facebook}
            </MenuItem>

            <MenuItem href={`/${locale}/pages/auth/two-steps-v1`} target='_blank'>
              {dictionary['navigation'].socialprofiles}
            </MenuItem>
          </SubMenu>
        </MenuSection>
        <MenuSection label={dictionary['navigation'].paymentsection}>
          <SubMenu label={dictionary['navigation'].payments} icon={<i className='tabler-dots' />}>
            <MenuItem href={`/${locale}/pages/auth/two-steps-v2`} target='_blank'>
              {dictionary['navigation'].cashondelivery}
            </MenuItem>

            <MenuItem href={`/${locale}/pages/wizard-examples/checkout`}>{dictionary['navigation'].razorpay}</MenuItem>
            <MenuItem href={`/${locale}/pages/wizard-examples/property-listing`}>
              {dictionary['navigation'].phonepe}
            </MenuItem>
          </SubMenu>
        </MenuSection>
        <MenuSection label={dictionary['navigation'].shippingsection}>
          <SubMenu label={dictionary['navigation'].shipping} icon={<i className='tabler-chart-bar' />}>
            <MenuItem href={`/${locale}/pages/wizard-examples/create-deal`}>
              {dictionary['navigation'].shippingzones}
            </MenuItem>
            <MenuItem href={`/${locale}/pages/dialog-examples`} icon={<i className='tabler-square' />}>
              {dictionary['navigation'].shippingcharges}
            </MenuItem>
            <MenuItem href={`/${locale}/pages/widget-examples/basic`}>{dictionary['navigation'].pincodes}</MenuItem>
          </SubMenu>
        </MenuSection>
        <MenuSection label={dictionary['navigation'].taxsection}>
          <SubMenu label={dictionary['navigation'].taxes} icon={<i className='tabler-chart-donut-2' />}>
            <MenuItem href={`/${locale}/pages/widget-examples/advanced`}>{dictionary['navigation'].taxrate}</MenuItem>
            <MenuItem href={`/${locale}/pages/widget-examples/statistics`}>
              {dictionary['navigation'].taxgroup}
            </MenuItem>
          </SubMenu>
        </MenuSection>
        <MenuSection label={dictionary['navigation'].emailsection}>
          <SubMenu label={dictionary['navigation'].email}>
            <MenuItem href={`/${locale}/pages/widget-examples/charts`}>
              {dictionary['navigation'].smtpsettings}
            </MenuItem>
            <MenuItem href={`/${locale}/pages/widget-examples/actions`}>{dictionary['navigation'].templates}</MenuItem>
            <MenuItem href={`/${locale}/forms/form-layouts`} icon={<i className='tabler-layout' />}>
              {dictionary['navigation'].sendemails}
            </MenuItem>
          </SubMenu>
        </MenuSection>
        <MenuSection label={dictionary['navigation'].notificationsection}>
          <SubMenu label={dictionary['navigation'].notifications} icon={<i className='tabler-box' />}>
            <MenuItem href={`/${locale}/forms/form-wizard`} icon={<i className='tabler-git-merge' />}>
              {dictionary['navigation'].firebasesetup}
            </MenuItem>
            <MenuItem href={`/${locale}/react-table`} icon={<i className='tabler-table' />}>
              {dictionary['navigation'].smstemplates}
            </MenuItem>
            <MenuItem icon={<i className='tabler-checkbox' />} href={`/${locale}/forms/form-wizard`} target='_blank'>
              {dictionary['navigation'].sendnotifications}
            </MenuItem>
          </SubMenu>
        </MenuSection>
        <MenuSection label={dictionary['navigation'].smssection}>
          <SubMenu label={dictionary['navigation'].sms}>
            <MenuItem href={`/${locale}/charts/apex-charts`}>{dictionary['navigation'].smssetup}</MenuItem>
            <MenuItem href={`/${locale}/charts/recharts`}>{dictionary['navigation'].smstemplate}</MenuItem>
          </SubMenu>
        </MenuSection>
        <MenuSection label={dictionary['navigation'].shippersection}>
          <SubMenu label={dictionary['navigation'].shippers} icon={<i className='tabler-book-2' />}>
            <MenuItem icon={<i className='tabler-checkbox' />} href={`/${locale}/forms/form-wizard`} target='_blank'>
              {dictionary['navigation'].delhiverysetup}
            </MenuItem>
            <MenuItem icon={<i className='tabler-checkbox' />} href={`/${locale}/forms/form-wizard`} target='_blank'>
              {dictionary['navigation'].bluedartsetup}
            </MenuItem>
            <MenuItem icon={<i className='tabler-checkbox' />} href={`/${locale}/forms/form-wizard`} target='_blank'>
              {dictionary['navigation'].shiprocketsetup}
            </MenuItem>
            <MenuItem icon={<i className='tabler-checkbox' />} href={`/${locale}/forms/form-wizard`} target='_blank'>
              {dictionary['navigation'].shipdelightsetup}
            </MenuItem>
          </SubMenu>
        </MenuSection>
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
