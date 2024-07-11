import { DashboardMockImage } from '@/assets/images';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Button, Grid, Typography } from '@mui/material';
import { AIR_SERVICES_DASHBOARD_WIDGETS_COMPONENTS } from './CreateDashboard.data';
import { useCreateDashboard } from './useCreateDashboard';
import { styles } from './CreateDashboard.styles';
import { PreviewDashboard } from '../PreviewDashboard';
import { DragDropContext } from 'react-beautiful-dnd';
import dynamic from 'next/dynamic';
import { LoadingButton } from '@mui/lab';
import {
  DASHBOARD,
  GENERIC_UPSERT_FORM_CONSTANT,
  TICKET_GRAPH_TYPES,
} from '@/constants/strings';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES } from '@/constants';
import { UpsertServiceDashboardFormFieldsDynamicI } from './CreateDashboard.interface';
import { createElement } from 'react';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { Visibility } from '@mui/icons-material';
import NoData from '@/components/NoData';

const RHFMultiCheckboxDraggable = dynamic(
  () => import('@/components/ReactHookForm/RHFMultiCheckboxDraggable'),
  { ssr: false },
);

export const CreateDashboard = () => {
  const {
    methods,
    submitCreateDashboardFilterForm,
    reports,
    onDragEnd,
    action,
    router,
    handleSubmit,
    upsertServiceDashboardFormFields,
    addSingleServicesDashboardStatus,
    updateSingleServicesDashboardStatus,
    isLoading,
    isFetching,
    isError,
    dashboardWidgetsWatch,
    isPortalOpen,
    setIsPortalOpen,
  } = useCreateDashboard();

  if (isLoading || isFetching) return <SkeletonForm />;
  if (isError) return <ApiErrorState />;

  return (
    <>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(submitCreateDashboardFilterForm)}
      >
        <PageTitledHeader
          title={`${
            action === DASHBOARD?.EDIT
              ? GENERIC_UPSERT_FORM_CONSTANT?.EDIT
              : GENERIC_UPSERT_FORM_CONSTANT?.CREATE
          } Dashboard`}
          canMovedBack
          moveBack={() => router?.push(AIR_SERVICES?.MANAGE_DASHBOARD)}
        />
        <Grid container spacing={3} sx={styles()?.createDashboardContainer}>
          <Grid item xl={6} xs={12}>
            <Grid container spacing={2}>
              {upsertServiceDashboardFormFields?.map(
                (form: UpsertServiceDashboardFormFieldsDynamicI) => (
                  <Grid key={form?.id} item xs={12} md={form?.md}>
                    <form.component {...form?.componentProps} size="small">
                      {form?.heading ? form?.heading : null}
                    </form.component>
                  </Grid>
                ),
              )}
            </Grid>
            <br />
            <Typography variant="h6" fontWeight={600} color="slateblue.main">
              Use the checkboxes to remove/add any report you want
            </Typography>
            <Box sx={styles()?.multiCheckboxContainer}>
              <DragDropContext onDragEnd={onDragEnd}>
                <RHFMultiCheckboxDraggable
                  name="reports"
                  options={dashboardWidgetsWatch}
                />
              </DragDropContext>
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="text"
                onClick={() =>
                  setIsPortalOpen({
                    isView: true,
                    isStaticView: true,
                    data: reports,
                  })
                }
                startIcon={<Visibility />}
              >
                Preview Dashboard
              </Button>
            </Box>
          </Grid>
          <Grid item xl={6} xs={12}>
            <Box sx={styles(reports)?.detailsViewBox}>
              <Typography variant="subtitle1" color="slateBlue.main" mb={2}>
                Details view
              </Typography>

              {!!!reports?.length ? (
                <NoData image={DashboardMockImage} message="" />
              ) : (
                <Grid
                  container
                  spacing={3}
                  p={2}
                  maxHeight={'70vh'}
                  overflow={'auto'}
                >
                  {reports?.map((item: any) => (
                    <Grid item xs={12} key={item}>
                      {AIR_SERVICES_DASHBOARD_WIDGETS_COMPONENTS?.[item] &&
                        createElement(
                          AIR_SERVICES_DASHBOARD_WIDGETS_COMPONENTS?.[item],
                          {
                            ticketType: TICKET_GRAPH_TYPES?.PRIORITY,
                            isPreviewMode: true,
                          },
                        )}
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          </Grid>
        </Grid>
        <Box display="flex" gap="0.6rem" justifyContent="flex-end">
          <LoadingButton
            variant="outlined"
            color="secondary"
            onClick={() => router?.push(AIR_SERVICES?.MANAGE_DASHBOARD)}
            disabled={
              addSingleServicesDashboardStatus?.isLoading ||
              updateSingleServicesDashboardStatus?.isLoading
            }
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            variant="contained"
            type="submit"
            disabled={
              addSingleServicesDashboardStatus?.isLoading ||
              updateSingleServicesDashboardStatus?.isLoading
            }
          >
            {action === DASHBOARD?.EDIT
              ? GENERIC_UPSERT_FORM_CONSTANT?.UPDATE
              : GENERIC_UPSERT_FORM_CONSTANT?.CREATE}
          </LoadingButton>
        </Box>
      </FormProvider>
      {isPortalOpen?.isView && (
        <PreviewDashboard
          isPortalOpen={isPortalOpen}
          setIsPortalOpen={setIsPortalOpen}
        />
      )}
    </>
  );
};
