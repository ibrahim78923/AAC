import React from 'react';

import { Box, Button, Typography } from '@mui/material';

import ViewCompaignDetails from './ViewCompaignDetails';
import useCompaigns from '../useCompaigns';
import Performance from './Tabs/Performace';

import CommonTabs from '@/components/Tabs';

import { BackArrowIcon } from '@/assets/icons';
import { PlusIcon } from '@/assets/icons';

import Tasks from './Tabs/Tasks';
import Assets from './Tabs/Assets';
import { useRouter } from 'next/router';

const ViewPerforance = () => {
  const { setTabVal } = useCompaigns();
  const router = useRouter();
  return (
    <Box
      sx={{ border: '1px solid #EAECF0', p: '24px 0px', borderRadius: '8px' }}
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
          <Typography variant="h4">Compaigns</Typography>
        </Box>

        <Box>
          <Button variant="contained" startIcon={<PlusIcon />}>
            View Assets
          </Button>
        </Box>
      </Box>
      <ViewCompaignDetails />
      <Box sx={{ padding: '0px 24px' }}>
        <CommonTabs
          getTabVal={(val: number) => setTabVal(val)}
          searchBarProps={{
            label: 'Search Here',
            setSearchBy: 'setFilterValues',
            searchBy: ' filterValues?.search',
            width: '260px',
          }}
          isHeader={true}
          tabsArray={['Performance', 'Assets', 'Tasks']}
        >
          <Performance />
          <Assets />
          <Tasks />
        </CommonTabs>
      </Box>
    </Box>
  );
};
export default ViewPerforance;
