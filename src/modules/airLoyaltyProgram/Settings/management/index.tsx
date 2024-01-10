import { Typography } from '@mui/material';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import ShopsTab from './ShopsTab';
import GroupsTab from './GroupsTab';
import { managementTabs } from './management.data';

const Management = () => {
  return (
    <>
      <Typography variant="h3" pb={2.4} textTransform="capitalize">
        manage Shop
      </Typography>
      <HorizontalTabs tabsDataArray={managementTabs} spacing={0}>
        <ShopsTab />
        <GroupsTab />
      </HorizontalTabs>
    </>
  );
};

export default Management;
