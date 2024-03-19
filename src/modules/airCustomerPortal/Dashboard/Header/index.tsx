import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ReportAnIssueModal from '../ReportAnIssueModal';
import { useDashboard } from '../useDashboard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AIR_CUSTOMER_PORTAL, AIR_SERVICES } from '@/constants';
import { useRouter } from 'next/router';
import { AIR_CUSTOMER_PORTAL_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

export const Header = () => {
  const {
    openReportAnIssueModal,
    setOpenReportAnIssueModal,
    open,
    anchorEl,
    handleButtonClick,
    handleClose,
    handleSubmitModal,
    push,
  }: any = useDashboard();
  const router = useRouter();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: '0.75rem 1.5rem',
          borderRadius: '0.75rem',
          background: 'white',
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: '1.875rem' }}
        >
          Customer Portal - Dashboard
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2.4,
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            startIcon={
              <ArrowBackIcon color={'secondary'} sx={{ cursor: 'pointer' }} />
            }
            onClick={() => router?.push(AIR_SERVICES?.DASHBOARD)}
          >
            revert
          </Button>
          <Button
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={handleButtonClick}
            startIcon={<AddBoxIcon />}
            endIcon={<ArrowDropDownIcon />}
          >
            New
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{ padding: 2 }}
          >
            <PermissionsGuard
              permissions={[
                AIR_CUSTOMER_PORTAL_DASHBOARD_PERMISSIONS?.REPORT_AN_ISSUES,
              ]}
            >
              <MenuItem
                onClick={() => {
                  setOpenReportAnIssueModal?.(true);
                  handleClose?.();
                }}
              >
                Report an Issue
              </MenuItem>
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[
                AIR_CUSTOMER_PORTAL_DASHBOARD_PERMISSIONS?.SENT_SERVICES_REQUEST,
              ]}
            >
              <MenuItem
                onClick={() =>
                  push({
                    pathname: AIR_CUSTOMER_PORTAL?.CATALOG_SERVICES,
                  })
                }
              >
                Request a service
              </MenuItem>
            </PermissionsGuard>
          </Menu>
        </Box>
      </Box>
      {openReportAnIssueModal && (
        <ReportAnIssueModal
          openReportAnIssueModal={openReportAnIssueModal}
          setOpenReportAnIssueModal={setOpenReportAnIssueModal}
          handleSubmitModal={handleSubmitModal}
        />
      )}
    </>
  );
};
