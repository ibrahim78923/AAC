import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { Box, useTheme } from '@mui/material';
import Tickets from './Tickets';
import Assets from './Assets';
import Tasks from './Tasks';
import Meetings from './Meetings';
import { scheduledWorkflowTabsData } from './ScheduledWorkflow.data';

const ScheduledWorkflows = () => {
  const theme = useTheme();
  return (
    <>
      <Box
        border={`1px solid ${theme?.palette?.grey?.[700]}`}
        borderRadius={2}
        boxShadow={1}
        p={2}
      >
        <HorizontalTabs tabsDataArray={scheduledWorkflowTabsData}>
          <Tickets />
          <Assets />
          <Tasks />
          <Meetings />
        </HorizontalTabs>
      </Box>
    </>
  );
};

export default ScheduledWorkflows;
