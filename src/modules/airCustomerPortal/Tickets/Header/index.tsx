import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Box, Button, Typography, MenuItem, Popover } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { useRouter } from 'next/router';
import ReportAnIssueModal from '../../Dashboard/ReportAnIssueModal';

export const Header = (props: any) => {
  const { push } = useRouter();
  const {
    openReportAnIssueModal,
    setOpenReportAnIssueModal,
    allTicketsDropdownFunction,
    handleSubmitModal,
    handleButtonClick,
    handleClose,
    anchorEl,
    open,
  } = props;
  return (
    <>
      <Box
        mb={2}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={0.5}
      >
        <Typography variant="h4">All tickets</Typography>
        <Box display={'flex'} gap={1}>
          <SingleDropdownButton
            dropdownOptions={allTicketsDropdownFunction}
            dropdownName={'All Tickets'}
          />
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
