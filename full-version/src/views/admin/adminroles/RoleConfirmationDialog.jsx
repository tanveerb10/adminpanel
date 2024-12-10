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
import useLocalizedRedirect from '@/utils/useLocalizedRedirect'
import { useFeedback } from '@/contexts/FeedbackContext'

const RoleConfirmationDialog = ({ open, setOpen, id, roleName }) => {
  const [loading, setLoading] = useState(false)
  const redirect = useLocalizedRedirect()
  const { showFeedback } = useFeedback()

  const handleDeleteRole = async () => {
    setLoading(true)
    try {
      const apiUrl = `/admin/roles/deleteRole/${id}`
      const response = await fetchData(apiUrl, 'DELETE', {})
      if (response.success) {
        showFeedback('Role deleted successfully.', 'success')
        redirect('/admin/adminroles')
      } else {
        throw new Error(response.message || 'Failed to delete role.')
      }
    } catch (error) {
      showFeedback(error.message || 'An error occurred.', 'error')
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
      <DialogActions className='flex justify-center items-center'>
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
