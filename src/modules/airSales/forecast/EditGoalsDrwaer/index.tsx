import CommonDrawer from '@/components/CommonDrawer';
import CommonTabs from '@/components/Tabs';
import { Box } from '@mui/material';
import NotificationsTab from './NotificationsTab';
import GoalTab from './GoalTab';

const EditGoalsDrwaer = (props: any) => {
  const { isOpenDrawer, onClose } = props;

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      title="Edit Revenue Goals"
      okText="Save"
      onClose={onClose}
      isOk={true}
      isCancel={true}
      footer={true}
    >
      <Box>
        <CommonTabs tabsArray={['Goal', 'Notifications']}>
          <GoalTab />
          <NotificationsTab />
        </CommonTabs>
      </Box>
    </CommonDrawer>
  );
};

export default EditGoalsDrwaer;
