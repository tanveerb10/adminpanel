'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import fetchData from '@/utils/fetchData'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const RoleConfirmationDialog = ({ open, setOpen, id, roleName }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDeleteRole = async () => {
    setLoading(true)
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/roles/deleteRole/${id}`
      const response = await fetchData(apiUrl, 'DELETE', {})
      if (response.success) {
        toast.success('Role deleted successfully.')
        router.push('/admin/adminroles')
      } else {
        throw new Error(response.message || 'Failed to delete role.')
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred.')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <Dialog fullWidth maxWidth='xs' open={open} onClose={() => setOpen(false)}>
      <DialogContent className='flex items-center flex-col text-center'>
        <Typography variant='h5'>Are you sure you want to delete this {roleName} Role?</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='error' onClick={handleDeleteRole} disabled={loading}>
          {loading ? 'Deleting...' : 'Yes, Delete'}
        </Button>
        <Button variant='outlined' color='secondary' onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default RoleConfirmationDialog
