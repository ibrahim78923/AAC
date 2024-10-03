import { NoDashboardWidgetImage } from '@/assets/images';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Button, Grid, Typography } from '@mui/material';
import { AIR_SERVICES_DASHBOARD_WIDGETS_COMPONENTS } from './UpsertDashboard.data';
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
import { UpsertServiceDashboardFormFieldsDynamicI } from './UpsertDashboard.interface';
import { createElement } from 'react';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { Visibility } from '@mui/icons-material';
import NoData from '@/components/NoData';
import { useUpsertDashboard } from './useUpsertDashboard';
import { pxToRem } from '@/utils/getFontValue';

const RHFMultiCheckboxDraggable = dynamic(
  () => import('@/components/ReactHookForm/RHFMultiCheckboxDraggable'),
  { ssr: false },
);

const { EDIT, CREATE, UPDATE } = GENERIC_UPSERT_FORM_CONSTANT ?? {};
const { EDIT: EDIT_DASHBOARD } = DASHBOARD ?? {};
const { PRIORITY } = TICKET_GRAPH_TYPES ?? {};

export const UpsertDashboard = () => {
  const {
    methods,
    submitCreateDashboardFilterForm,
    reportsWatch,
    onDragEnd,
    action,
    handleSubmit,
    upsertServiceDashboardFormFields,
    isLoading,
    isFetching,
    isError,
    dashboardWidgetsWatch,
    isPortalOpen,
    setIsPortalOpen,
    refetch,
    apiCallInProgress,
    goToManageDashboard,
  } = useUpsertDashboard();

  if (isLoading || isFetching) return <SkeletonForm />;
  if (isError) return <ApiErrorState canRefresh refresh={refetch} />;

  return (
    <>
      <PageTitledHeader
        title={`${action === EDIT_DASHBOARD ? EDIT : CREATE} Dashboard`}
        canMovedBack
        moveBack={goToManageDashboard}
      />
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(submitCreateDashboardFilterForm)}
      >
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
              <Typography
                variant="h6"
                mt={1}
                fontWeight={'fontWeightMedium'}
                color="slateBlue.main"
              >
                Use the checkboxes to remove/add any report you want
              </Typography>
              <Box>
                <DragDropContext onDragEnd={onDragEnd}>
                  <RHFMultiCheckboxDraggable
                    name="reports"
                    options={dashboardWidgetsWatch}
                  />
                </DragDropContext>
              </Box>
            </Box>
            <Box textAlign={'right'}>
              <Button
                className="small"
                variant="text"
                onClick={() =>
                  setIsPortalOpen({
                    isView: true,
                    isStaticView: true,
                    data: reportsWatch,
                  })
                }
                startIcon={<Visibility />}
              >
                Preview Dashboard
              </Button>
            </Box>
          </Grid>
          <Grid item xl={6} xs={12} overflow={'auto'}>
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
              {!!!reportsWatch?.length ? (
                <NoData
                  image={NoDashboardWidgetImage}
                  message="You have not selected any dashboard"
                />
              ) : (
                <Box
                  p={2}
                  maxHeight={'70vh'}
                  minHeight={'70vh'}
                  overflow={'auto'}
                  minWidth={pxToRem(600)}
                >
                  {reportsWatch?.map((item: any) => (
                    <Box key={item} my={2}>
                      {AIR_SERVICES_DASHBOARD_WIDGETS_COMPONENTS?.[item] &&
                        createElement(
                          AIR_SERVICES_DASHBOARD_WIDGETS_COMPONENTS?.[item],
                          {
                            ticketType: PRIORITY,
                            isPreviewMode: true,
                          },
                        )}
                    </Box>
                  ))}
                </Box>
              )}
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
            disabled={apiCallInProgress}
          >
            {action === EDIT_DASHBOARD ? UPDATE : CREATE}
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
