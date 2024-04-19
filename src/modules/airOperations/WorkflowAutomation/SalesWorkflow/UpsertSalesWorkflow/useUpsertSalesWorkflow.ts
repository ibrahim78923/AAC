import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  workflowFields,
  salesSchema,
  salesValues,
} from './UpsertSalesWorkflow.data';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import {
  usePostSalesWorkflowMutation,
  usePostSaveDraftWorkflowMutation,
} from '@/services/airOperations/workflow-automation/sales-workflow';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@/constants';

export const useUpsertSalesWorkflow = () => {
  const [validation, setValidation] = useState(false);
  const { back } = useRouter();
  const salesMethod = useForm({
    defaultValues: salesValues,
    resolver: validation ? yupResolver(salesSchema) : undefined,
  });
  const { reset, watch, handleSubmit, setValue, control } = salesMethod;
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
            workflowFields?.objectId;
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
              : condition?.fieldName?.label ===
                    (workflowFields?.salesOwner ||
                      workflowFields?.createdBy ||
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
    const time = dayjs(scheduleData?.time)?.format('HH:mm');
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
        day: Number(
          dayjs(scheduleData?.scheduleDate)?.format(DATE_TIME_FORMAT?.D),
        ),
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
  const handleFormSubmit = async (data: any) => {
    const modifiedData: any = {
      title: data?.title,
      module: data?.module,
      type: data?.type,
      runType: data?.runType?.value,
      schedule: scheduledValues(data),
      events: data?.events?.value ? [data?.events?.value] : [],
      groups: groupValues(data) ?? [],
      groupCondition: data?.groupCondition,
      actions: actionValues(data),
    };
    const response: any = validation
      ? await postSalesWorkflowTrigger(modifiedData)
      : await saveDraftTrigger(modifiedData);
    try {
      response;
      const submitMessage = validation
        ? `${response?.data?.data?.title} Workflow Created Successfully`
        : `${response?.data?.data?.title} Workflow Saved as Draft Successfully`;
      successSnackbar(response?.data?.message && submitMessage);
      reset();
      back();
    } catch (e) {
      errorSnackbar(response?.error?.data?.message);
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
  };
};
