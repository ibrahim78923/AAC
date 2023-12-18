import { Box, Button, Typography, MenuItem, Popover } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { useRouter } from 'next/router';
import Search from '@/components/Search';
import { useState } from 'react';
import ReportAnIssueModal from '../../Dashboard/ReportAnIssueModal';

export const Header = (props: any) => {
  const [search, setSearch] = useState('');
  const { push } = useRouter();
  const {
    handleButtonClick,
    handleClose,
    anchorEl,
    open,
    openReportAnIssueModal,
    setOpenReportAnIssueModal,
    handleSubmitModal,
  } = props;
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={0.5}
      >
        <Typography variant="h4">Knowledge Base</Typography>
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
      <Box mb={2} mt={2}>
        <Search
          label="Search Here"
          value={search}
          onChange={(e: any) => setSearch(e?.target?.value)}
        />
      </Box>
      <ReportAnIssueModal
        openReportAnIssueModal={openReportAnIssueModal}
        setOpenReportAnIssueModal={setOpenReportAnIssueModal}
        handleSubmitModal={handleSubmitModal}
      />
    </>
  );
};
