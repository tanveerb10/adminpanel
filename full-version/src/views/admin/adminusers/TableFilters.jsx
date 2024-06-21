// React Imports
import React, { useState, useEffect } from 'react';

// MUI Imports
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';

// Component Imports
import CustomTextField from '@core/components/mui/TextField';

      

const TableFilters = ({ setData, tableData, roleData }) => {
  // States
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const filteredData = tableData?.filter(user => {
      if (role && user.role !== role) return false;
      if (status && user.status !== status) return false;
      return true;
    });

    setData(filteredData);
  }, [role, status, tableData, setData]);

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            id='select-role'
            value={role}
            onChange={e => setRole(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>Select Role</MenuItem>
            {roleData?.allRole?.map(role => (
              <MenuItem value={role.role_name} key={role._id}>
                {role.role_name}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>

        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            id='select-status'
            value={status}
            onChange={e => setStatus(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>Select Status</MenuItem>
            <MenuItem value='active'>Active</MenuItem>
            <MenuItem value='inactive'>Inactive</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default TableFilters;
