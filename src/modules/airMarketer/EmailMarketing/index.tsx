import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { Box, Button, Grid, Tooltip, Typography } from '@mui/material';
import { emailMarketingTabsData } from './EmailMarketing.data';
import All from './Tabs/All';
import Archived from './Tabs/Archived';
import Draft from './Tabs/Draft';
import Scheduled from './Tabs/Scheduled';
import Sent from './Tabs/Sent';
import Search from '@/components/Search';
import { ExportIcon, PlusIcon, RefreshTasksIcon } from '@/assets/icons';
import ActionButton from './ActionButton';
import useEmailMarketing from './useEmailMarketing';
import Filters from './Filters';
import EmailFolder from './EmailFolder';
import { ExportButton } from './ExportButton';

const EmailMarketing = () => {
  const {
    isOpenFilter,
    setIsOpenFilter,
    handleExportModalOpen,
    searchEmailMarketing,
    isExportModalOpen,
    setSearchEmailMarketing,
  } = useEmailMarketing();
  return (
    <Grid container>
      <Grid item md={12} lg={3}>
        <Typography variant="h4">Email Marketing</Typography>
      </Grid>
      <Grid item md={12} lg={9} sx={{ textAlign: 'end' }}>
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
        mt={3}
        sx={{ display: { lg: 'flex' }, justifyContent: { lg: 'end' } }}
      >
        <Box sx={{ display: { lg: 'flex' }, marginTop: '8px' }}>
          <ActionButton />
          <Tooltip title={'Refresh Filter'}>
            <Button
              sx={{ marginLeft: '8px' }}
              variant="outlined"
              color="inherit"
            >
              <RefreshTasksIcon />
            </Button>
          </Tooltip>
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
      {
        <Filters
          isOpenDrawer={isOpenFilter}
          onClose={() => setIsOpenFilter(false)}
        />
      }
      {isExportModalOpen && (
        <ExportButton
          isExportModalOpen={isExportModalOpen}
          handleExportModalOpen={handleExportModalOpen}
        />
      )}
    </Grid>
  );
};
export default EmailMarketing;
