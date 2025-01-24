import { Box, Divider, Typography } from '@mui/material';
import { AIR_OPERATIONS } from '@/constants/routes';
import { FormProvider } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import { useUpsertRolesAndRight } from './useUpsertRolesAndRight';
import {
  BUTTON_TITLE_FORM_USER,
  TITLE_FORM_USER,
} from './UpsertRolesAndRight.data';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { PermissionsAccordion } from '../PermissionsAccordion';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { FormGrid } from '@/components/Grids/FormGrid';

export const UpsertRolesAndRight = () => {
  const {
    router,
    methods,
    handleSubmit,
    submitUpsertRoles,
    upsertRolesAndRightFormFields,
    action,
    postPermissionsStatus,
    getRolesIsLoading,
    getRolesIsFetching,
    patchPermissionsStatus,
    getRolesIsError,
    submitButtonHandler,
    permissionAccordionsProps,
    refetch,
  } = useUpsertRolesAndRight();

  return (
    <>
      <PageTitledHeader
        title={TITLE_FORM_USER?.[action as string]}
        canMovedBack
        moveBack={() => {
          router?.push({
            pathname: AIR_OPERATIONS?.ROLES_AND_RIGHTS,
          });
        }}
      />
      <ApiRequestFlow
        showSkeleton={getRolesIsLoading || getRolesIsFetching}
        hasError={getRolesIsError}
        refreshApi={refetch}
      >
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(submitUpsertRoles)}
        >
          <FormGrid
            formFieldsList={upsertRolesAndRightFormFields}
            disabled={action === GENERIC_UPSERT_FORM_CONSTANT?.VIEW}
          />
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5">Permissions</Typography>
          <Box my={2}>
            <PermissionsAccordion
              disabled={action === GENERIC_UPSERT_FORM_CONSTANT?.VIEW}
              {...permissionAccordionsProps}
            />
          </Box>

          <Box textAlign={'end'}>
            <LoadingButton
              type={'button'}
              variant={'outlined'}
              color={'inherit'}
              className="small"
              sx={{ mr: 2 }}
              disabled={
                postPermissionsStatus?.isLoading ||
                patchPermissionsStatus?.isLoading
              }
              onClick={() => router?.push(AIR_OPERATIONS?.ROLES_AND_RIGHTS)}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              type={'button'}
              variant={'contained'}
              className="small"
              onClick={() => submitButtonHandler?.()}
              disabled={
                postPermissionsStatus?.isLoading ||
                patchPermissionsStatus?.isLoading
              }
              loading={
                postPermissionsStatus?.isLoading ||
                patchPermissionsStatus?.isLoading
              }
            >
              {BUTTON_TITLE_FORM_USER?.[action as string]}
            </LoadingButton>
          </Box>
        </FormProvider>
      </ApiRequestFlow>
    </>
  );
};
