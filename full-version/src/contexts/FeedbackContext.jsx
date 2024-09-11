'use client'
import { useContext, createContext } from 'react'
import useFeedbackDialog from '@/libs/components/useFeedbackDialog'
import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material'
import classNames from 'classnames'
const FeedbackContext = createContext()

export const useFeedback = () => {
  const context = useContext(FeedbackContext)
  if (!context) {
    throw new Error('useFeedback must be used within a FeedbackProvider')
  }
  return context
}

export const FeedbackProvider = ({ children }) => {
  const feedback = useFeedbackDialog()

  return (
    <FeedbackContext.Provider value={feedback}>
      {children}

      <Dialog open={feedback.feedbackOpen} onClose={feedback.handleClose}>
        <DialogContent className='flex items-center flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
          <i
            className={classNames('text-[88px] mbe-5 sm:mbe-8', {
              'tabler-circle-check': feedback.feedbackType === 'success',
              'text-success': feedback.feedbackType === 'success',
              'tabler-circle-x': feedback.feedbackType === 'error',
              'text-error': feedback.feedbackType === 'error'
            })}
          />

          <Typography variant='h4' className='mbe-5'>
            {feedback.feedbackType === 'success' ? 'Success' : 'Error'}
          </Typography>
          <Typography color='text.primary'>{feedback.feedbackMessage}</Typography>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button
            variant='contained'
            color={feedback.feedbackType === 'success' ? 'success' : 'error'}
            onClick={feedback.handleClose}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </FeedbackContext.Provider>
  )
}
