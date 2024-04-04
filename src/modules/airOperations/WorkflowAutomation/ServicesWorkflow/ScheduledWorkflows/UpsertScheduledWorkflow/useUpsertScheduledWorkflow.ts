import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  scheduledWorkflowSchema,
  scheduledWorkflowValues,
} from './UpsertScheduledWorkflow.data';
import { useTheme } from '@mui/material';
import {
  useGetByIdWorkflowQuery,
  usePostServicesWorkflowMutation,
  useSaveWorkflowMutation,
  useUpdateWorkflowMutation,
} from '@/services/airOperations/workflow-automation/services-workflow';
import { useRouter } from 'next/router';
import { AIR_OPERATIONS, DATE_TIME_FORMAT, TIME_FORMAT } from '@/constants';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export const useUpsertScheduledWorkflow = () => {
  const [validation, setValidation] = useState(false);
  const typeData = {
    string: 'string',
    number: 'number',
    object: 'object',
    date: 'Date',
    objectId: 'objectId',
  };

  const collectionNameData = {
    agent: 'agent',
    assignToAgent: 'Assign to Agent',
    selectDepartment: 'selectDepartment',
    department: 'department',
    setDepartmentAs: 'Set Department as',
    location: 'location',
    addRequester: 'addRequester',
    requester: 'requester',
    setCategoryAs: 'Set Category as',
    category: 'category',
  };

  const router = useRouter();
  const pageActionType = router?.query?.action;
  const singleId = router?.query?.id;
  const movePage = () => {
    router.push({
      pathname: AIR_OPERATIONS?.SERVICES_WORKFLOW,
    });
  };

  const EDIT_WORKFLOW = 'edit';
  const { data, isLoading, isFetching }: any = useGetByIdWorkflowQuery(
    singleId,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!singleId,
    },
  );
  const singleWorkflowData = data?.data;

  const scheduledWorkflowMethod = useForm({
    defaultValues: scheduledWorkflowValues(singleWorkflowData),
    resolver: validation ? yupResolver(scheduledWorkflowSchema) : undefined,
  });
  const { reset, watch, register, handleSubmit, setValue, control } =
    scheduledWorkflowMethod;

  const mapField = (field: any, typeData: any) => {
    const fieldValue = field?.fieldValue;
    if (fieldValue instanceof Date) {
      return typeData?.date;
    } else if (
      typeof fieldValue === typeData?.string &&
      !isNaN(Date.parse(fieldValue))
    ) {
      return typeData?.number;
    } else if (typeof fieldValue === typeData?.string) {
      return typeData?.string;
    } else if (typeof fieldValue === typeData?.object) {
      return typeData?.objectId;
    } else {
      return null;
    }
  };

  function getCollectionName(fieldName: any): any {
    const fieldLabel = fieldName?.label || fieldName;
    switch (fieldLabel) {
      case collectionNameData?.agent:
        return collectionNameData?.agent;
      case collectionNameData?.assignToAgent:
        return collectionNameData?.agent;
      case collectionNameData?.selectDepartment:
        return collectionNameData?.department;
      case collectionNameData?.setDepartmentAs:
        return collectionNameData?.department;
      case collectionNameData?.location:
        return collectionNameData?.location;
      case collectionNameData?.addRequester:
        return collectionNameData?.requester;
      case collectionNameData?.setCategoryAs:
        return collectionNameData?.category;
      default:
        return '';
    }
  }

  const mapGroup = (group: any, typeData: any) => ({
    ...group,
    conditions: group?.conditions?.map((condition: any) => ({
      ...condition,
      fieldValue:
        condition?.fieldName &&
        [
          collectionNameData?.agent,
          collectionNameData?.selectDepartment,
          collectionNameData?.setDepartmentAs,
          collectionNameData?.location,
          collectionNameData?.addRequester,
          collectionNameData?.setCategoryAs,
        ].includes(condition?.fieldName)
          ? condition?.fieldValue?._id
          : condition?.fieldValue,
      fieldType: mapField(condition, typeData),
      collectionName: getCollectionName(condition?.fieldName),
    })),
    conditionType: group?.conditionType?.value,
  });

  const mapAction = (action: any, typeData: any) => ({
    ...action,
    fieldName: action?.fieldName?.value,
    fieldValue:
      action?.fieldName &&
      [
        collectionNameData?.agent,
        collectionNameData?.selectDepartment,
        collectionNameData?.setDepartmentAs,
        collectionNameData?.location,
        collectionNameData?.addRequester,
        collectionNameData?.setCategoryAs,
      ].includes(action?.fieldName)
        ? action?.fieldValue?._id
        : action?.fieldValue,
    fieldType: mapField(action, typeData),
    collectionName: getCollectionName(action?.fieldName),
  });

  const [postWorkflowTrigger] = usePostServicesWorkflowMutation();
  const [updateWorkflowTrigger] = useUpdateWorkflowMutation();
  const [saveWorkflowTrigger] = useSaveWorkflowMutation();

  const handleApiCall = async (body: any) => {
    try {
      let successMessage = '';
      if (pageActionType === EDIT_WORKFLOW) {
        await updateWorkflowTrigger({ ...body, id: singleId }).unwrap();
        successMessage = 'Workflow Update Successfully';
      } else if (!validation) {
        await saveWorkflowTrigger(body).unwrap();
        successMessage = 'Workflow Save Successfully';
      } else {
        await postWorkflowTrigger(body).unwrap();
        successMessage = 'Workflow Create Successfully';
      }

      successSnackbar(successMessage);
      reset();
      movePage();
    } catch (error) {
      errorSnackbar();
    }
  };

  const handleFormSubmit = async (data: any) => {
    const timeRange = dayjs(data?.time)?.format(TIME_FORMAT?.API);
    const {
      options,
      time,
      schedule,
      scheduleDay,
      scheduleMonth,
      scheduleDate,
      custom,
      ...rest
    } = data;

    const body = {
      ...rest,
      schedule: {
        type: data?.schedule?.toUpperCase(),
        daily: { time: timeRange },
        weekly: { days: [data?.scheduleDay?.toUpperCase()], time: timeRange },
        monthly: {
          day: Number(dayjs(data?.scheduleDate)?.format(DATE_TIME_FORMAT?.D)),
          time: timeRange,
        },
        annually: {
          month: dayjs(data?.scheduleMonth)
            ?.format(DATE_TIME_FORMAT?.DDMMYYYY)
            ?.toLowerCase(),
          time: timeRange,
        },
        custom: {
          startDate: data?.custom?.startDate,
          endDate: data?.custom?.endDate,
          time: timeRange,
        },
      },
      runType: data?.runType?.value,
      groups: data?.groups?.map((group: any) => mapGroup(group, typeData)),
      actions: data?.actions?.map((action: any) => mapAction(action, typeData)),
    };
    await handleApiCall(body);
    return {
      options,
      schedule,
      scheduleDay,
      scheduleMonth,
      time,
      scheduleDate,
      custom,
    };
  };

  useEffect(() => {
    reset(scheduledWorkflowValues(singleWorkflowData));
  }, [reset, singleWorkflowData]);

  const { palette } = useTheme();
  const moduleType = watch('module');

  return {
    scheduledWorkflowMethod,
    handleFormSubmit,
    register,
    handleSubmit,
    palette,
    moduleType,
    setValue,
    watch,
    control,
    isFetching,
    isLoading,
    setValidation,
  };
};
