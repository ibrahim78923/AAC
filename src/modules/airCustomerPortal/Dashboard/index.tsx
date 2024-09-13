import { Button, Grid } from '@mui/material';
import { useDashboard } from './useDashboard';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES } from '@/constants';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ROLES } from '@/constants/strings';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ReportIssue } from '../Tickets/ReportIssue';
import NonRegisterDashboard from './NonRegisterDashboard';
import { PublicSingleDropdownButton } from '@/components/PublicSingleDropdownButton';
import { customizePortalDefaultValues } from '@/layout/CustomerPortal/CustomerPortal.data';

const Dashboard = () => {
  const {
    openReportAnIssueModal,
    setOpenReportAnIssueModal,
    router,
    user,
    newTicketsDropdown,
    dashboardWidgets,
    colorChanger,
    theme,
  } = useDashboard();

  if (!user) return <NonRegisterDashboard />;

  return (
    <>
      <PageTitledHeader title="Customer Portal - Dashboards">
        {[ROLES?.ORG_EMPLOYEE, ROLES?.ORG_ADMIN]?.includes(user?.role) && (
          <Button
            variant="outlined"
            startIcon={
              <ArrowBackIcon color={'secondary'} sx={{ cursor: 'pointer' }} />
            }
            onClick={() => router?.push(AIR_SERVICES?.DASHBOARD)}
            sx={{
              borderColor:
                colorChanger?.btnSecondary ||
                customizePortalDefaultValues(theme)?.btnSecondary,
              color:
                colorChanger?.btnSecondary ||
                customizePortalDefaultValues(theme)?.btnSecondary,
              '&:hover': {
                borderColor:
                  colorChanger?.btnSecondary ||
                  customizePortalDefaultValues(theme)?.btnSecondary,
                color:
                  colorChanger?.btnSecondary ||
                  customizePortalDefaultValues(theme)?.btnSecondary,
              },
            }}
          >
            Revert
          </Button>
        )}

        <PublicSingleDropdownButton
          dropdownOptions={newTicketsDropdown}
          dropdownName={'New'}
          btnVariant="contained"
          sx={{
            bgcolor:
              colorChanger?.btnPrimary ||
              customizePortalDefaultValues(theme)?.btnPrimary,
            color: 'common.white',
            '&:hover': {
              bgcolor:
                colorChanger?.btnPrimary ||
                customizePortalDefaultValues(theme)?.btnPrimary,
              color: 'common.white',
            },
          }}
          startIcon={<AddBoxIcon />}
        />
      </PageTitledHeader>
      <Grid container spacing={2}>
        {dashboardWidgets?.map((item: any) => (
          <Grid key={item?._id} item xs={12} lg={item?.lg}>
            <item.component {...item?.componentProps} />
          </Grid>
        ))}
      </Grid>
      {openReportAnIssueModal && (
        <ReportIssue
          isPortalOpen={openReportAnIssueModal}
          setIsPortalOpen={setOpenReportAnIssueModal}
        />
      )}
    </>
  );
};

export default Dashboard;
