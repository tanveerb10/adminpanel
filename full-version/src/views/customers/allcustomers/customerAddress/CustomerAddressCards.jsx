import { useEffect, useState } from 'react'
import { Card, Grid, CardContent, Typography, Radio, IconButton, Button } from '@mui/material'

import { styled } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

const Root = styled('div', {
  name: 'MuiCustomInputHorizontal',
  slot: 'root'
})(({ theme }) => ({
  blockSize: '100%',
  display: 'flex',
  gap: theme.spacing(1),
  borderRadius: 'var(--mui-shape-borderRadius)',
  cursor: 'pointer',
  position: 'relative',
  alignItems: 'flex-start',
  border: '1px solid var(--mui-palette-customColors-inputBorder)',
  padding: theme.spacing(4),
  color: 'var(--mui-palette-text-primary)',
  transition: theme.transitions.create(['border-color'], {
    duration: theme.transitions.duration.shorter
  }),
  '&:hover': {
    borderColor: 'var(--mui-palette-action-active)'
  },
  '&.active': {
    borderColor: 'var(--mui-palette-primary-main)',
    '& i, & svg': {
      color: 'var(--mui-palette-primary-main) !important'
    }
  }
}))

const Title = styled(Typography, {
  name: 'MuiCustomInputHorizontal',
  slot: 'title'
})(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  color: 'var(--mui-palette-text-primary) !important',
  // width: '150px', // Fixed width to align labels properly
  // textAlign: 'left', // Align text to the right
  marginRight: theme.spacing(2)
}))

const Content = styled(Typography, {
  name: 'MuiCustomInputHorizontal',
  slot: 'content'
})(({ theme }) => ({
  ...theme.typography.body1,
  // width: ,
  // textAlign: 'right',
  color: theme.palette.text.secondary
}))

const RadioInput = styled(Radio, {
  name: 'MuiCustomInputHorizontal',
  slot: 'input'
})(({ theme }) => ({
  marginBlockStart: theme.spacing(-0.25),
  marginInlineStart: theme.spacing(-0.25)
}))

export default function CustomerAddressCards({ handleToggle, addressData }) {
  const [addresses, setAddresses] = useState([])
  const [selected, setSelected] = useState(null)
  console.log(addressData, 'from card address list')
  useEffect(() => {
    if (addressData) {
      const defaultAddressId = addressData?.default_address[0]?.default_address?._id
      const processedAddress = addressData?.customer_address.map(address => ({
        ...address,
        selected: address._id === defaultAddressId
      }))
      setAddresses(processedAddress)
      setSelected(defaultAddressId)
    }
  }, [addressData])

  const fieldMap = {
    firstname: 'First Name',
    lastname: 'Last Name',
    address1: 'Address 1',
    address2: 'Address 2',
    city: 'City',
    state: 'State',
    pin: 'Postal Code',
    country: 'Country',
    phone: 'Phone Number'
  }
  const fieldsToHide = [
    'createdAt',
    '_id',
    'customer_address_id',
    'selected',
    'address_name',
    'updatedAt',
    '__v',
    'customer_id'
  ]

  const handleChange = event => {
    setSelected(event.target.value)
  }

  if (addressData?.customer_address === null || addressData?.customer_address.length === 0) {
    return <Typography>There's no address available</Typography>
  }

  return (
    <Grid container spacing={6} className='flex flex-col'>
      {addresses.map(singleAddress => (
        <Grid item xs={12} sm={6} key={singleAddress._id}>
          <Root className={classnames({ active: selected === singleAddress._id })} onChange={handleChange}>
            <Card className='w-full'>
              <CardContent>
                <div className='flex justify-between items-center'>
                  <div item xs={12}>
                    <RadioInput color='primary' value={singleAddress._id} checked={selected === singleAddress._id} />
                  </div>
                  <div item xs={12}>
                    <Typography>Address name: {singleAddress.address_name}</Typography>
                  </div>
                  <div item xs={12}>
                    <IconButton onClick={() => handleToggle(singleAddress)}>
                      <i className='tabler-edit text-[22px] text-textSecondary' />
                    </IconButton>
                  </div>
                </div>
                <div>
                  {Object.entries(singleAddress)
                    .filter(([key]) => !fieldsToHide.includes(key))
                    .map(([key, value]) => (
                      <Grid item xs={12} key={key} container alignItems='center'>
                        <Title>{fieldMap[key] || key} :</Title>
                        <Content>{value}</Content>
                      </Grid>
                    ))}
                </div>
              </CardContent>
            </Card>
          </Root>
        </Grid>
      ))}

      <Grid item xs={12}>
        <Button variant='contained'>Set Default Address</Button>
      </Grid>
    </Grid>
  )
}
