import CommonDrawer from '@/components/CommonDrawer';
import CommonTabs from '@/components/Tabs';
import { Box } from '@mui/material';
import NotificationsTab from './NotificationsTab';
import GoalTab from './GoalTab';
import { useGetSingleForecastGoalsQuery } from '@/services/airSales/forecast';
import { isNullOrEmpty } from '@/utils';
import { useEffect, useState } from 'react';
import { useGetDealPipeLineQuery } from '@/services/airSales/deals';

const EditGoalsDrwaer = (props: any) => {
  const { isOpenDrawer, onClose, tableRowValues } = props;
  const [editNotificationOptions, setEditNotificationOptions] = useState();

  const { data: getOneGoal, isLoading } = useGetSingleForecastGoalsQuery(
    { id: tableRowValues },
    { skip: isNullOrEmpty(tableRowValues) },
  );

  const notificationsData = getOneGoal?.data?.notification;
  // State to manage selected notifications

  // Function to handle checkbox change
  const handleCheckboxChange = (value: any) => {
    setEditNotificationOptions((prev: any) => {
      if (prev?.includes(value)) {
        return prev?.filter((notification: any) => notification !== value);
      } else {
        return [...prev, value];
      }
    });
  };
  useEffect(() => {
    setEditNotificationOptions(notificationsData);
  }, [getOneGoal]);

  const { data: dealPipelineData } = useGetDealPipeLineQuery({ meta: false });

  const processData = (data: any) => {
    return data?.map((item: any) => ({
      value: item?.name,
      label: item?.name,
    }));
  };

  const dealPipelineOption = processData(dealPipelineData?.data);

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      title="Edit Revenue Goals"
      okText="Save"
      onClose={onClose}
      isOk={true}
      isCancel={true}
      footer={true}
      // submitHandler={handleSubmit(onSubmit)}
    >
      <Box>
        <CommonTabs tabsArray={['Goal', 'Notifications']}>
          <GoalTab
            getOneGoal={getOneGoal}
            isLoading={isLoading}
            dealPipelineOption={dealPipelineOption}
          />
          <NotificationsTab
            editNotificationOptions={editNotificationOptions}
            handleCheckboxChange={handleCheckboxChange}
          />
        </CommonTabs>
      </Box>
    </CommonDrawer>
  );
};

export default EditGoalsDrwaer;
