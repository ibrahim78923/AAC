import { NoDashboardWidgetImage } from '@/assets/images';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Button, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DASHBOARD, GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { Visibility } from '@mui/icons-material';
import { useUpsertDashboard } from './useUpsertDashboard';
import { pxToRem } from '@/utils/getFontValue';
import { AddWidgets } from './AddWidgets';
import { StaticDashboardWidgets } from '../StaticDashboardWidgets';
import { Header } from './Header';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { HeadingFormGrid } from '@/components/Grids/HeadingFormGrid';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';

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

  return (
    <>
      <Header />
      <ApiRequestFlow
        showSkeleton={showLoader}
        hasError={isError}
        refreshApi={refetch}
      >
        <ContainerGrid>
          <CustomGrid
            xl={6}
            customStyles={{
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '100%',
            }}
          >
            <Box flexGrow={1}>
              <FormProvider methods={methods}>
                <HeadingFormGrid
                  formFieldsList={upsertServiceDashboardFormFields}
                />
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
          </CustomGrid>
          <CustomGrid xl={6}>
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
          </CustomGrid>
        </ContainerGrid>
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
      </ApiRequestFlow>
    </>
  );
};
