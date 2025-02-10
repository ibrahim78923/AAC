import { Box, Divider, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { upsertRolesFormData } from './UpsertRoles.data';
import useUpsertRoles from './useUpsertRoles';
import PermissionsAccordion from './PermissionsAccordion';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { FormGrid } from '@/components/Grids/FormGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { ActionsLoadingButton } from '@/components/Buttons/ActionsLoadingButton';

const UpsertRoles = () => {
  const {
    roleId,
    methods,
    handleSubmit,
    onSubmit,
    getRolesIsLoading,
    getRolesIsFetching,
    getRolesIsError,
    permissionAccordionsProps,
    refetch,
    apiCallInProgress,
    moveBack,
  } = useUpsertRoles();

  return (
    <>
      <PageTitledHeader
        title={`${
          roleId
            ? GENERIC_UPSERT_FORM_CONSTANT?.UPDATE
            : `${GENERIC_UPSERT_FORM_CONSTANT?.ADD} ${GENERIC_UPSERT_FORM_CONSTANT?.NEW}`
        } Role`}
        canMovedBack
        moveBack={moveBack}
      />
      <ApiRequestFlow
        showSkeleton={getRolesIsLoading || getRolesIsFetching}
        hasError={getRolesIsError}
        refreshApi={refetch}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <FormGrid formFieldsList={upsertRolesFormData} spacing={1}>
            <CustomGrid xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h5">Permissions</Typography>
            </CustomGrid>
            <CustomGrid xs={12}>
              <Box sx={{ my: 2 }}>
                <PermissionsAccordion {...permissionAccordionsProps} />
              </Box>
            </CustomGrid>
          </FormGrid>
          <br />
          <ActionsLoadingButton
            submitButtonText={
              roleId
                ? GENERIC_UPSERT_FORM_CONSTANT?.UPDATE
                : GENERIC_UPSERT_FORM_CONSTANT?.SUBMIT
            }
            showSubmitLoader={apiCallInProgress}
            handleCancelButton={moveBack}
          />
        </FormProvider>
      </ApiRequestFlow>
    </>
  );
};

export default UpsertRoles;
