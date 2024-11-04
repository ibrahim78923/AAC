import { NoDashboardWidgetImage } from '@/assets/images';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Button, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DASHBOARD, GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { Visibility } from '@mui/icons-material';
import { useUpsertDashboard } from './useUpsertDashboard';
import { pxToRem } from '@/utils/getFontValue';
import { AddWidgets } from './AddWidgets';
import { StaticDashboardWidgets } from '../StaticDashboardWidgets';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { Header } from './Header';

export const UpsertDashboard = () => {
  const {
    methods,
    submitCreateDashboardFilterForm,
    reportsWatch,
    action,
    handleSubmit,
    upsertServiceDashboardFormFields,
    isError,
    dashboardWidgetsWatch,
    refetch,
    apiCallInProgress,
    goToManageDashboard,
    setValue,
    openPreviewDashboard,
    showLoader,
  } = useUpsertDashboard();

  if (showLoader) return <SkeletonForm />;
  if (isError) return <ApiErrorState canRefresh refresh={refetch} />;

  return (
    <>
      <Header />
      <Grid container spacing={2}>
        <Grid
          item
          xl={6}
          xs={12}
          display={'flex'}
          flexDirection={'column'}
          maxHeight={'100%'}
        >
          <Box flexGrow={1}>
            <FormProvider methods={methods}>
              <Grid container spacing={2}>
                {upsertServiceDashboardFormFields?.map(
                  (form: ReactHookFormFieldsI) => (
                    <Grid key={form?.id} item xs={12} md={form?.md}>
                      <form.component {...form?.componentProps} size="small">
                        {form?.heading ? form?.heading : null}
                      </form.component>
                    </Grid>
                  ),
                )}
              </Grid>
              <AddWidgets
                dashboardWidgetsWatch={dashboardWidgetsWatch}
                reportsWatch={reportsWatch}
                setValue={setValue}
              />
            </FormProvider>
          </Box>
          <Box textAlign={'right'}>
            <Button
              className="small"
              variant="text"
              onClick={openPreviewDashboard}
              startIcon={<Visibility />}
            >
              Preview Dashboard
            </Button>
          </Box>
        </Grid>
        <Grid item xl={6} xs={12}>
          <Box
            border="1px solid"
            borderColor="custom.off_white_three"
            p={2}
            borderRadius={2}
            overflow={'auto'}
          >
            <Typography
              variant="subtitle1"
              textAlign="center"
              color="slateBlue.main"
              pb={2}
            >
              Details view
            </Typography>
            <Box
              p={2}
              maxHeight={'70vh'}
              minHeight={'70vh'}
              overflow={'auto'}
              minWidth={pxToRem(600)}
            >
              <StaticDashboardWidgets
                widgets={reportsWatch}
                NoDataImage={NoDashboardWidgetImage}
                NoDataMessage="You have not selected any dashboard"
                gridSize={{ lg: 12 }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box
        display="flex"
        gap={1}
        py={2}
        mt={2}
        justifyContent="flex-end"
        borderTop="1px solid"
        borderColor="custom.off_white_three"
      >
        <LoadingButton
          className="small"
          variant="outlined"
          color="secondary"
          onClick={goToManageDashboard}
          disabled={apiCallInProgress}
        >
          Cancel
        </LoadingButton>
        <LoadingButton
          className="small"
          variant="contained"
          type="submit"
          loading={apiCallInProgress}
          disabled={showLoader}
          onClick={handleSubmit(submitCreateDashboardFilterForm)}
        >
          {action === DASHBOARD?.EDIT
            ? GENERIC_UPSERT_FORM_CONSTANT?.UPDATE
            : GENERIC_UPSERT_FORM_CONSTANT?.CREATE}
        </LoadingButton>
      </Box>
    </>
  );
};
