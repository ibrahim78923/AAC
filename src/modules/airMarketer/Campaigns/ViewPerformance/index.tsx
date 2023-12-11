import React from 'react';

import { Box, Button, Typography, useTheme } from '@mui/material';
import ViewCompaignDetails from './ViewCompaignDetails';
import Performance from './Tabs/Performace';
import { BackArrowIcon } from '@/assets/icons';
import { PlusIcon } from '@/assets/icons';

import Tasks from './Tabs/Tasks';
import Assets from './Tabs/Assets';
import { useRouter } from 'next/router';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import useCampaigns from '../useCampaigns';
import AddAssets from './AddAssets/Settings';

const ViewPerformance = () => {
  const router = useRouter();
  const theme = useTheme();
  const { setIsOpenAddAssets, handleCloseAddAssetsModal, isOpenAddAssets } =
    useCampaigns();
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
            startIcon={<PlusIcon />}
            onClick={() => setIsOpenAddAssets(true)}
          >
            View Assets
          </Button>
        </Box>
      </Box>
      <ViewCompaignDetails />
      <Box sx={{ padding: '0px 24px' }}>
        <HorizontalTabs tabsDataArray={['Performance', 'Assets', 'Tasks']}>
          <Performance />
          <Assets />
          <Tasks />
        </HorizontalTabs>
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
