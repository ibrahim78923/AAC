import React from 'react';
import CommonDrawer from '@/components/CommonDrawer';
import CommonTabs from '@/components/Tabs';
import { Box } from '@mui/material';
import SegmentsConditions from './SegmentsConditions';
import SegmentContacts from './SegmentsContacts';

const Segments = ({ open, onClose }: any) => {
  return (
    <CommonDrawer isDrawerOpen={open} onClose={onClose}>
      <Box>
        <CommonTabs tabsArray={['Segments Condition ', 'Contacts(0)']}>
          <SegmentsConditions />
          <SegmentContacts />
        </CommonTabs>
      </Box>
    </CommonDrawer>
  );
};

export default Segments;
