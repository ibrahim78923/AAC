import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { Box, Button, Grid, Tooltip, Typography } from '@mui/material';
import { emailMarketingTabsData } from './EmailMarketing.data';
import All from './Tabs/All';
import Archived from './Tabs/Archived';
import Draft from './Tabs/Draft';
import Scheduled from './Tabs/Scheduled';
import Sent from './Tabs/Sent';
import Search from '@/components/Search';
import { FilterrIcon, PlusIcon, RefreshTasksIcon } from '@/assets/icons';
import ActionButton from './ActionButton';
import useEmailMarketing from './useEmailMarketing';
import Filters from './Filters';

const EmailMarketing = () => {
  const { handleOpenFilter, theme, isOpenFilter, setIsOpenFilter } =
    useEmailMarketing();
  return (
    <Grid container>
      <Grid item lg={3}>
        <Typography variant="h4">Email Marketing</Typography>
      </Grid>
      <Grid item lg={9} sx={{ textAlign: 'end' }}>
        <Search label="Search Here" width={260} size="small" />

        <Button
          variant="outlined"
          color="inherit"
          className="small"
          style={{ margin: '0px 18px' }}
        >
          Export
        </Button>
        <Button variant="outlined" color="inherit" className="small">
          Compare Email
        </Button>
        <Button
          variant="contained"
          className="small"
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
