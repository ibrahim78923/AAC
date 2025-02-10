import { Typography } from '@mui/material';
import { profileWorkDataArray, profileOtherDataArray } from './Profile.data';
import { FormProvider } from '@/components/ReactHookForm';
import { useProfile } from './useProfile';
import { IPropsAccountDetails } from '../AccountDetails.interface';
import { FormGrid } from '@/components/Grids/FormGrid';
import { ActionsLoadingButton } from '@/components/Buttons/ActionsLoadingButton';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';

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
      <ActionsLoadingButton
        submitButtonText={GENERIC_UPSERT_FORM_CONSTANT?.UPDATE}
        showSubmitLoader={isLoading}
        handleCancelButton={handleCancel}
      />
    </FormProvider>
  );
};
