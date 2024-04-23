import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  workflowFields,
  salesSchema,
  salesValues,
  salesSaveSchema,
} from './UpsertSalesWorkflow.data';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import {
  useGetByIdSalesWorkflowQuery,
  usePostSalesWorkflowMutation,
  usePostSaveDraftWorkflowMutation,
  usePostTestSalesWorkflowMutation,
  useUpdateSalesWorkflowMutation,
} from '@/services/airOperations/workflow-automation/sales-workflow';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT, TIME_FORMAT } from '@/constants';

export const useUpsertSalesWorkflow = () => {
  const [validation, setValidation] = useState('');
  const [isWorkflowDrawer, setIsWorkflowDrawer] = useState(false);
  const [testWorkflowResponse, setTestWorkflowResponse] = useState(null);
  const { back, query } = useRouter();
  const salesMethod = useForm({
    defaultValues: salesValues(null),
    resolver:
      validation === workflowFields?.upsert || workflowFields?.test
        ? yupResolver(salesSchema)
        : yupResolver(salesSaveSchema),
  });
  const { reset, watch, handleSubmit, setValue, control } = salesMethod;
  const workflowId = query?.id;
  const {
    data,
    isLoading: byIdLoading,
    isFetching,
    isError,
    error: workflowByIdError,
  }: any = useGetByIdSalesWorkflowQuery(workflowId, {
    refetchOnMountOrArgChange: true,
    skip: !!!workflowId,
  });
  if (isError) {
    errorSnackbar(workflowByIdError?.data?.message);
  }
  useEffect(() => {
    reset(salesValues(data?.data));
  }, [workflowId, data]);
  const [updateSalesWorkflowTrigger, { isLoading: updateLoading }] =
    useUpdateSalesWorkflowMutation();
  const [postSalesWorkflowTrigger, { isLoading }] =
    usePostSalesWorkflowMutation();
  const [saveDraftTrigger, { isLoading: saveLoading }] =
    usePostSaveDraftWorkflowMutation();
  const [testWorkflowTrigger, { isLoading: testLoading }] =
    usePostTestSalesWorkflowMutation();
  const fieldTypeValues = (action: any) => {
    return action?.fieldValue instanceof Date
      ? workflowFields?.date
      : typeof action?.fieldValue === workflowFields?.string &&
          !isNaN(Date?.parse(action?.fieldValue))
        ? workflowFields?.number
        : typeof action?.fieldValue === workflowFields?.string
          ? workflowFields?.string
          : typeof action?.fieldValue === workflowFields?.object
            ? workflowFields?.objectId
            : '';
  };
  const groupValues = (groupData: any) => {
    return groupData?.groups?.map((group: any) => ({
      ...group,
      conditions: group?.conditions?.map((condition: any) => ({
        fieldName: condition?.fieldName?.value,
        fieldValue: condition?.fieldValue?._id
          ? condition?.fieldValue?._id
          : condition?.fieldValue,
        condition: condition?.condition,
        fieldType: fieldTypeValues(condition),
        collectionName:
          condition?.fieldName?.label === workflowFields?.dealPipeline &&
          (condition?.condition === workflowFields?.isIn ||
            condition?.condition === workflowFields?.isNotIn)
            ? workflowFields?.dealpipelines
            : condition?.fieldName?.label === workflowFields?.dealStage &&
                (condition?.condition === workflowFields?.isIn ||
                  condition?.condition === workflowFields?.isNotIn)
              ? workflowFields?.lifecycleStages
              : (condition?.fieldName?.label === workflowFields?.salesOwner ||
                    condition?.fieldName?.label === workflowFields?.createdBy ||
                    condition?.fieldName?.label ===
                      workflowFields?.updatedBy) &&
                  (condition?.condition === workflowFields?.isIn ||
                    condition?.condition === workflowFields?.isNotIn)
                ? workflowFields?.users
                : '',
      })),
      conditionType: group?.conditionType?.value,
    }));
  };
  const scheduledValues = (scheduleData: any) => {
    const time = dayjs(scheduleData?.time)?.format(TIME_FORMAT?.TH);
    return {
      type: scheduleData?.schedule?.toUpperCase(),
      daily: {
        time: time,
      },
      weekly: {
        days: [scheduleData?.scheduleDay?.toUpperCase()],
        time: time,
      },
      monthly: {
        day: scheduleData?.scheduleDate,
        time: time,
      },
      annually: {
        month: dayjs(scheduleData?.scheduleMonth)
          ?.format(DATE_TIME_FORMAT?.MMMM)
          ?.toLowerCase(),
        time: time,
      },
      custom: {
        startDate: scheduleData?.custom?.startDate,
        endDate: scheduleData?.custom?.endDate,
        time: time,
      },
    };
  };
  const actionValues = (actionData: any) => {
    return actionData?.actions?.map((action: any) => ({
      fieldName: action?.fieldName?.value,
      fieldValue: action?.fieldValue?._id
        ? action?.fieldValue?._id
        : action?.fieldValue,
      fieldType: fieldTypeValues(action),
      collectionName:
        action?.fieldName?.label === workflowFields?.setDealPipeline
          ? workflowFields?.dealpipelines
          : action?.fieldName?.label === workflowFields?.setDealStage
            ? workflowFields?.lifecycleStages
            : action?.fieldName?.label === workflowFields?.setDealOwner ||
                action?.fieldName?.label === workflowFields?.setAssignedTo
              ? workflowFields?.users
              : '',
    }));
  };
  let successMessage = '';
  let errorMessage = '';
  const handleWorkflowApi = async (body: any) => {
    if (workflowId && validation === workflowFields?.upsert) {
      const updateData = { id: workflowId, ...body };
      const response: any = await updateSalesWorkflowTrigger(updateData);
      successMessage =
        response?.data?.message &&
        `${response?.data?.data?.title} Workflow Updated Successfully`;
      errorMessage = response?.error?.data?.message;
    } else if (validation === workflowFields?.upsert) {
      const response: any = await postSalesWorkflowTrigger(body);
      successMessage =
        response?.data?.message &&
        `${response?.data?.data?.title} Workflow Created Successfully`;
      errorMessage = response?.error?.data?.message;
    } else if (validation === workflowFields?.save) {
      const response: any = await saveDraftTrigger(body);
      successMessage =
        response?.data?.message &&
        `${response?.data?.data?.title} Workflow Saved as Draft Successfully`;
      errorMessage = response?.error?.data?.message;
    } else if (validation === workflowFields?.test) {
      const response: any = await testWorkflowTrigger(body);
      setTestWorkflowResponse(response);
      setIsWorkflowDrawer(true);
      errorMessage = response?.error?.data?.message;
    }
  };
  const handleFormSubmit = async (data: any) => {
    const modifiedData: any = {
      title: data?.title,
      description: data?.description,
      module: data?.module,
      type: data?.type,
      runType: data?.runType?.value,
      schedule: scheduledValues(data),
      events: data?.events?.value ? [data?.events?.value] : [],
      groups: groupValues(data) ?? [],
      groupCondition: data?.groupCondition,
      actions: actionValues(data),
    };
    try {
      await handleWorkflowApi(modifiedData);
      if (validation !== workflowFields?.test) {
        successSnackbar(successMessage);
        reset();
        back();
      }
    } catch (error) {
      errorSnackbar(errorMessage);
    }
  };
  const { palette } = useTheme();
  return {
    salesMethod,
    handleFormSubmit,
    handleSubmit,
    palette,
    setValue,
    watch,
    control,
    isLoading,
    saveLoading,
    setValidation,
    byIdLoading,
    isFetching,
    updateLoading,
    testWorkflowResponse,
    testLoading,
    isWorkflowDrawer,
    setIsWorkflowDrawer,
  };
};
