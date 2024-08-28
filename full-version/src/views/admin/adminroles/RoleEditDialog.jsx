'use client'

// React Imports
import { useState } from 'react'

import { Card, CardContent, CardHeader, Chip, Grid, MenuItem, Typography, Button } from '@mui/material'
import fetchData from '@/utils/fetchData'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import CustomTextField from '@/@core/components/mui/TextField'
import { toast } from 'react-toastify'
import RoleDeleteDialog from '@views/admin/adminroles/RoleDeleteDialog'

const RoleEditDialog = ({ roleData, id }) => {
  console.log('role aftaaadaata', roleData)

  const [roleInfo, setRoleInfo] = useState({
    role_name: roleData.admin?.role_name || '',
    status: roleData.admin?.status || 'true',
    ability: roleData.admin?.ability || []
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [allAbility, setallAbility] = useState([
    'dashboard',
    'summary',
    'analytics',
    'reports',
    'admin',
    'adminusers',
    'adminroles',
    'customers',
    'allcustomers',
    'customersegment',
    'products',
    'allproducts',
    'categories',
    'brands',
    'bulkimport',
    'inventory',
    'metas',
    'tags',
    'offers',
    'allcoupons',
    'customercoupons',
    'orders',
    'allorders',
    'bulkprocessing',
    'transactions',
    'archivedorders',
    'cms',
    'storesetup',
    'style',
    'banners',
    'stories',
    'seo',
    'pages',
    'media',
    'google',
    'facebook',
    'socialprofiles',
    'payments',
    'cashondelivery',
    'razorpay',
    'phonepe',
    'shipping',
    'shippingzones',
    'shippingcharges',
    'pincodes',
    'taxes',
    'taxrate',
    'taxgroup',
    'email',
    'smtpsettings',
    'templates',
    'sendemails',
    'notifications',
    'firebasesetup',
    'notificationtemplates',
    'sendnotifications',
    'sms',
    'smssetup',
    'smstemplates',
    'shippers',
    'delhiverysetup',
    'bluedartsetup',
    'shiprocketsetup',
    'shipdelightsetup'
  ])

  const updateRolehandle = async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/roles/updaterole/${id}`
    if (error) {
      toast.error(`Clear this error : ${error}`)
      return
    }
    try {
      setLoading(true)
      const response = await fetchData(apiUrl, 'PUT', roleInfo)
      if (!response.success) {
        throw new Error(`Failed to fetch Role Data, status: ${response.status}`)
      }
      console.log(response)
      toast.success(response.message)
    } catch (err) {
      setError(err.message)
      toast.error(`Error: ${err.message}`)
    } finally {
      setLoading(false)
      if (error) {
        setError(null)
      }
    }
  }
  const abilityCheck = allAbility.filter(check => !roleInfo.ability.includes(check))

  const handleDelete = (item, isSelected) => {
    console.log('you delete this icon', item)

    if (isSelected) {
      const updatedSelected = roleInfo.ability.filter(val => val !== item)

      setRoleInfo(prev => ({ ...prev, ability: updatedSelected }))
      setallAbility(prevAbility => [...prevAbility, item])
    } else {
      const updatedAbility = allAbility.filter(val => val !== item)
      setallAbility(updatedAbility)
      setRoleInfo(prev => ({ ...prev, ability: [...prev.ability, item] }))
    }
  }

  return (
    <Grid container spacing={4} direction='column' gap={5}>
      <Typography variant='h4' className='text-center'>
        Edit Role
      </Typography>
      <Card>
        <CardContent className='space-y-4'>
          <CustomTextField
            required
            label='Role name'
            value={roleInfo.role_name}
            fullWidth
            onChange={e => setRoleInfo(prev => ({ ...prev, role_name: e.target.value }))}
          />
          <CustomTextField
            select
            fullWidth
            label='Status'
            value={roleInfo.status}
            onChange={e => setRoleInfo(prev => ({ ...prev, status: e.target.value }))}
          >
            <MenuItem value='true'>True</MenuItem>
            <MenuItem value='false'>False</MenuItem>
          </CustomTextField>
        </CardContent>
      </Card>
      <Grid item>
        <Card className=''>
          <CardHeader title='Selected Ability' />
          <CardContent>
            {roleInfo.ability.length > 0 ? (
              roleInfo.ability?.map((item, index) => (
                <Chip
                  key={item}
                  label={item}
                  className='m-1'
                  deleteIcon={<DeleteIcon />}
                  onDelete={() => handleDelete(item, true)}
                />
              ))
            ) : (
              <Typography>No ability selected</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card>
          <CardHeader title='All Ability ' />
          <CardContent>
            {abilityCheck.length > 0 ? (
              abilityCheck.map((item, index) => (
                <Chip
                  key={item}
                  label={item}
                  className='m-1'
                  deleteIcon={<AddIcon />}
                  onDelete={() => handleDelete(item, false)}
                />
              ))
            ) : (
              <Typography>All ability have selected</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      <Grid item>
        <RoleDeleteDialog id={id} roleName={roleInfo.role_name} />
      </Grid>
      <Grid item>
        <Button color='primary' variant='contained' disabled={loading} onClick={updateRolehandle}>
          {loading ? 'Loading' : 'Save Changes'}
        </Button>
      </Grid>
    </Grid>
  )
}
export default RoleEditDialog
