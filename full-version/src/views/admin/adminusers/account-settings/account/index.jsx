// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import AccountDetails from './AccountDetails'
import AccountDelete from './AccountDelete'

const Account = ({ adminDetail, roleData, isAddAdmin, isProfile, onlyViewProfile }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <AccountDetails
          adminDetail={adminDetail}
          roleData={roleData}
          isAddAdmin={isAddAdmin}
          isProfile={isProfile}
          onlyViewProfile={onlyViewProfile}
        />
      </Grid>
      {!isAddAdmin && (
        <Grid item xs={12}>
          <AccountDelete />
        </Grid>
      )}
    </Grid>
  )
}

export default Account
