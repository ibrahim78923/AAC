import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
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
  } = useUpsertRolesAndRight();

  if (getRolesIsError) return <ApiErrorState />;

  if (getRolesIsLoading || getRolesIsFetching) return <SkeletonTable />;

  return (
    <>
      <Box display={'flex'} alignItems={'center'} gap={1} mb={2}>
        <ArrowBackIcon
          onClick={() => router?.push(AIR_LOYALTY_PROGRAM?.ROLES_AND_RIGHTS)}
          sx={{ cursor: 'pointer' }}
        />
        <Typography variant="h3">
          {TITLE_FORM_USER?.[action as string]}
        </Typography>
      </Box>

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
            />
          </Grid>

          <Grid item xs={12} textAlign={'end'}>
            <Button
              type={'button'}
              variant={'outlined'}
              color={'inherit'}
              sx={{ mr: 2 }}
              disabled={
                postPermissionsStatus?.isLoading ||
                patchPermissionsStatus?.isLoading
              }
              onClick={() =>
                router?.push(AIR_LOYALTY_PROGRAM?.ROLES_AND_RIGHTS)
              }
            >
              Cancel
            </Button>
            <LoadingButton
              type={'button'}
              variant={'contained'}
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
