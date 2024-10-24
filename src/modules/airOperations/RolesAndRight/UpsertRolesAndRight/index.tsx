import { Button, Divider, Grid, Typography } from '@mui/material';
import { AIR_OPERATIONS } from '@/constants/routes';
import { FormProvider } from '@/components/ReactHookForm';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { LoadingButton } from '@mui/lab';
import { useUpsertRolesAndRight } from './useUpsertRolesAndRight';
import {
  BUTTON_TITLE_FORM_USER,
  TITLE_FORM_USER,
} from './UpsertRolesAndRight.data';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { PermissionsAccordion } from '../PermissionsAccordion';

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
  } = useUpsertRolesAndRight();

  if (getRolesIsError) return <ApiErrorState />;

  if (getRolesIsLoading || getRolesIsFetching) return <SkeletonTable />;

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
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(submitUpsertRoles)}
      >
        <Grid container spacing={2}>
          {upsertRolesAndRightFormFields?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component
                {...item?.componentProps}
                size={'small'}
                disabled={action === GENERIC_UPSERT_FORM_CONSTANT?.VIEW}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5">Permissions</Typography>
          </Grid>
          <Grid item xs={12} my={2}>
            <PermissionsAccordion
              disabled={action === GENERIC_UPSERT_FORM_CONSTANT?.VIEW}
              {...permissionAccordionsProps}
            />
          </Grid>

          <Grid item xs={12} textAlign={'end'}>
            <Button
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
            </Button>
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
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};
