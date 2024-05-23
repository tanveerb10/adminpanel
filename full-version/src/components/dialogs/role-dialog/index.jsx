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
import { Accordion } from '@mui/material'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

// Component Imports
import DialogCloseButton from '../DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'

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
    permissions: ['All Products', 'Categories', 'Bulk Import', 'Inventory', 'Metas', 'Tags']
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
    permissions: ['Firebase Setup', 'SMS Templates', 'Send Notifications']
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

const RoleDialog = ({ open, setOpen, title }) => {
  const [roleName, setRoleName] = useState(title || '')
  const [selectedPermissions, setSelectedPermissions] = useState({})
  const [expanded, setExpanded] = useState(false)

  const handleClose = () => {
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

  const handleSelectAllCategory = category => {
    const allSelected =
      (selectedPermissions[category] || []).length ===
      permissionsData.find(cat => cat.category === category).permissions.length

    setSelectedPermissions(prev => ({
      ...prev,
      [category]: allSelected ? [] : permissionsData.find(cat => cat.category === category).permissions
    }))
  }

  const handleSelectAllPermissions = () => {
    const allSelected =
      Object.keys(selectedPermissions).length === permissionsData.length &&
      permissionsData.every(cat => selectedPermissions[cat.category]?.length === cat.permissions.length)

    if (allSelected) {
      setSelectedPermissions({})
    } else {
      const newSelections = {}

      permissionsData.forEach(cat => {
        newSelections[cat.category] = cat.permissions
      })
      setSelectedPermissions(newSelections)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    // Handle form submission before closing
    console.log('Selected Permissions:', selectedPermissions)
    handleClose()
  }

  const isSelectAllChecked =
    Object.keys(selectedPermissions).length === permissionsData.length &&
    permissionsData.every(cat => selectedPermissions[cat.category]?.length === cat.permissions.length)

  return (
    <Dialog
      fullWidth
      maxWidth='md'
      scroll='body'
      open={open}
      onClose={handleClose}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex flex-col gap-2 text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        {title ? 'Edit Role' : 'Add Role'}
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
            {permissionsData.map((categoryData) => {
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
                      {categoryData.permissions.map((permission) => (
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
          <Button variant='contained' type='submit'>
            Submit
          </Button>
          <Button variant='tonal' type='reset' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default RoleDialog
