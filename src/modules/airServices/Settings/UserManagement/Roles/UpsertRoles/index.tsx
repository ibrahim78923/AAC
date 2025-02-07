import { Box, Divider, Typography } from '@mui/material';
import { AIR_SERVICES } from '@/constants/routes';
import { FormProvider } from '@/components/ReactHookForm';
import { upsertRolesFormData } from './UpsertRoles.data';
import useUpsertRoles from './useUpsertRoles';
import { LoadingButton } from '@mui/lab';
import PermissionsAccordion from './PermissionsAccordion';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { FormGrid } from '@/components/Grids/FormGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';

const UpsertRoles = () => {
  const {
    router,
    roleId,
    methods,
    handleSubmit,
    onSubmit,
    postPermissionsStatus,
    getRolesIsLoading,
    getRolesIsFetching,
    patchPermissionsStatus,
    getRolesIsError,
    permissionAccordionsProps,
    refetch,
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
        moveBack={() => router?.push(AIR_SERVICES?.USER_ROLES_SETTINGS)}
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
          <Box textAlign={'end'}>
            <LoadingButton
              type={'button'}
              variant={'outlined'}
              color={'inherit'}
              sx={{ mr: 2 }}
              onClick={() => router?.push(AIR_SERVICES?.USER_ROLES_SETTINGS)}
              className="small"
              disabled={
                postPermissionsStatus?.isLoading ||
                patchPermissionsStatus?.isLoading
              }
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              type={'submit'}
              variant={'contained'}
              className="small"
              disabled={
                postPermissionsStatus?.isLoading ||
                patchPermissionsStatus?.isLoading
              }
              loading={
                postPermissionsStatus?.isLoading ||
                patchPermissionsStatus?.isLoading
              }
            >
              {roleId
                ? GENERIC_UPSERT_FORM_CONSTANT?.UPDATE
                : GENERIC_UPSERT_FORM_CONSTANT?.SUBMIT}
            </LoadingButton>
          </Box>
        </FormProvider>
      </ApiRequestFlow>
    </>
  );
};

export default UpsertRoles;
