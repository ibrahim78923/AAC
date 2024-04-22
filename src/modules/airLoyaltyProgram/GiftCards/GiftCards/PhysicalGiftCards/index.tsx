import { Box } from '@mui/material';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { AssignedPhysicalGiftCards } from './AssignedPhysicalGiftCards';
import { NotAssignedPhysicalGiftCards } from './NotAssignedPhysicalGiftCards';

export const PhysicalGiftCards = () => {
  return (
    <Box
      border={`.1rem solid`}
      borderColor={'grey.700'}
      borderRadius={2}
      p={1.5}
    >
      <HorizontalTabs tabsDataArray={['Assigned', 'Not Assigned']}>
        <AssignedPhysicalGiftCards />
        <NotAssignedPhysicalGiftCards />
      </HorizontalTabs>
    </Box>
  );
};
