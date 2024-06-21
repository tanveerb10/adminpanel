// React Imports
import { useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Vars
const initialData = {
  fullName: '',
  username: '',
  email: '',
  company: '',
  country: '',
  contact: '',
  role: '',
  plan: '',
  status: ''
}

const AddUserDrawer = ({ open, handleClose }) => {
  // States
  const [formData, setFormData] = useState(initialData)

  const handleSubmit = e => {
    e.preventDefault()
    handleClose()
    setFormData(initialData)
  }

  const handleReset = () => {
    handleClose()
    setFormData({
      fullName: '',
      username: '',
      email: '',
      company: '',
      country: '',
      contact: '',
      role: '',
      plan: '',
      status: ''
    })
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between plb-5 pli-6'>
        <Typography variant='h5'>Add New User</Typography>
        <IconButton onClick={handleReset}>
          <i className='tabler-x text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6'>
          <CustomTextField
            label='First Name'
            fullWidth
            placeholder='vishal'
            value={formData.fullName}
            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
          />
          <CustomTextField
            label='Last Name'
            fullWidth
            placeholder='sinha'
            value={formData.username}
            onChange={e => setFormData({ ...formData, username: e.target.value })}
          />
          <CustomTextField
            label='Email'
            fullWidth
            placeholder='vishalsinha@gmail.com'
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
          <CustomTextField
            label='Company'
            fullWidth
            placeholder='Company PVT LTD'
            value={formData.company}
            onChange={e => setFormData({ ...formData, company: e.target.value })}
          />
          <CustomTextField
            select
            fullWidth
            id='country'
            value={formData.country}
            onChange={e => setFormData({ ...formData, country: e.target.value })}
            label='Select Country'
            inputProps={{ placeholder: 'Country' }}
          >
            <MenuItem value='UK'>UK</MenuItem>
            <MenuItem value='USA'>USA</MenuItem>
            <MenuItem value='Australia'>Australia</MenuItem>
            <MenuItem value='Germany'>Germany</MenuItem>
          </CustomTextField>
          <CustomTextField
            label='Contact'
            type='number'
            fullWidth
            placeholder='865-294-5153'
            value={formData.contact}
            onChange={e => setFormData({ ...formData, contact: e.target.value })}
          />
          <CustomTextField
            select
            fullWidth
            id='select-role'
            value={formData.role}
            onChange={e => setFormData({ ...formData, role: e.target.value })}
            label='Select Role'
          >
       
            <MenuItem value='superadmin'>SuperAdmin</MenuItem>
            <MenuItem value='admin'>Admin</MenuItem>
            <MenuItem value='catalog'>Catalog</MenuItem>
            <MenuItem value='marketing'>Marketing</MenuItem>
            <MenuItem value='support'>Support</MenuItem>
          </CustomTextField>
          <CustomTextField
            select
            fullWidth
            id='select-status'
            value={formData.status}
            onChange={e => setFormData({ ...formData, status: e.target.value })}
            label='Select Status'
          >
            <MenuItem value='active'>Active</MenuItem>
            <MenuItem value='inactive'>Inactive</MenuItem>
          </CustomTextField>

          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Submit
            </Button>
            <Button variant='tonal' color='error' type='reset' onClick={() => handleReset()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddUserDrawer
