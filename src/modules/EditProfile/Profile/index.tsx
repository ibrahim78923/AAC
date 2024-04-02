import React from 'react';
import { useForm } from 'react-hook-form';
import { Grid, Button, Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { FormProvider } from '@/components/ReactHookForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
import {
  editProfileDataArray,
  editProfileValidationSchema,
} from './Profile.data';
import useEditProfile from '@/modules/EditProfile/useEditProfile';
import { useUpdateUsersMutation } from '@/services/superAdmin/user-management/users';
import { enqueueSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';

const Profile = () => {
  const { getUserData } = useEditProfile();
  const [updateUsers, { isLoading }] = useUpdateUsersMutation();

  const defaultProfileData: any = {
    firstName: getUserData?.data?.firstName,
    lastName: getUserData?.data?.lastName,
    email: getUserData?.data?.email,
    WorkPhoneNumber: getUserData?.data?.phoneNumber,
    phoneNumber: getUserData?.data?.phoneNumber,
    jobTitle: getUserData?.data?.jobTitle,
    companyName: getUserData?.data?.organization?.name,
    twitterUrl: getUserData?.data?.twitterUrl,
    linkedInUrl: getUserData?.data?.linkedInUrl,
    facebookUrl: getUserData?.data?.facebookUrl,
    language: getUserData?.data?.language,
  };

  const methodsCreateNewTicketForm = useForm({
    resolver: yupResolver(editProfileValidationSchema),
    defaultValues: defaultProfileData,
  });

  const onSubmit = async (values: any) => {
    delete values['WorkPhoneNumber'];
    delete values['companyName'];

    try {
      await updateUsers({ id: getUserData?.data?._id, body: values })?.unwrap();
      enqueueSnackbar('User profile updated successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: 'error',
      });
    }
  };

  const { handleSubmit } = methodsCreateNewTicketForm;

  return (
    <Box>
      <FormProvider
        methods={methodsCreateNewTicketForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={2}>
          {editProfileDataArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              {item?.componentProps?.heading && (
                <Typography variant="h5">
                  {item?.componentProps?.heading}
                </Typography>
              )}
              <item.component
                {...item.componentProps}
                size={'small'}
                disabled={
                  item?.componentProps?.name === 'companyName' ? true : false
                }
              >
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
          <LoadingButton type="submit" variant="contained" loading={isLoading}>
            Save
          </LoadingButton>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default Profile;
