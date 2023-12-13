import { Box, Button, MenuItem, Popover, Typography } from '@mui/material';
import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ReportAnIssueModal from '../ReportAnIssueModal';
import { useDashboard } from '../useDashboard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AIR_CUSTOMER_PORTAL } from '@/constants';

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
          <Popover
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{ mt: '0.5rem' }}
          >
            <MenuItem onClick={handleClose}>Report an Issue</MenuItem>
            <MenuItem
              onClick={() =>
                push({
                  pathname: AIR_CUSTOMER_PORTAL?.CATALOG_SERVICES,
                })
              }
            >
              Request a service
            </MenuItem>
          </Popover>
        </Box>
      </Box>
      <ReportAnIssueModal
        openReportAnIssueModal={openReportAnIssueModal}
        setOpenReportAnIssueModal={setOpenReportAnIssueModal}
        handleSubmitModal={handleSubmitModal}
      />
    </>
  );
};
