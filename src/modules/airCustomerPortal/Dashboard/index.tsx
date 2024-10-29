import { Grid } from '@mui/material';
import { useDashboard } from './useDashboard';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ReportIssue } from '../Tickets/ReportIssue';
import NonRegisterDashboard from './NonRegisterDashboard';
import { PublicSingleDropdownButton } from '@/components/PublicSingleDropdownButton';
import { customizePortalDefaultValues } from '@/layout/CustomerPortal/CustomerPortal.data';

const Dashboard = () => {
  const {
    openReportAnIssueModal,
    setOpenReportAnIssueModal,
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
        <PublicSingleDropdownButton
          dropdownOptions={newTicketsDropdown}
          className="small"
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
