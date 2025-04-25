import React from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { styles } from './SidebarContent.style';
import useSidebarContent from './useSidebarContent';
import DataFields from './DataFields';
import Details from './Details';
import Signees from './Signees';

interface SidebarContentProps {
  dataFieldsData: any;
  ownerData: any;
  signeesData: any;
}

export default function SidebarContent({
  dataFieldsData,
  ownerData,
  signeesData,
}: SidebarContentProps) {
  const { tabValue, handleChangeTab } = useSidebarContent();
  return (
    <TabContext value={tabValue}>
      <Box sx={styles?.container}>
        <TabList
          onChange={handleChangeTab}
          aria-label="create contracts tabs"
          sx={styles?.tabList}
        >
          <Tab label="Data Fields" value="fields" />
          <Tab label="Details" value="details" />
          <Tab label="Signees" value="signees" />
        </TabList>
      </Box>

      <TabPanel value="fields">
        <DataFields dataFieldsData={dataFieldsData} />
      </TabPanel>

      <TabPanel value="details">
        <Details data={ownerData} />
      </TabPanel>

      <TabPanel value="signees">
        <Signees data={signeesData} />
      </TabPanel>
    </TabContext>
  );
}
