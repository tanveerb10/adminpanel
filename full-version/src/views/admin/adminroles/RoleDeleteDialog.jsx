'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Component Imports
import RoleConfirmationDialog from '@views/admin/adminroles/RoleConfirmationDialog'

const RoleDeleteDialog = ({ id, roleName }) => {
  console.log(id, 'role dialog se aaya hu batao')
  // States
  const [open, setOpen] = useState(false)

  // Hooks
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { checkbox: false } })

  // Vars
  const checkboxValue = watch('checkbox')

  const onSubmit = () => {
    setOpen(true)
  }

  return (
    <Card>
      <CardHeader title='Delete Role' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl error={Boolean(errors.checkbox)} className='is-full mbe-6'>
            <Controller
              name='checkbox'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormControlLabel control={<Checkbox {...field} />} label={`I confirm this ${roleName} role delete`} />
              )}
            />
            {errors.checkbox && (
              <FormHelperText error>Please confirm you want to delete this {roleName} Role</FormHelperText>
            )}
          </FormControl>

          <Button variant='contained' color='error' type='submit' disabled={!checkboxValue}>
            Delete {roleName} Role
          </Button>

          <RoleConfirmationDialog open={open} setOpen={setOpen} id={id} roleName={roleName} />
        </form>
      </CardContent>
    </Card>
  )
}

export default RoleDeleteDialog

// 'use client'

// // React Imports
// import { useState } from 'react'

// // MUI Imports
// import Card from '@mui/material/Card'
// import CardHeader from '@mui/material/CardHeader'
// import CardContent from '@mui/material/CardContent'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import Checkbox from '@mui/material/Checkbox'
// import Button from '@mui/material/Button'
// import FormControl from '@mui/material/FormControl'
// import FormHelperText from '@mui/material/FormHelperText'

// // Component Imports
// import RoleConfirmationDialog from '@views/admin/adminroles/RoleConfirmationDialog'

// const RoleDeleteDialog = ({ id, roleName }) => {
//   // States
//   const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false)

//   // Handling form submission
//   const handleSubmit = event => {
//     event.preventDefault()
//     setOpenConfirmationDialog(true)
//   }

//   return (
//     <Card>
//       <CardHeader title='Delete Role' />
//       <CardContent>
//         <form onSubmit={handleSubmit}>
//           <FormControl className='is-full mbe-6'>
//             <FormControlLabel control={<Checkbox required />} label={`I confirm this ${roleName} role delete`} />
//             <FormHelperText>Please confirm you want to delete this {roleName} Role</FormHelperText>
//           </FormControl>

//           <Button variant='contained' color='error' type='submit'>
//             Delete {roleName} Role
//           </Button>

//           <RoleConfirmationDialog
//             open={openConfirmationDialog}
//             setOpen={setOpenConfirmationDialog}
//             id={id}
//             roleName={roleName}
//           />
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

// export default RoleDeleteDialog
