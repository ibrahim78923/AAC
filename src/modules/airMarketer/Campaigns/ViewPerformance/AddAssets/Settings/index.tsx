import { Box, Grid, Typography } from '@mui/material';
import { settingTabsOptions } from './Settings.data';
import CommonModal from '@/components/CommonModal';
import Search from '@/components/Search';
import { v4 as uuidv4 } from 'uuid';
import useSettings from './useSettings';
import { useState } from 'react';

const Settings = ({ closeAddAssets, isOpenAddAssets }: any) => {
  const { accordianTableInfo, SelectedAccordianTable } = useSettings();
  const [searchBy, setSearchBy] = useState('');
  return (
    <CommonModal
      title="Add Assets"
      open={isOpenAddAssets}
      handleCancel={closeAddAssets}
    >
      <Grid container>
        <Grid item lg={3}>
          <Typography variant="h4">Settings</Typography>
          {settingTabsOptions?.map((settingTabsOptionsNames) => (
            <Typography
              onClick={() => SelectedAccordianTable(settingTabsOptionsNames)}
              key={uuidv4()}
              pt={3}
              style={{ cursor: 'pointer' }}
            >
              {settingTabsOptionsNames?.name}
            </Typography>
          ))}
        </Grid>
        <Grid item lg={9}>
          <Box mb={4}>
            <Search
              width={260}
              label="Search Here"
              size="small"
              setSearchBy={setSearchBy}
              searchBy={searchBy}
            />
          </Box>
          {accordianTableInfo}
        </Grid>
      </Grid>
    </CommonModal>
  );
};
export default Settings;
