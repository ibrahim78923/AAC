import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useUpsertTeams } from './useUpsertTeams';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { FormGrid } from '@/components/Grids/FormGrid';

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
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasError={isError}
        refreshApi={refetch}
      >
        <FormProvider methods={methods}>
          <FormGrid formFieldsList={upsertTeamFormFields} />
        </FormProvider>
      </ApiRequestFlow>
    </CommonDrawer>
  );
};

export default UpsertTeams;
