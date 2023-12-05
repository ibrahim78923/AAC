import CommonTabs from '@/components/Tabs';
import { Box, Button, Typography } from '@mui/material';
import Manage from './Manage';
import useCampaigns from './useCampaigns';
import { PlusIcon } from '@/assets/icons';
import Tasks from './Tasks';
import ImportIcon from '@/assets/icons/shared/import-icon';
import Filters from './Filters';
import { campaignsTabs } from './Campaigns.data';

const Campaigns = () => {
  const { setTabVal, isOpenFilter, setIsOpenFilter } = useCampaigns();
  return (
    <Box>
      <Box
        sx={{ border: '1px solid #EAECF0', p: '24px 0px', borderRadius: '8px' }}
      >
        <Box
          justifyContent="space-between"
          alignItems="center"
          sx={{ padding: '0px 24px', display: { md: 'flex' } }}
        >
          <Typography variant="h4">Campaigns</Typography>

          <Box>
            <Button
              variant="outlined"
              className="small"
              color="inherit"
              sx={{ mr: 1, mt: 0.2 }}
              startIcon={<ImportIcon />}
            >
              Compare campaigns
            </Button>
            <Button
              variant="contained"
              className="small"
              startIcon={<PlusIcon />}
            >
              Create campaigns
            </Button>
          </Box>
        </Box>

        <Box sx={{ padding: '0px 24px' }}>
          <CommonTabs
            getTabVal={(val: number) => setTabVal(val)}
            isHeader={true}
            tabsArray={campaignsTabs}
          >
            <Manage />
            <Manage />
            <Tasks />
          </CommonTabs>
        </Box>
      </Box>
      {isOpenFilter && (
        <Filters
          isOpenDrawer={isOpenFilter}
          onClose={() => setIsOpenFilter(false)}
        />
      )}
    </Box>
  );
};
export default Campaigns;
