import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { Box, Button, Grid, Typography } from '@mui/material';
import { emailMarketingTabsData } from './EmailMarketing.data';
import All from './Tabs/All';
import Archived from './Tabs/Archived';
import Draft from './Tabs/Draft';
import Scheduled from './Tabs/Scheduled';
import Sent from './Tabs/Sent';
import Search from '@/components/Search';
import { ExportIcon, FilterrIcon, PlusIcon } from '@/assets/icons';
import ActionButton from './ActionButton';
import useEmailMarketing from './useEmailMarketing';
import EmailFolder from './EmailFolder';
import { ExportButton } from './ExportButton';

const EmailMarketing = () => {
  const {
    handleOpenFilter,
    theme,
    handleExportModalOpen,
    isExportModalOpen,
    searchEmailMarketing,
    setSearchEmailMarketing,
  } = useEmailMarketing();
  return (
    <>
      <Grid container>
        <Grid item lg={3} sx={{ mb: 2 }}>
          <Typography variant="h4">Email Marketing</Typography>
        </Grid>
        <Grid item lg={9} sx={{ textAlign: 'end' }}>
          <Search
            searchBy={searchEmailMarketing}
            setSearchBy={setSearchEmailMarketing}
            label="Search Here"
            width={260}
            size="large"
          />
          <Button
            variant="outlined"
            color="inherit"
            sx={{ margin: '0px 18px', py: '15px' }}
            onClick={handleExportModalOpen}
          >
            <ExportIcon /> &nbsp; Export
          </Button>
          <Button variant="outlined" color="inherit">
            Compare Email
          </Button>
          <Button
            variant="contained"
            style={{ margin: '0px 18px' }}
            startIcon={<PlusIcon />}
          >
            Create New Email
          </Button>
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          sx={{ display: { lg: 'flex' }, justifyContent: { lg: 'end' } }}
        >
          <Box sx={{ display: { lg: 'flex' }, marginTop: '8px' }}>
            <ActionButton />
            <Button
              startIcon={<FilterrIcon />}
              onClick={handleOpenFilter}
              sx={{
                border: `1px solid ${theme?.palette?.custom?.dark}`,
                color: theme?.palette?.custom?.main,
                width: '95px',
                height: '36px',
                marginLeft: '8px',
              }}
            >
              Filter
            </Button>
          </Box>
        </Grid>

        <Grid item lg={12}>
          <HorizontalTabs tabsDataArray={emailMarketingTabsData}>
            <All />
            <Archived />
            <Draft />
            <Scheduled />
            <Sent />
          </HorizontalTabs>
        </Grid>
        <Grid item lg={12}>
          <EmailFolder />
        </Grid>
      </Grid>
      <ExportButton
        isExportModalOpen={isExportModalOpen}
        handleExportModalOpen={handleExportModalOpen}
      />
    </>
  );
};
export default EmailMarketing;
