import { Box, Divider, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
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
import { ActionsLoadingButton } from '@/components/Buttons/ActionsLoadingButton';

export const UpsertRolesAndRight = () => {
  const {
    methods,
    handleSubmit,
    submitUpsertRoles,
    upsertRolesAndRightFormFields,
    action,
    getRolesIsLoading,
    getRolesIsFetching,
    getRolesIsError,
    permissionAccordionsProps,
    refetch,
    apiCallInProgress,
    moveBack,
    submitButtonHandler,
  } = useUpsertRolesAndRight();

  return (
    <>
      <PageTitledHeader
        title={TITLE_FORM_USER?.[action as string]}
        canMovedBack
        moveBack={moveBack}
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
          <ActionsLoadingButton
            submitButtonText={BUTTON_TITLE_FORM_USER?.[action as string]}
            showSubmitLoader={apiCallInProgress}
            handleCancelButton={moveBack}
            handleSubmitButton={submitButtonHandler}
          />
        </FormProvider>
      </ApiRequestFlow>
    </>
  );
};
