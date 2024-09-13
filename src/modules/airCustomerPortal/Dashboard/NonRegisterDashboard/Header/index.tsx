import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { ReportIssue } from '@/modules/airCustomerPortal/Tickets/ReportIssue';
import { AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS } from '@/constants/permission-keys';
import {
  getCustomerPortalPermissions,
  getCustomerPortalStyling,
} from '@/utils';
import { customizePortalDefaultValues } from '@/layout/CustomerPortal/CustomerPortal.data';

export const Header = () => {
  const [openReportAnIssueModal, setOpenReportAnIssueModal] =
    useState<boolean>(false);
  const handleOpenModal = () => {
    setOpenReportAnIssueModal(true);
  };
  const customerPortalPermissions = getCustomerPortalPermissions();
  const reportAnIssuePermission = customerPortalPermissions?.includes(
    AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_SUBMIT_TICKET_BY_EVERYONE,
  );
  const customerPortalStyling = getCustomerPortalStyling();
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
