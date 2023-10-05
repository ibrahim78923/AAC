import React from 'react';
import { useForm } from 'react-hook-form';
import { Grid, Button, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import { FormProvider } from '@/components/ReactHookForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
import {
  editProfileDataArray,
  editProfileDefaultValues,
  editProfileValidationSchema,
} from './Profile.data';

const Profile = () => {
  const methodsCreateNewTicketForm = useForm({
    resolver: yupResolver(editProfileValidationSchema),
    defaultValues: editProfileDefaultValues,
  });

  const onSubmit = () => {};

  const { handleSubmit } = methodsCreateNewTicketForm;

  return (
    <Box>
      <FormProvider
        methods={methodsCreateNewTicketForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={4}>
          {editProfileDataArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              <item.component {...item.componentProps} size={'small'}>
                {item?.componentProps?.select
                  ? item?.options?.map((option: any) => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))
                  : null}
              </item.component>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ marginTop: '30px' }} />

        <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '30px' }}>
          <Button
            sx={{
              marginRight: '15px',
              backgroundColor: '#F3F4F6',
              color: '#6B7280',
              borderRadius: '4px',
            }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default Profile;
