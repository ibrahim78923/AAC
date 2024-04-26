import React from 'react';
import CommonDrawer from '@/components/CommonDrawer';
import CommonTabs from '@/components/Tabs';
import { Box, Button } from '@mui/material';
import SegmentsConditions from './SegmentsConditions';
import SegmentContacts from './SegmentsContacts';
import { ExportIcon } from '@/assets/icons';

const Segments = ({ open, onClose }: any) => {
  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      okText="Create Audience"
      title="Segments"
      isOk
      footer
    >
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button variant="outlined" color="inherit" startIcon={<ExportIcon />}>
            Export Contacts
          </Button>
        </Box>
        <CommonTabs tabsArray={['Segments Conditions ', 'Contacts(0)']}>
          <SegmentsConditions />
          <SegmentContacts />
        </CommonTabs>
      </Box>
    </CommonDrawer>
  );
};

export default Segments;
