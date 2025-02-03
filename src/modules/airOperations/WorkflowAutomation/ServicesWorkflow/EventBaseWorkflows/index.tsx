import { Box } from '@mui/material';
import { eventBaseWorkflowTabsDataDynamic } from './EventBaseWorkflow.data';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';

const EventBaseWorkflows = () => {
  return (
    <>
      <Box
        border={`1px solid `}
        borderColor="grey.700"
        borderRadius={2}
        boxShadow={1}
        p={2}
      >
        <PermissionsTabs
          hasNoPermissions
          spacing={0.3}
          tabsDataArray={eventBaseWorkflowTabsDataDynamic}
        />
      </Box>
    </>
  );
};

export default EventBaseWorkflows;
