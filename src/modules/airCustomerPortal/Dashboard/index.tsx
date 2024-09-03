import { Button, Grid } from '@mui/material';
import { useDashboard } from './useDashboard';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES } from '@/constants';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ROLES } from '@/constants/strings';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_CUSTOMER_PORTAL_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ReportIssue } from '../Tickets/ReportIssue';
import NonRegisterDashboard from './NonRegisterDashboard';

const Dashboard = () => {
  const {
    openReportAnIssueModal,
    setOpenReportAnIssueModal,
    router,
    user,
    newTicketsDropdown,
    dashboardWidgets,
  } = useDashboard();

  if (!user) return <NonRegisterDashboard />;

  return (
    <>
      <PageTitledHeader title="Customer Portal - Dashboards">
        {[ROLES?.ORG_EMPLOYEE, ROLES?.ORG_ADMIN]?.includes(user?.role) && (
          <Button
            variant="outlined"
            color="secondary"
            startIcon={
              <ArrowBackIcon color={'secondary'} sx={{ cursor: 'pointer' }} />
            }
            onClick={() => router?.push(AIR_SERVICES?.DASHBOARD)}
          >
            Revert
          </Button>
        )}
        <PermissionsGuard
          permissions={[
            AIR_CUSTOMER_PORTAL_DASHBOARD_PERMISSIONS?.REPORT_AN_ISSUES,
            AIR_CUSTOMER_PORTAL_DASHBOARD_PERMISSIONS?.SENT_SERVICES_REQUEST,
          ]}
        >
          <SingleDropdownButton
            dropdownOptions={newTicketsDropdown}
            dropdownName={'New'}
            btnVariant="contained"
            color="primary"
            startIcon={<AddBoxIcon />}
          />
        </PermissionsGuard>
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
