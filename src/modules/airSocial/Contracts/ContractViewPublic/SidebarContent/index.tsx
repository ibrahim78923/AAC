import React from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { styles } from './SidebarContent.style';
import useSidebarContent from './useSidebarContent';
import DataFields from './DataFields';
import Details from './Details';
import Signees from './Signees';

interface SidebarContentProps {
  contractData: any;
}

export default function SidebarContent({ contractData }: SidebarContentProps) {
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
        <DataFields dataFieldsData={contractData?.dynamicFields || []} />
      </TabPanel>

      <TabPanel value="details">
        <Details
          data={{
            ownerData: contractData?.owner || {},
            createdAt: contractData?.createdAt,
            contractId: contractData?._id,
            sharedWithUsers: contractData?.sharedWithUsers || [],
          }}
        />
      </TabPanel>

      <TabPanel value="signees">
        <Signees data={contractData?.signees || []} />
      </TabPanel>
    </TabContext>
  );
}
