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
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  editGoalDefaultValues,
  editGoalValidationSchema,
} from './GoalTab/GoalTab.data';
import { enqueueSnackbar } from 'notistack';
import { useLazyGetDynamicFieldsQuery } from '@/services/dynamic-fields';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
} from '@/utils/dynamic-forms';
import { filteredEmptyValues } from '@/utils/api';
import { indexNumbers } from '@/constants';

const EditGoalsDrwaer = (props: any) => {
  const {
    isOpenDrawer,
    onClose,
    tableRowValues,
    setIsEditDrawer,
    setTableRowValues,
    user,
  } = props;
  const [editNotificationOptions, setEditNotificationOptions] = useState();

  const { data: getOneGoal, isLoading } = useGetSingleForecastGoalsQuery(
    { id: tableRowValues, user: user === 'User' ? false : true },
    { skip: isNullOrEmpty(tableRowValues) },
  );

  const notificationsData =
    getOneGoal?.data?.goals[indexNumbers?.ZERO]?.notification;
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

  const [form, setForm] = useState<any>([]);

  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();

  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_SALES,
      moduleType: DYNAMIC_FIELDS?.MT_GOAL,
    };
    const getDynamicFieldsParameters = { params };

    try {
      const res: any = await getDynamicFieldsTrigger(
        getDynamicFieldsParameters,
      )?.unwrap();
      setForm(res);
    } catch (error: any) {
      setForm([]);
    }
  };

  useEffect(() => {
    getDynamicFormData();
  }, []);

  const methods: any = useForm({
    resolver: yupResolver(editGoalValidationSchema?.(form)),
    defaultValues: editGoalDefaultValues?.(
      getOneGoal?.data?.goals[indexNumbers?.ZERO],
      form,
    ),
  });

  const { handleSubmit, setValue } = methods;
  const [patchGoal, { isLoading: updateIsLoading }] = usePatchGoalMutation();

  const onSubmit = async (values: any) => {
    const filteredEmptyData = filteredEmptyValues(values);

    const customFields: any = {};
    const body: any = {};

    const customFieldKeys = new Set(
      form?.map((field: any) => field?.componentProps?.label),
    );

    Object?.entries(filteredEmptyData)?.forEach(([key, value]) => {
      if (customFieldKeys?.has(key)) {
        if (
          typeof value === DYNAMIC_FORM_FIELDS_TYPES?.OBJECT &&
          !Array?.isArray(value) &&
          value !== null
        ) {
          customFields[key] = { ...customFields[key], ...value };
        } else {
          customFields[key] = value;
        }
      } else {
        body[key] = value;
      }
    });

    if (Object?.keys(customFields)?.length > 0) {
      body.customFields = customFields;
    }

    if (isNullOrEmpty(editNotificationOptions)) {
      enqueueSnackbar('Please select a notification', {
        variant: 'error',
      });
    } else {
      const payload = {
        target: values?.target,
        notification: editNotificationOptions,
        customFields: body?.customFields,
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
            setValue={setValue}
            submitHandler={handleSubmit(onSubmit)}
            methods={methods}
            form={form}
            getDynamicFieldsStatus={getDynamicFieldsStatus}
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
