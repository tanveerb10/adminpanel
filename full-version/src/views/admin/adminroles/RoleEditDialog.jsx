'use client'

// React Imports
import { useState } from 'react'

import { Card, CardContent, Chip, Grid, MenuItem, Typography, Button, CircularProgress } from '@mui/material'
import fetchData from '@/utils/fetchData'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import CustomTextField from '@/@core/components/mui/TextField'
import { toast } from 'react-toastify'
import RoleDeleteDialog from '@views/admin/adminroles/RoleDeleteDialog'
import { useFeedback } from '@/contexts/FeedbackContext'
import Loader from '@/libs/components/Loader'
const allAbility = [
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
  'productfilter',
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
]
const RoleEditDialog = ({ roleData, id }) => {
  console.log('role aftaaadaata', roleData)

  const [roleInfo, setRoleInfo] = useState({
    role_name: roleData.admin?.role_name || '',
    status: roleData.admin?.status || 'true',
    ability: roleData.admin?.ability || []
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  // const [allAbility, setallAbility] = useState()

  const { showFeedback } = useFeedback()
  const updateRolehandle = async () => {
    if (error) setError(null)
    const apiUrl = `/admin/roles/updaterole/${id}`
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
      showFeedback(response.message || 'Account deleted successfully.', 'success')
    } catch (err) {
      setError(err.message)
      showFeedback(err.message || 'An error occurred.', 'error')
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
    setRoleInfo(prev => ({
      ...prev,
      ability: isSelected ? prev.ability.filter(val => val !== item) : [...prev.ability, item]
    }))
  }

  const handleInputChange = e => {
    const { value, name } = e.target
    setRoleInfo(prev => ({ ...prev, [name]: value }))
  }
  return (
    <Grid container spacing={4} direction='column' gap={5}>
      <Typography variant='h4' className='text-center'>
        Edit Role
      </Typography>
      <Grid item>
        <Card>
          <CardContent className='space-y-4'>
            <CustomTextField
              required
              label='Role name'
              name='role_name'
              value={roleInfo.role_name}
              fullWidth
              onChange={handleInputChange}
            />
            <CustomTextField
              select
              fullWidth
              label='Status'
              name='status'
              value={roleInfo.status}
              onChange={handleInputChange}
            >
              <MenuItem value='true'>True</MenuItem>
              <MenuItem value='false'>False</MenuItem>
            </CustomTextField>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card className=''>
          <Grid className='flex justify-between p-5'>
            <Typography className='font-bold' variant='h5'>
              Selected Abilities
            </Typography>
            <Grid className='flex items-center'>
              <Typography variant='h5' color='primary'>
                {roleInfo.ability.length}
              </Typography>
              <Typography variant='h3' className='font-bold'>
                /
              </Typography>
              <Typography variant='h5' color='error'>
                {allAbility.length}
              </Typography>
            </Grid>
          </Grid>
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
          <Grid className='flex justify-between p-5'>
            <Typography className='font-bold' variant='h5'>
              All Abilities
            </Typography>
            <Grid className='flex items-center'>
              <Typography variant='h5' color='primary'>
                {abilityCheck.length}
              </Typography>
              <Typography variant='h3' className='font-bold'>
                /
              </Typography>
              <Typography variant='h5' color='error'>
                {allAbility.length}
              </Typography>
            </Grid>
          </Grid>
          <CardContent>
            {abilityCheck.length > 0 ? (
              abilityCheck.map(item => (
                <Chip
                  key={item}
                  label={item}
                  className='m-1'
                  deleteIcon={<AddIcon />}
                  onDelete={() => handleDelete(item, false)}
                />
              ))
            ) : (
              <Typography>All ability have been selected</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      <Grid item>
        <RoleDeleteDialog id={id} roleName={roleInfo.role_name} />
      </Grid>
      <Grid item>
        <Button color='primary' variant='contained' disabled={loading} onClick={updateRolehandle}>
          {loading ? <Loader /> : 'Save Changes'}
        </Button>
      </Grid>
    </Grid>
  )
}
export default RoleEditDialog
