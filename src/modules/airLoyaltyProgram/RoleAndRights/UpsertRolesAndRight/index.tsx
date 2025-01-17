import { Divider, Grid, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertRolesAndRight } from './useUpsertRolesAndRight';
import {
  SUBMIT_BUTTON_TEXT,
  TITLE_FORM_USER,
} from './UpsertRolesAndRight.data';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { PermissionsAccordion } from '../PermissionsAccordion';
import CommonDrawer from '@/components/CommonDrawer';
import { LOYALTY_PROGRAM_ROLE_AND_RIGHTS_ACTIONS_CONSTANT } from '../RolesAndRight.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_SETTINGS_ROLES_AND_RIGHT_PERMISSIONS } from '@/constants/permission-keys';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';

const { LOYALTY_PROGRAM_ROLE_AND_RIGHTS_DETAIL } =
  LOYALTY_PROGRAM_ROLE_AND_RIGHTS_ACTIONS_CONSTANT ?? {};

export const UpsertRolesAndRight = () => {
  const {
    methods,
    handleSubmit,
    submitUpsertRoles,
    upsertRolesAndRightFormFields,
    getRolesIsLoading,
    getRolesIsFetching,
    getRolesIsError,
    submitButtonHandler,
    isPortalOpen,
    closePortal,
    apiCallInProgress,
    permissionAccordionsProps,
    refetch,
  } = useUpsertRolesAndRight();

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isOpen as boolean}
        onClose={closePortal}
        title={TITLE_FORM_USER?.[isPortalOpen?.action]}
        submitHandler={submitButtonHandler}
        footer
        isOk
        okText={SUBMIT_BUTTON_TEXT?.[isPortalOpen?.action]}
        cancelText={GENERIC_UPSERT_FORM_CONSTANT?.CANCEL}
        isLoading={apiCallInProgress}
        isDisabled={apiCallInProgress}
        disabledCancelBtn={apiCallInProgress}
      >
        <ApiRequestFlow
          showSkeleton={getRolesIsLoading || getRolesIsFetching}
          hasError={getRolesIsError}
          refreshApi={refetch}
        >
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(submitUpsertRoles)}
          >
            <Grid container spacing={2}>
              {upsertRolesAndRightFormFields?.map((item: any) => (
                <Grid item xs={12} key={item?.id}>
                  <item.component
                    {...item?.componentProps}
                    size={'small'}
                    disabled={
                      isPortalOpen?.action ===
                      LOYALTY_PROGRAM_ROLE_AND_RIGHTS_DETAIL
                    }
                  />
                </Grid>
              ))}
              <PermissionsGuard
                permissions={[
                  AIR_LOYALTY_PROGRAM_SETTINGS_ROLES_AND_RIGHT_PERMISSIONS?.ADD_PERMISSIONS,
                ]}
              >
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h5" color="slateBlue.main">
                    Permissions
                  </Typography>
                </Grid>
                <Grid item xs={12} mb={2}>
                  <PermissionsAccordion
                    disabled={
                      isPortalOpen?.action ===
                      LOYALTY_PROGRAM_ROLE_AND_RIGHTS_DETAIL
                    }
                    {...permissionAccordionsProps}
                  />
                </Grid>
              </PermissionsGuard>
            </Grid>
          </FormProvider>
        </ApiRequestFlow>
      </CommonDrawer>
    </>
  );
};
