import CommonDrawer from '@/components/CommonDrawer';
import CommonTabs from '@/components/Tabs';
import { Box } from '@mui/material';
import NotificationsTab from './NotificationsTab';
import GoalTab from './GoalTab';
import {
  useGetSingleForecastGoalsQuery,
  usePatchGoalMutation,
} from '@/services/airSales/forecast';
import { isNullOrEmpty } from '@/utils';
import { useEffect, useState } from 'react';
import { useGetDealPipeLineQuery } from '@/services/airSales/deals';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  editGoalDefaultValues,
  editGoalValidationSchema,
} from './GoalTab/GoalTab.data';
import { enqueueSnackbar } from 'notistack';

const EditGoalsDrwaer = (props: any) => {
  const {
    isOpenDrawer,
    onClose,
    tableRowValues,
    setIsEditDrawer,
    setTableRowValues,
  } = props;
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

  const methods: any = useForm({
    resolver: yupResolver(editGoalValidationSchema),
    defaultValues: editGoalDefaultValues,
  });

  const { handleSubmit, setValue } = methods;
  const [patchGoal, { isLoading: updateIsLoading }] = usePatchGoalMutation();

  const onSubmit = async (values: any) => {
    if (isNullOrEmpty(editNotificationOptions)) {
      enqueueSnackbar('Please select a notification', {
        variant: 'error',
      });
    } else {
      const target = [
        {
          contributorId: getOneGoal?.data?.targets[0]?.contributorId,
          pipelines: [getOneGoal?.data?.targets[0]?.pipelines?._id],
          unit: 'USD',
          year: 2024,
          months: {
            jan: values?.jan,
            feb: values?.feb,
            mar: values?.mar,
            apr: values?.apr,
            may: values?.may,
            jun: values?.jun,
            jul: values?.jul,
            aug: values?.aug,
            sep: values?.sep,
            oct: values?.oct,
            nov: values?.nov,
            dec: values?.dec,
          },
        },
      ];
      const payload = {
        trackingMethod: getOneGoal?.data?.trackingMethod,
        goalName: values?.name,
        duration: getOneGoal?.data?.duration,
        ...(!isNullOrEmpty(getOneGoal?.data?.contributorDetails)
          ? {
              contributors: getOneGoal?.data?.contributorDetails?.map(
                (collaborator: any) => collaborator?._id,
              ),
            }
          : {
              teams: getOneGoal?.data?.teamDetails?.map(
                (collaborator: any) => collaborator?._id,
              ),
            }),
        targets: target,
        notification: editNotificationOptions,
      };

      try {
        await patchGoal({ body: payload, id: tableRowValues })?.unwrap();
        enqueueSnackbar('Goal update successfully', {
          variant: 'success',
        });
        setIsEditDrawer(false);
        setTableRowValues([]);
      } catch (error: any) {
        enqueueSnackbar('An error occured', {
          variant: 'error',
        });
      }
    }
  };

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      title="Edit Revenue Goals"
      okText="Save"
      onClose={onClose}
      isOk={true}
      isCancel={true}
      footer={true}
      submitHandler={handleSubmit(onSubmit)}
      isLoading={updateIsLoading}
    >
      <Box>
        <CommonTabs tabsArray={['Goal', 'Notifications']}>
          <GoalTab
            getOneGoal={getOneGoal}
            isLoading={isLoading}
            dealPipelineOption={dealPipelineOption}
            setValue={setValue}
            submitHandler={handleSubmit(onSubmit)}
            methods={methods}
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
