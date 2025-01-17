import React from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { styles } from './styles';
import useCreateContractSidebar from './useCreateContractSidebar';
import DataFields from './DataFields';
import Details from './Details';
import Signees from './Signees';

export default function CreateContractSidebar({
  handleAddDynamicField,
  allDataFields,
}: any) {
  const { tabValue, handleChangeTab } = useCreateContractSidebar();

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
        <DataFields
          allDataFields={allDataFields}
          handleAddDynamicField={handleAddDynamicField}
        />
      </TabPanel>

      <TabPanel value="details">
        <Details />
      </TabPanel>

      <TabPanel value="signees">
        <Signees />
      </TabPanel>
    </TabContext>
  );
}
