import { useDashboard } from './useDashboard';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ReportIssue } from '../Tickets/ReportIssue';
import NonRegisterDashboard from './NonRegisterDashboard';
import { PublicSingleDropdownButton } from '@/components/Buttons/PublicSingleDropdownButton';
import { customizePortalDefaultValues } from '@/layout/CustomerPortal/CustomerPortal.data';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';

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
      <ContainerGrid>
        {dashboardWidgets?.map((item: any) => (
          <CustomGrid key={item?._id} lg={item?.lg}>
            <item.component {...item?.componentProps} />
          </CustomGrid>
        ))}
      </ContainerGrid>
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
