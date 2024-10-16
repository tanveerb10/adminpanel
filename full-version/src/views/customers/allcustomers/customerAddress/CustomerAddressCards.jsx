import { useState } from 'react'
import { Card, Grid, CardContent, Typography, Radio, Checkbox, IconButton, Button } from '@mui/material'
import CustomInputHorizontal from '@core/components/custom-inputs/Horizontal'

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
  color: 'var(--mui-palette-text-primary) !important'
}))

const Content = styled(Typography, {
  name: 'MuiCustomInputHorizontal',
  slot: 'content'
})(({ theme }) => ({
  ...theme.typography.body1
}))

const RadioInput = styled(Radio, {
  name: 'MuiCustomInputHorizontal',
  slot: 'input'
})(({ theme }) => ({
  marginBlockStart: theme.spacing(-0.25),
  marginInlineStart: theme.spacing(-0.25)
}))

const addressData = {
  success: true,
  customer_address: [
    {
      _id: '670e110b154129ffb3db31e5',
      address_name: 'office',
      customer_id: '66f7bcf9e633bc0aa52d21e2',
      firstname: 'tranveer',
      lastname: 'shaikh',
      address1: 'ddress1',
      address2: 'address2',
      city: 'mumbai',
      state: 'maha',
      pin: '400074',
      country: 'india',
      phone: 7040000000,
      createdAt: '2024-10-15T06:51:55.120Z',
      updatedAt: '2024-10-15T06:51:55.120Z',
      customer_address_id: 7,
      __v: 0
    },
    {
      _id: '670e110b154129ffb3db31e4',
      address_name: 'hiii',
      customer_id: '66f7bcf9e633bc0aa52d21e2',
      firstname: 'firstname',
      lastname: 'lastname',
      address1: 'ddress1',
      address2: 'address2',
      city: 'mumbai',
      state: 'state',
      pin: '400074',
      country: 'country',
      phone: 7040000000,
      createdAt: '2024-10-15T06:51:55.120Z',
      updatedAt: '2024-10-15T06:51:55.120Z',
      customer_address_id: 7,
      __v: 0
    }
  ],
  default_address: [
    {
      _id: '66f7bcf9e633bc0aa52d21e2',
      firstname: 'raj',
      lastname: 'Nimbale',
      email: 'raj@gmail.com',
      phone: 1234567852,
      verified_email: true,
      password: '$2a$10$ewHmfXmDTBER6IszpKG7MOsinw5E0OawSyTpxMKj2lLL/x2llb/FW',
      marketing_optin: true,
      device_token: null,
      refresh_token: null,
      default_address: {
        _id: '670e110b154129ffb3db31e4',
        address_name: 'hiii',
        customer_id: '66f7bcf9e633bc0aa52d21e2',
        firstname: 'firstname',
        lastname: 'lastname',
        address1: 'ddress1',
        address2: 'address2',
        city: 'mumbai',
        state: 'state',
        pin: '400074',
        country: 'country',
        phone: 7040000000,
        createdAt: '2024-10-15T06:51:55.120Z',
        updatedAt: '2024-10-15T06:51:55.120Z',
        customer_address_id: 7,
        __v: 0
      },
      total_spent: null,
      status: true,
      createdAt: '2024-09-28T08:23:21.460Z',
      updatedAt: '2024-10-15T07:02:06.655Z',
      customer_id: 3,
      __v: 0
    }
  ]
}
export default function CustomerAddressCards() {
  //   const initialSelected = data.filter(item => item.isSelected)[data.filter(item => item.isSelected).length - 1].value
  const defaultAddressId = addressData.default_address[0].default_address._id

  const [selected, setSelected] = useState(defaultAddressId)

  const handleChange = event => {
    setSelected(event.target.value)
  }
  let color = 'primary'
  return (
    <Grid container spacing={6}>
      {addressData.customer_address.map(singleAddress => (
        <Grid item xs={12} sm={6} key={singleAddress._id}>
          <Root className={classnames({ active: selected === singleAddress._id })} onChange={handleChange}>
            <Card>
              <CardContent>
                <div className='flex justify-between items-center'>
                  <div item xs={12}>
                    <RadioInput
                      //   name={name}
                      color='primary'
                      value={singleAddress._id}
                      checked={selected === singleAddress._id}
                    />
                  </div>
                  <div item xs={12}>
                    <Typography>Address name: {singleAddress.address_name}</Typography>
                  </div>
                  <div item xs={12}>
                    <IconButton>
                      <i className='tabler-edit text-[22px] text-textSecondary' />
                    </IconButton>
                  </div>
                </div>
                <div className='flex'>
                  <div>
                    {Object.keys(singleAddress).map(key => (
                      <Title>{key} :</Title>
                    ))}
                  </div>
                  <div>
                    {Object.values(singleAddress).map(value => (
                      <Content>{value}</Content>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Root>
        </Grid>
      ))}
      <Grid item xs={12} sm={6}>
        <Root className={classnames({ active: selected === defaultAddressId })}>
          <Card>
            <CardContent>
              <div className='flex justify-between items-center'>
                <div item xs={12}>
                  <RadioInput
                    //   name={name}
                    color='primary'
                    value={defaultAddressId}
                    onChange={handleChange}
                    checked={selected === defaultAddressId}
                  />
                </div>
                <div item xs={12}>
                  <Typography>Address name: {addressData.default_address[0].default_address.address_name}</Typography>
                </div>
                <div item xs={12}>
                  <IconButton>
                    <i className='tabler-edit text-[22px] text-textSecondary' />
                  </IconButton>
                </div>
              </div>
              <div className='flex'>
                <div>
                  {Object.keys(addressData.default_address[0].default_address).map(key => (
                    <Title>{key} :</Title>
                  ))}
                </div>
                <div>
                  {Object.values(addressData.default_address[0].default_address).map(value => (
                    <Content>{value}</Content>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </Root>
      </Grid>
      {/* <Grid item xs={12}>
        all address
        <Grid container spacing={4}>
          {data.map((item, index) => (
            <CustomInputHorizontal
              type='radio'
              key={index}
              data={item}
              selected={selected}
              name='custom-radios-basic'
              handleChange={handleChange}
              gridProps={{ sm: 6, xs: 12 }}
            />
          ))}
        </Grid>
      </Grid> */}

      <Grid item xs={12}>
        <Button variant='contained'>Set Default Address</Button>
      </Grid>
    </Grid>
  )
}

// <div>
// <Title>Address1 :</Title>
// <Content>address 1</Content>
// </div>
// <div>
// <Title>Address2 :</Title>
// <Content>address 2</Content>
// </div>
// <div>
// <Title>First name :</Title>
// <Content>Tanveer</Content>
// </div>
// <div>
// <Title>Last name :</Title>
// <Content>Shaikh</Content>
// </div>
// <div>
// <Title>Phone:</Title>
// <Content>1234567890</Content>
// </div>
// <div>
// <Title>City:</Title>
// <Content>Mumbai</Content>
// </div>
// <div>
// <Title>Pin:</Title>
// <Content>400095</Content>
// </div>
// <div>
// <Title>State:</Title>
// <Content>Maharashtra</Content>
// </div>
// <div>
// <Title>Country:</Title>
// <Content>India</Content>
// </div>

{
  /* <CardContent>
<div className='flex justify-between items-center'>
  <div item xs={12}>
    <RadioInput
      //   name={name}
      color={color}
      //   value={value}
      //   onChange={handleChange}
      //   checked={selected === value}
    />
  </div>
  <div item xs={12}>
    <Typography>Address name : Home</Typography>
  </div>
  <div item xs={12}>
    <IconButton>
      <i className='tabler-edit text-[22px] text-textSecondary' />
    </IconButton>
  </div>
</div>
</CardContent> */
}
