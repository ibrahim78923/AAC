import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { Grid } from '@mui/material';

const TEST_COMPONENT_TABS = [
  'Details',
  'Tasks',
  'Related  Tickets',
  'Assets',
  'Meetings',
  'Meetings',
  'Conversation',
];

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
