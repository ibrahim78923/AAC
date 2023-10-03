import { Grid } from '@mui/material';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { TEST_COMPONENT_TABS } from './DetaileVeiwTab.data';
export const DetailTabs = () => {
  return (
    <>
      <Grid sx={{ mt: '2rem' }}>
        <HorizontalTabs tabsDataArray={TEST_COMPONENT_TABS} />;
      </Grid>
    </>
  );
};

export default DetailTabs;
