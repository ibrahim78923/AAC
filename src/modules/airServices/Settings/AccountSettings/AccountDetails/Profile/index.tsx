import { Box, Grid, Typography } from '@mui/material';
import { profileWorkDataArray, profileOtherDataArray } from './Profile.data';
import { FormProvider } from '@/components/ReactHookForm';
import { useProfile } from './useProfile';
import { LoadingButton } from '@mui/lab';
import { IPropsAccountDetails } from '../AccountDetails.interface';

export const Profile = (props: IPropsAccountDetails) => {
  const { isLoading, profileMethods, handleSubmitProfile, handleCancel } =
    useProfile(props);

  return (
    <FormProvider methods={profileMethods} onSubmit={handleSubmitProfile}>
      <Typography variant="h5" mb={1}>
        Work Information
      </Typography>
      <Grid container spacing={2}>
        {profileWorkDataArray?.map((item: any) => (
          <Grid item xs={12} md={item?.gridLength} key={item?._id}>
            <item.component {...item?.componentProps} />
          </Grid>
        ))}
      </Grid>
      <br />
      <Typography variant="h5" mb={1}>
        Other Information
      </Typography>
      <Grid container spacing={2}>
        {profileOtherDataArray?.map((item: any) => (
          <Grid item xs={12} md={item?.gridLength} key={item?._id}>
            <item.component {...item?.componentProps} />
          </Grid>
        ))}
      </Grid>
      <Box display={'flex'} justifyContent={'end'} gap={1}>
        <LoadingButton
          variant="outlined"
          color={'inherit'}
          onClick={handleCancel}
          disabled={isLoading}
        >
          cancel
        </LoadingButton>
        <LoadingButton
          disabled={isLoading}
          loading={isLoading}
          variant="contained"
          type="submit"
        >
          Update
        </LoadingButton>
      </Box>
    </FormProvider>
  );
};
