import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useUpsertTeams } from './useUpsertTeams';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';

const UpsertTeams = () => {
  const {
    methods,
    handleSubmit,
    submit,
    handleClose,
    upsertTeamFormFields,
    isLoading,
    isFetching,
    isError,
    refetch,
    isPortalOpen,
    apiCallInProgress,
  } = useUpsertTeams();

  return (
    <CommonDrawer
      isDrawerOpen={isPortalOpen?.isOpen as boolean}
      onClose={handleClose}
      title={`${
        !!isPortalOpen?.data?._id
          ? GENERIC_UPSERT_FORM_CONSTANT?.EDIT
          : GENERIC_UPSERT_FORM_CONSTANT?.ADD
      } team`}
      submitHandler={handleSubmit(submit)}
      footer
      isOk
      okText={
        !!isPortalOpen?.data?._id
          ? GENERIC_UPSERT_FORM_CONSTANT?.UPDATE
          : GENERIC_UPSERT_FORM_CONSTANT?.ADD
      }
      isLoading={apiCallInProgress}
      isDisabled={apiCallInProgress}
      disabledCancelBtn={apiCallInProgress}
    >
      {isLoading || isFetching ? (
        <SkeletonForm />
      ) : isError ? (
        <ApiErrorState canRefresh refresh={refetch} />
      ) : (
        <FormProvider methods={methods}>
          <Grid container spacing={1}>
            {upsertTeamFormFields?.map((item: ReactHookFormFieldsI) => (
              <Grid item xs={12} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      )}
    </CommonDrawer>
  );
};

export default UpsertTeams;
