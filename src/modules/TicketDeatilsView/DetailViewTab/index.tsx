import { Grid } from '@mui/material';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { testComponentTabs } from './DetaileVeiwTab.data';
export const DetailTabs = () => {
  return (
    <>
      <Grid sx={{ mt: '2rem' }}>
        <HorizontalTabs tabsDataArray={testComponentTabs} />
      </Grid>
    </>
  );
};

export default DetailTabs;
