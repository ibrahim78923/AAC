import { Box, Grid, Typography } from '@mui/material';
import { settingTabsOptions } from './Settings.data';
import CommonModal from '@/components/CommonModal';
import Search from '@/components/Search';

const Settings = ({ closeAddAssets, isOpenAddAssets }: any) => {
  return (
    <CommonModal
      title="Add Assets"
      open={isOpenAddAssets}
      handleClose={closeAddAssets}
    >
      <Grid container>
        <Grid item lg={3}>
          <Typography variant="h4">Settings</Typography>
          {settingTabsOptions?.map((settingTabsOptionsNames) => (
            <Typography
              key={settingTabsOptionsNames?.name}
              pt={3}
              style={{ cursor: 'pointer' }}
            >
              {settingTabsOptionsNames?.name}
            </Typography>
          ))}
        </Grid>
        <Grid item lg={9}>
          <Box>
            <Search width={260} label="Search Here" />
          </Box>
        </Grid>
      </Grid>
    </CommonModal>
  );
};
export default Settings;
