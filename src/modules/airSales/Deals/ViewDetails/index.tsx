import React from 'react';

import { Box, Tab, Tabs } from '@mui/material';

import useViewDetails from './ViewDetails.hook';

import { tabsData } from '../Deals.data';

import { v4 as uuidv4 } from 'uuid';

const DealsViewDetails = () => {
  const { value, handleTabChange, CustomTabPanel } = useViewDetails();

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          {tabsData.map((tab) => (
            <Tab key={uuidv4()} label={tab.label} />
          ))}
        </Tabs>
      </Box>
      {tabsData.map((tab, index) => (
        <CustomTabPanel
          key={uuidv4()}
          value={value}
          index={index}
          content={tab.content}
        />
      ))}
    </Box>
  );
};

export default DealsViewDetails;
