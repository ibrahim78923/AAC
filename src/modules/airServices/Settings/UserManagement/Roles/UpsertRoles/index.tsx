import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { AIR_SERVICES } from '@/constants';
import { FormProvider } from '@/components/ReactHookForm';
import { upsertRolesFormData } from './UpsertRoles.data';
import useUpsertRoles from './useUpsertRoles';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { LoadingButton } from '@mui/lab';
import PermissionsAccordion from './PermissionsAccordion';

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
  } = useUpsertRoles();

  if (getRolesIsError) return <ApiErrorState />;

  if (getRolesIsLoading || getRolesIsFetching) return <SkeletonTable />;

  return (
    <>
      <Box display={'flex'} alignItems={'center'} gap={1} mb={2}>
        <ArrowBackIcon
          onClick={() => router?.push(AIR_SERVICES?.USER_ROLES_SETTINGS)}
          sx={{ cursor: 'pointer' }}
        />
        <Typography variant="h3">
          {roleId ? `Update Role` : `Add New Role`}
        </Typography>
      </Box>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          {upsertRolesFormData?.map((item: any) => (
            <Grid item xs={12} key={item?.id}>
              <Box width={'50%'}>
                <item.component {...item?.componentProps} size={'small'} />
              </Box>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5">Permissions</Typography>
          </Grid>
          <Grid item xs={12} my={2}>
            <PermissionsAccordion />
          </Grid>

          <Grid item xs={12} textAlign={'end'}>
            <Button
              type={'button'}
              variant={'outlined'}
              color={'inherit'}
              sx={{ mr: 2 }}
              onClick={() => router?.push(AIR_SERVICES?.USER_ROLES_SETTINGS)}
            >
              Cancel
            </Button>
            <LoadingButton
              type={'submit'}
              variant={'contained'}
              disabled={
                postPermissionsStatus?.isLoading ||
                patchPermissionsStatus?.isLoading
              }
              loading={
                postPermissionsStatus?.isLoading ||
                patchPermissionsStatus?.isLoading
              }
            >
              {roleId ? `Update` : `Submit`}
            </LoadingButton>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};

export default UpsertRoles;
