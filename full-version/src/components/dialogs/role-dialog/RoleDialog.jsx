'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import fetchData from '@/utils/fetchData'

// Component Imports
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'
import { toast } from 'react-toastify'
// Data
const permissionsData = [
  {
    category: 'Dashboard',
    permissions: ['Summary', 'Analytics', 'Reports']
  },
  {
    category: 'Admin',
    permissions: ['Admin Users', 'Admin Roles']
  },
  {
    category: 'Customers',
    permissions: ['All Customers', 'Customer Segment']
  },
  {
    category: 'Products',
    permissions: ['All Products', 'Brands', 'Categories', 'Bulk Import', 'Inventory', 'Metas', 'Tags']
  },
  {
    category: 'Offers',
    permissions: ['All Coupons', 'Customer Coupons']
  },
  {
    category: 'Orders',
    permissions: ['All Orders', 'Bulk Processing', 'Transactions', 'Archived Orders']
  },
  {
    category: 'CMS',
    permissions: [
      'Store Setup',
      'Style',
      'Banners',
      'Stories',
      'SEO',
      'Pages',
      'Media',
      'Google',
      'Facebook',
      'Social Profiles'
    ]
  },
  {
    category: 'Payments',
    permissions: ['Cash on Delivery', 'Razorpay', 'PhonePe']
  },
  {
    category: 'Shipping',
    permissions: ['Shipping Zones', 'Shipping Charges', 'Pincodes']
  },
  {
    category: 'Taxes',
    permissions: ['Tax Rate', 'Tax Group']
  },
  {
    category: 'Email',
    permissions: ['SMTP Settings', 'Templates', 'Send Emails']
  },
  {
    category: 'Notifications',
    permissions: ['Firebase Setup', 'Notification Templates', 'Send Notifications']
  },
  {
    category: 'SMS',
    permissions: ['SMS Setup', 'SMS Templates']
  },
  {
    category: 'Shippers',
    permissions: ['Delhivery Setup', 'BlueDart Setup', 'Shiprocket Setup', 'Shipdelight Setup']
  }
]

const RoleDialog = ({ open, setOpen }) => {
  const [roleName, setRoleName] = useState('')
  const [selectedPermissions, setSelectedPermissions] = useState({})
  const [expanded, setExpanded] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const resetForm = () => {
    setRoleName('')
    setSelectedPermissions({})
    setError(null)
  }
  const handleClose = () => {
    resetForm()
    setOpen(false)
  }
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  const togglePermission = (category, permission) => {
    setSelectedPermissions(prev => {
      const categoryPermissions = prev[category] || []
      if (categoryPermissions.includes(permission)) {
        return {
          ...prev,
          [category]: categoryPermissions.filter(perm => perm !== permission)
        }
      } else {
        return {
          ...prev,
          [category]: [...categoryPermissions, permission]
        }
      }
    })
  }

  // Toggle select all for a category
  const handleSelectAllCategory = category => {
    // Check if all permissions are selected for the category
    const allSelected =
      (selectedPermissions[category] || []).length ===
      permissionsData.find(cat => cat.category === category).permissions.length

    // Update state to either select or deselect all permissions for the category
    setSelectedPermissions(prev => ({
      ...prev,
      [category]: allSelected ? [] : permissionsData.find(cat => cat.category === category).permissions
    }))
  }

  const handleSelectAllPermissions = () => {
    const allSelected = permissionsData.every(
      cat => (selectedPermissions[cat.category] || []).length === cat.permissions.length
    )

    const newSelections = allSelected
      ? {}
      : permissionsData.reduce((acc, cat) => {
          acc[cat.category] = cat.permissions
          return acc
        }, {})
    setSelectedPermissions(newSelections)
  }

  const handleUpdateRole = async payload => {
    const apiUrl = `/admin/roles/createRole`
    try {
      setLoading(true)
      setError(null)
      const response = await fetchData(apiUrl, 'POST', payload)
      if (!response.success) {
        throw new Error(`Failed to Create Role Data, status: ${response.status}`)
      }
      console.log(response)
      toast.success(response.message)
      setTimeout(() => {
        window.location.reload()
      }, 1000)
      handleClose()
    } catch (error) {
      setError(error.message)
      toast.error(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }
  const handleSubmit = async event => {
    event.preventDefault()
    if (!roleName.trim()) {
      setError('Role name is required')
      return
    }
    const processRoleName = roleName.trim().toLowerCase().replace(/ /g, '_')
    const processPermission = Object.values(selectedPermissions)
      .flat()
      .map(permission => permission.trim().toLowerCase().replace(/ /g, ''))

    // prepare the payload

    const payload = {
      role_name: processRoleName,
      status: 'true',
      ability: processPermission
    }

    await handleUpdateRole(payload)
    resetForm()
  }
  const isSelectAllChecked = permissionsData.every(
    cat => (selectedPermissions[cat.category] || []).length === cat.permissions.length
  )

  return (
    <Dialog
      fullWidth
      maxWidth='md'
      scroll='body'
      open={open}
      onClose={() => setOpen(false)}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>

      <DialogTitle variant='h4' className='flex flex-col gap-2 text-center p-6 sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Add Role
        <Typography component='span' className='flex flex-col text-center'>
          Set Role Permissions
        </Typography>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent className='overflow-visible flex flex-col gap-6 pbs-0 sm:pli-16'>
          <CustomTextField
            label='Role Name'
            variant='outlined'
            fullWidth
            placeholder='Enter Role Name'
            value={roleName}
            onChange={e => setRoleName(e.target.value)}
            margin='normal'
          />
          <Typography variant='h5' className='min-is-[225px]'>
            Role Permissions
          </Typography>
          <div className='overflow-x-auto'>
            <FormControlLabel
              className='mie-0 capitalize'
              control={
                <Checkbox
                  onChange={handleSelectAllPermissions}
                  indeterminate={!isSelectAllChecked && Object.keys(selectedPermissions).length > 0}
                  checked={isSelectAllChecked}
                />
              }
              label='Select All'
            />
            {permissionsData.map(categoryData => {
              const isCategoryChecked =
                (selectedPermissions[categoryData.category] || []).length === categoryData.permissions.length
              const isCategoryIndeterminate =
                !isCategoryChecked && (selectedPermissions[categoryData.category] || []).length > 0
              return (
                <Accordion
                  key={categoryData.category}
                  expanded={expanded === categoryData.category}
                  onChange={handleChange(categoryData.category)}
                >
                  <AccordionSummary
                    id={`${categoryData.category}-header`}
                    aria-controls={`${categoryData.category}-content`}
                  >
                    <FormControlLabel
                      label={`${categoryData.category} (${(selectedPermissions[categoryData.category] || []).length}/${categoryData.permissions.length})`}
                      control={
                        <Checkbox
                          aria-label={`Select all ${categoryData.category} permissions`}
                          onChange={() => handleSelectAllCategory(categoryData.category)}
                          checked={isCategoryChecked}
                          indeterminate={isCategoryIndeterminate}
                          onClick={event => event.stopPropagation()}
                          onFocus={event => event.stopPropagation()}
                        />
                      }
                    />
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup>
                      {categoryData.permissions.map(permission => (
                        <FormControlLabel
                          className='mie-0'
                          key={permission}
                          control={
                            <Checkbox
                              checked={(selectedPermissions[categoryData.category] || []).includes(permission)}
                              onChange={() => togglePermission(categoryData.category, permission)}
                            />
                          }
                          label={permission}
                        />
                      ))}
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
              )
            })}
          </div>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' type='submit' disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
          <Button variant='tonal' type='button' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
      {error && toast.error(error)}
    </Dialog>
  )
}

export default RoleDialog
