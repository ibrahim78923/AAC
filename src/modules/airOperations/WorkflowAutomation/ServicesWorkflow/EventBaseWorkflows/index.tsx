import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { Box, useTheme } from '@mui/material';
import { eventBaseWorkflowTabsData } from './EventBaseWorkflow.data';
import Tickets from './Tickets';
import Assets from './Assets';
import Tasks from './Tasks';

const EventBaseWorkflows = () => {
  const theme = useTheme();
  return (
    <>
      <Box
        border={`1px solid ${theme?.palette?.grey?.[700]}`}
        borderRadius={2}
        boxShadow={1}
        p={2}
      >
        <HorizontalTabs tabsDataArray={eventBaseWorkflowTabsData}>
          <Tickets />
          <Assets />
          <Tasks />
        </HorizontalTabs>
      </Box>
    </>
  );
};

export default EventBaseWorkflows;
