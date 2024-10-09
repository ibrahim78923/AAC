import { Box, Button, Typography } from '@mui/material';
import { ReportIssue } from '@/modules/airCustomerPortal/Tickets/ReportIssue';
import { customizePortalDefaultValues } from '@/layout/CustomerPortal/CustomerPortal.data';
import { useHeader } from './useHeader';

export const Header = () => {
  const {
    openReportAnIssueModal,
    setOpenReportAnIssueModal,
    handleOpenModal,
    reportAnIssuePermission,
    customerPortalStyling,
  } = useHeader();
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        p={1.5}
        borderRadius={'1rem'}
        sx={{ backgroundColor: 'white' }}
      >
        <Typography variant="h3">Customer Portal - Dashboard</Typography>

        <Box>
          {reportAnIssuePermission && (
            <Button
              onClick={handleOpenModal}
              className="small"
              variant="contained"
              sx={(theme: any) => ({
                bgcolor:
                  customerPortalStyling?.btnPrimary ||
                  customizePortalDefaultValues(theme)?.btnPrimary,
                color: 'common.white',
                '&:hover': {
                  bgcolor:
                    customerPortalStyling?.btnPrimary ||
                    customizePortalDefaultValues(theme)?.btnPrimary,
                  color: 'common.white',
                },
              })}
            >
              Report an Issue
            </Button>
          )}
          {openReportAnIssueModal && (
            <ReportIssue
              isPortalOpen={openReportAnIssueModal}
              setIsPortalOpen={setOpenReportAnIssueModal}
            />
          )}
        </Box>
      </Box>
    </>
  );
};
