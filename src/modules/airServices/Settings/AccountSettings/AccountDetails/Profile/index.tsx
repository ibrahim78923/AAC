import { Box, Typography } from '@mui/material';
import { profileWorkDataArray, profileOtherDataArray } from './Profile.data';
import { FormProvider } from '@/components/ReactHookForm';
import { useProfile } from './useProfile';
import { LoadingButton } from '@mui/lab';
import { IPropsAccountDetails } from '../AccountDetails.interface';
import { FormGrid } from '@/components/Grids/FormGrid';

export const Profile = (props: IPropsAccountDetails) => {
  const { isLoading, methods, handleSubmitProfile, handleCancel } =
    useProfile(props);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmitProfile}>
      <Typography variant="h5" mb={1}>
        Work Information
      </Typography>
      <FormGrid formFieldsList={profileWorkDataArray} />
      <br />
      <Typography variant="h5" mb={1}>
        Other Information
      </Typography>
      <FormGrid formFieldsList={profileOtherDataArray} />
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'end',
          my: 2,
        }}
      >
        <LoadingButton
          variant="outlined"
          className="small"
          color={'inherit'}
          onClick={handleCancel}
          disabled={isLoading}
        >
          cancel
        </LoadingButton>
        <LoadingButton
          disabled={isLoading}
          loading={isLoading}
          className="small"
          variant="contained"
          type="submit"
        >
          Update
        </LoadingButton>
      </Box>
    </FormProvider>
  );
};
