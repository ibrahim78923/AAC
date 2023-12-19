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

const EmailMarketing = () => {
  const { isOpenFilter, setIsOpenFilter, handleExportModalOpen } =
    useEmailMarketing();
  return (
    <Grid container>
      <Grid item md={12} lg={3}>
        <Typography variant="h4">Email Marketing</Typography>
      </Grid>
      <Grid item md={12} lg={9} sx={{ textAlign: 'end' }}>
        <Search label="Search Here" width={260} size="small" />

        <Button
          variant="outlined"
          color="inherit"
          className="small"
          style={{ margin: '0px 18px' }}
          sx={{ md: { m: 3 } }}
        >
          Export
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          className="small"
          sx={{ md: { mt: 3 } }}
        >
          Compare Email
        </Button>
        <Button
          variant="contained"
          className="small"
          style={{ margin: '0px 18px' }}
          startIcon={<PlusIcon />}
          sx={{ md: { mt: 3 } }}
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
          <Button
            variant="outlined"
            color="inherit"
            sx={{ margin: '0px 18px', py: '15px' }}
            onClick={handleExportModalOpen}
          >
            <ExportIcon /> &nbsp; Export
          </Button>
          <Tooltip title={'Refresh Filter'}>
            <Button
              sx={{ marginLeft: '8px' }}
              variant="outlined"
              color="inherit"
              className="small"
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
    </Grid>
  );
};
export default EmailMarketing;
