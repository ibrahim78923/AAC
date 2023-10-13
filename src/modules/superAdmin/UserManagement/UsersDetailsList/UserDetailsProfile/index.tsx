import { useForm } from 'react-hook-form';
import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  profileDefaultValues,
  profileFields,
  profileValidationSchema,
} from './UserDetailsProfile.data';
import { Button, Grid, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider } from '@/components/ReactHookForm';

const UserDetailsProfile = () => {
  const methods: any = useForm({
    resolver: yupResolver(profileValidationSchema),
    defaultValues: profileDefaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    alert('profile');
  };

  return (
    <FormProvider methods={methods}>
      <Typography variant="h4">Personal Details</Typography>
      <Grid container spacing={2} sx={{ mt: '5px' }}>
        {profileFields?.map((item: any) => {
          return (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              <item.component {...item.componentProps} size={'small'}>
                {item?.componentProps?.select &&
                  item?.options?.map((option: any) => (
                    <option key={uuidv4()} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
              </item.component>
            </Grid>
          );
        })}
      </Grid>
      <Grid
        item
        lg={12}
        sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', my: 2 }}
      >
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Edit
        </Button>
      </Grid>
    </FormProvider>
  );
};

export default UserDetailsProfile;
