import { Box, Button, Grid, Typography } from '@mui/material';
import {
  profileWorkDataArray,
  profileOtherDataArray,
} from './AccountDetailsProfile.data';
import { FormProvider } from '@/components/ReactHookForm';
import { useAccountDetailsProfile } from './useAccountDetailsProfile';

export const AccountDetailsProfile = () => {
  const {
    AccountDetailProfileMethods,
    reset,
    handleSubmitAccountDetailProfile,
  } = useAccountDetailsProfile();

  return (
    <FormProvider
      methods={AccountDetailProfileMethods}
      onSubmit={handleSubmitAccountDetailProfile}
    >
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
        <Button variant="contained" type="submit">
          Update
        </Button>
        <Button variant="outlined" onClick={() => reset()}>
          cancel
        </Button>
      </Box>
    </FormProvider>
  );
};
