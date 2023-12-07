import { Box, Button, Typography } from '@mui/material';
import Manage from './Manage';
import useCampaigns from './useCampaigns';
import { PlusIcon } from '@/assets/icons';
import Tasks from './Tasks';
import ImportIcon from '@/assets/icons/shared/import-icon';
import Filters from './Filters';
import { campaignsTabs } from './Campaigns.data';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';

const Campaigns = () => {
  const { isOpenFilter, setIsOpenFilter, theme } = useCampaigns();
  return (
    <Box>
      <Box
        sx={{
          border: `1px solid ${theme?.palette?.custom?.off_white_three} `,
          p: '24px 0px',
          borderRadius: '8px',
        }}
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
          <HorizontalTabs tabsDataArray={campaignsTabs}>
            <Manage />
            <Manage />
            <Tasks />
          </HorizontalTabs>
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
