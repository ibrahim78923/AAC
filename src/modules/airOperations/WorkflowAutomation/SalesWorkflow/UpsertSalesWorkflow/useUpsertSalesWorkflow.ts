import { useEffect, useState } from 'react';
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
  useUpdateSalesWorkflowMutation,
} from '@/services/airOperations/workflow-automation/sales-workflow';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useAppDispatch } from '@/redux/store';
import { setTestWorkflowBody } from '@/redux/slices/salesWorkflow';
import { isoDateString, otherDateFormat } from '@/lib/date-time';
import { DATE_TIME_FORMAT, TIME_FORMAT } from '@/constants';
import { useFormLib } from '@/hooks/useFormLib';

export const useUpsertSalesWorkflow = () => {
  const [validation, setValidation] = useState('');
  const [isWorkflowDrawer, setIsWorkflowDrawer] = useState(false);
  const { back, query } = useRouter();
  const dispatch = useAppDispatch();
  const salesWorkflowMethodsProps = {
    defaultValues: salesValues(null),
    validationSchema:
      validation === workflowFields?.upsert ||
      validation === workflowFields?.test
        ? salesSchema
        : salesSaveSchema,
  };
  const { reset, watch, handleSubmit, setValue, control, methods } = useFormLib(
    salesWorkflowMethodsProps,
  );
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
  const [updateSalesWorkflowTrigger, { isLoading: updateLoading }]: any =
    useUpdateSalesWorkflowMutation();
  const [postSalesWorkflowTrigger, { isLoading }] =
    usePostSalesWorkflowMutation();
  const [saveDraftTrigger, { isLoading: saveLoading }] =
    usePostSaveDraftWorkflowMutation();
  const fieldTypeValues = (action: any) => {
    return action?.fieldValue instanceof Date
      ? workflowFields?.date
      : typeof action?.fieldValue === workflowFields?.string &&
          !isNaN(Date?.parse(action?.fieldValue))
        ? workflowFields?.number
        : typeof action?.fieldValue === workflowFields?.string
          ? workflowFields?.string
          : typeof action?.fieldValue === workflowFields?.object &&
              action?.fieldValue !== null
            ? workflowFields?.objectId
            : workflowFields?.string;
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
              : (condition?.fieldName?.label === workflowFields?.dealOwner ||
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
    const time = otherDateFormat(scheduleData?.time, TIME_FORMAT?.TH);
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
        month: otherDateFormat(
          scheduleData?.scheduleMonth,
          DATE_TIME_FORMAT?.MMMM,
        )?.toLowerCase(),
        time: time,
      },
      custom: {
        startDate: isoDateString(scheduleData?.custom?.startDate),
        endDate: isoDateString(scheduleData?.custom?.endDate),
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
  let response: any;
  const handleWorkflowApi = async (body: any) => {
    if (workflowId && validation === workflowFields?.upsert) {
      const updateData = { id: workflowId, ...body };
      response = await updateSalesWorkflowTrigger(updateData);
      successMessage =
        response?.data?.message &&
        `${response?.data?.data?.title} Workflow Updated Successfully`;
    } else if (validation === workflowFields?.upsert) {
      response = await postSalesWorkflowTrigger(body);
      successMessage =
        response?.data?.message &&
        `${response?.data?.data?.title} Workflow Created Successfully`;
    } else if (validation === workflowFields?.save) {
      response = await saveDraftTrigger(body);
      successMessage =
        response?.data?.message &&
        `${response?.data?.data?.title} Workflow Saved as Draft Successfully`;
    } else if (validation === workflowFields?.test) {
      dispatch(setTestWorkflowBody(body));
      setIsWorkflowDrawer(true);
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
    await handleWorkflowApi(modifiedData);
    if (response?.data?.message && validation !== workflowFields?.test) {
      successSnackbar(successMessage);
      reset();
      back();
    } else if (response?.error) {
      errorSnackbar(response?.error?.data?.message);
    }
  };
  const { palette } = useTheme();
  return {
    methods,
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
    isWorkflowDrawer,
    setIsWorkflowDrawer,
  };
};
