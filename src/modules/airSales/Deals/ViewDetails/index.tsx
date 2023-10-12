import React from 'react';

import { Box } from '@mui/material';

import { singleTaskTabsData } from '../Deals.data';

import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import Details from './Details';
import ActivityLog from './ActivityLog';
import Tasks from './Tasks';
import Notes from './Notes';
import Calls from './Calls';
import Emails from './Emails';
import Meetings from './Meetings';
import Associations from './Associations';

const DealsViewDetails = () => {
  return (
    <Box>
      <HorizontalTabs tabsDataArray={singleTaskTabsData}>
        <Details />
        <ActivityLog />
        <Associations />
        <Tasks />
        <Notes />
        <Calls />
        <Meetings />
        <Emails />
      </HorizontalTabs>
    </Box>
  );
};

export default DealsViewDetails;
