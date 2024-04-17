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
import { DATE_TIME_FORMAT, TIME_FORMAT } from '@/constants';

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
  const submitMessage = validation
    ? 'Workflow Enabled Successfully'
    : 'Workflow Saved as Draft Successfully';
  const handleFormSubmit = async (data: any) => {
    const time = dayjs(data?.time)?.format(TIME_FORMAT?.API);
    const modifiedData: any = {
      title: data?.title,
      module: data?.module,
      type: data?.type,
      runType: data?.runType?.value,
      schedule: {
        type: data?.schedule?.toUpperCase(),
        daily: {
          time: time,
        },
        weekly: {
          days: [data?.scheduleDay?.toUpperCase()],
          time: time,
        },
        monthly: {
          day: Number(dayjs(data?.scheduleDate)?.format(DATE_TIME_FORMAT?.D)),
          time: time,
        },
        annually: {
          month: dayjs(data?.scheduleMonth)
            ?.format(DATE_TIME_FORMAT?.MMMM)
            ?.toLowerCase(),
          time: time,
        },
        custom: {
          startDate: data?.custom?.startDate,
          endDate: data?.custom?.endDate,
          time: time,
        },
      },
      events: [data?.events?.value],
      groups:
        data?.groups?.map((group: any) => ({
          ...group,
          conditions: group?.conditions?.map((condition: any) => ({
            fieldName: condition?.fieldName,
            fieldValue: condition?.fieldValue?._id
              ? condition?.fieldValue?._id
              : condition?.fieldValue,
            fieldType: fieldTypeValues(condition),
            collectionName:
              (condition?.fieldName === workflowFields?.name ||
                condition?.fieldName === workflowFields?.lostReason ||
                condition?.fieldName === workflowFields?.updateQuoteName ||
                condition?.fieldName === workflowFields?.title) &&
              (condition?.condition === workflowFields?.isEmpty ||
                condition?.condition === workflowFields?.isNotEmpty)
                ? workflowFields?.deal
                : (condition?.fieldName === workflowFields?.salesOwner ||
                      condition?.fieldName === workflowFields?.createdBy ||
                      condition?.fieldName === workflowFields?.updatedBy) &&
                    (condition?.condition === workflowFields?.isEmpty ||
                      condition?.condition === workflowFields?.isNotEmpty)
                  ? workflowFields?.contact
                  : null,
          })),
          conditionType: group?.conditionType?.value,
        })) ?? [],
      groupCondition: data?.groupCondition,
      actions: data?.actions?.map((action: any) => ({
        fieldName: action?.fieldName,
        fieldValue: action?.fieldValue?._id
          ? action?.fieldValue?._id
          : action?.fieldValue,
        fieldType: fieldTypeValues(action),
        collectionName:
          action?.fieldName === workflowFields?.setDealPipeline ||
          action?.fieldName === workflowFields?.selectDeal
            ? workflowFields?.deal
            : action?.fieldName === workflowFields?.setDealOwner
              ? workflowFields?.contact
              : action?.fieldName === workflowFields?.addLineItem
                ? workflowFields?.product
                : action?.fieldName === workflowFields?.setAssignedTo
                  ? workflowFields?.user
                  : null,
      })),
    };
    const response: any = validation
      ? await postSalesWorkflowTrigger(modifiedData)
      : await saveDraftTrigger(modifiedData);
    try {
      response;
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
