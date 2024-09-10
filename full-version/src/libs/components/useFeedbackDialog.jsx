import { useState } from 'react'

const useFeedbackDialog = () => {
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [feedbackType, setFeedbackType] = useState('success')

  const showFeedback = (message, type = 'success') => {
    setFeedbackMessage(message)
    setFeedbackOpen(true)
    setFeedbackType(type)
  }

  const handleClose = () => setFeedbackOpen(false)

  return {
    feedbackMessage,
    feedbackOpen,
    feedbackType,
    showFeedback,
    handleClose
  }
}
export default useFeedbackDialog
