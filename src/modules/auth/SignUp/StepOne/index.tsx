import React from 'react';
import { Grid } from '@mui/material';

import { RHFSelect, RHFSwitch, RHFTextField } from '@/components/ReactHookForm';

import { v4 as uuidv4 } from 'uuid';
import { noOfEmployee } from '../SignUp.data';

const StepOne = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <RHFTextField
          name="firstName"
          label="First Name"
          placeholder="Enter First Name"
          size="small"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <RHFTextField
          name="lastName"
          label="Last Name"
          placeholder="Enter Last Name"
          size="small"
        />
      </Grid>
      <Grid item xs={12}>
        <RHFTextField
          name="email"
          label="Email Address"
          placeholder="Enter Email"
          size="small"
        />
      </Grid>
      <Grid item xs={12}>
        <RHFTextField
          name="crn"
          label="Organization Number"
          placeholder="Enter Organization Number"
          size="small"
        />
      </Grid>

      <Grid item xs={12}>
        <RHFTextField
          name="organizationName"
          label="Organization Name"
          placeholder="Enter Organization Name"
          size="small"
          disabled
        />
      </Grid>

      <Grid item xs={12}>
        <RHFSelect
          name="numberOfEmployees"
          label="Number of Employees"
          size="small"
        >
          {noOfEmployee?.map((option: any) => (
            <option key={uuidv4()} value={option?.value}>
              {option?.label}
            </option>
          ))}
        </RHFSelect>
      </Grid>
      <Grid item xs={12}>
        <RHFSwitch
          name="enableEmployeeVerification"
          label="Verify your Employees through Identity Gram and Get 10% discount"
        />
      </Grid>

      <Grid item xs={12}>
        <RHFTextField
          name="phoneNumber"
          label="Phone Number"
          size="small"
          placeholder="Enter Phone Number"
        />
      </Grid>
    </Grid>
  );
};

export default StepOne;
