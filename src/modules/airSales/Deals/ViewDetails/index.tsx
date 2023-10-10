import React from 'react';

import { Box } from '@mui/material';

import { singleTaskTabsData } from '../Deals.data';

import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import Details from './Details';
import ActivityLog from './ActivityLog';
import Tasks from './Tasks';
import Notes from './Notes';
import Calls from './Calls';

const DealsViewDetails = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <HorizontalTabs tabsDataArray={singleTaskTabsData}>
          <Details />
          <ActivityLog />
          Content
          <Tasks />
          <Notes />
          <Calls />
          Three
        </HorizontalTabs>
      </Box>
    </Box>
  );
};

export default DealsViewDetails;
