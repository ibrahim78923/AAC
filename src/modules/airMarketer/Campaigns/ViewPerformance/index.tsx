import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import ViewCompaignDetails from './ViewCompaignDetails';
import Performance from './Tabs/Performace';
import { BackArrowIcon } from '@/assets/icons';
import { PlusIcon } from '@/assets/icons';
import Tasks from './Tabs/Tasks';
import Assets from './Tabs/Assets';
import { useRouter } from 'next/router';
import useCampaigns from '../useCampaigns';
import AddAssets from './AddAssets/Settings';
import CommonTabs from '@/components/Tabs';

const ViewPerformance = () => {
  const router = useRouter();
  const theme = useTheme();
  const {
    setIsOpenAddAssets,
    handleCloseAddAssetsModal,
    isOpenAddAssets,
    searchVal,
    setSearchVal,
  } = useCampaigns();
  return (
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
        <Box sx={{ display: 'flex', cursor: 'pointer' }}>
          <Box mt={0.7} mr={2} onClick={() => router.back()}>
            <BackArrowIcon />
          </Box>
          <Typography variant="h4">Campaigns</Typography>
        </Box>

        <Box>
          <Button
            variant="contained"
            className="small"
            startIcon={<PlusIcon />}
            onClick={() => setIsOpenAddAssets(true)}
          >
            Add Assets
          </Button>
        </Box>
      </Box>
      <ViewCompaignDetails />
      <Box sx={{ padding: '0px 24px' }}>
        <CommonTabs
          searchBarProps={{
            label: 'Search Here',
            setSearchBy: setSearchVal,
            searchBy: searchVal,
          }}
          tabsArray={['Performance', 'Assets', 'Tasks']}
          isHeader={true}
        >
          <Performance />
          <Assets />
          <Tasks />
        </CommonTabs>
      </Box>
      {isOpenAddAssets && (
        <AddAssets
          closeAddAssets={handleCloseAddAssetsModal}
          isOpenAddAssets={isOpenAddAssets}
          theme={theme}
        />
      )}
    </Box>
  );
};
export default ViewPerformance;
