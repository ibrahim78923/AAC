import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  scheduledSaveWorkflowSchema,
  scheduledWorkflowSchema,
  scheduledWorkflowValues,
} from './UpsertScheduledWorkflow.data';
import { useTheme } from '@mui/material';
import {
  useGetByIdWorkflowQuery,
  usePostServicesWorkflowMutation,
  usePostTestWorkflowMutation,
  useSaveWorkflowMutation,
  useUpdateWorkflowMutation,
} from '@/services/airOperations/workflow-automation/services-workflow';
import { useRouter } from 'next/router';
import { DATE_TIME_FORMAT, TIME_FORMAT } from '@/constants';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { optionsConstants } from './WorkflowConditions/SubWorkflowConditions/SubWorkflowConditions.data';

export const useUpsertScheduledWorkflow = () => {
  const [validation, setValidation] = useState('');
  const [testWorkflow, setTestWorkflow] = useState(false);
  const [testWorkflowResponse, setTestWorkflowResponse] = useState<any>(null);
  const [isWorkflowDrawer, setIsWorkflowDrawer] = useState(false);

  const typeData = {
    string: 'string',
    number: 'number',
    object: 'object',
    date: 'date',
    objectId: 'objectId',
  };

  const collectionNameData = {
    agent: 'Agent',
    assignToAgent: 'Assign to Agent',
    selectDepartment: 'Select Department',
    department: 'departments',
    setDepartmentAs: 'Set Department as',
    location: 'Location',
    selectLocation: 'Set location as',
    locations: 'locations',
    addRequester: 'Add Requester',
    requester: 'users',
    setCategoryAs: 'Set Category as',
    category: 'servicecategories',
    users: 'users',
    usedBy: 'Used By',
    usedByAction: 'Set used by as',
    createdBy: 'Created By',
    assetType: 'Asset Type',
    assignTo: 'Assign To',
    type: 'assettypes',
    notifyBefore: 'notifyBefore',
  };

  const buttonData = {
    save: 'save',
    test: 'test',
    upsert: 'upsert',
  };

  const router = useRouter();
  const pageActionType = router?.query?.action;
  const singleId = router?.query?.id;
  const movePage = () => {
    router?.back();
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
    resolver:
      validation === buttonData?.upsert || validation === buttonData?.test
        ? yupResolver(scheduledWorkflowSchema)
        : yupResolver(scheduledSaveWorkflowSchema),
  });
  const { reset, watch, register, handleSubmit, setValue, control } =
    scheduledWorkflowMethod;

  const mapField = (field: any) => {
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
    } else if (fieldValue?._id) {
      return typeData?.objectId;
    } else {
      return typeData?.string;
    }
  };

  function getCollectionName(fieldName: any): any {
    const fieldLabel = fieldName?.label || fieldName;
    switch (fieldLabel) {
      case collectionNameData?.agent:
        return collectionNameData?.users;
      case collectionNameData?.assignToAgent:
        return collectionNameData?.users;
      case collectionNameData?.selectDepartment:
        return collectionNameData?.department;
      case collectionNameData?.setDepartmentAs:
        return collectionNameData?.department;
      case collectionNameData?.location:
        return collectionNameData?.locations;
      case collectionNameData?.selectLocation:
        return collectionNameData?.locations;
      case collectionNameData?.addRequester:
        return collectionNameData?.requester;
      case collectionNameData?.setCategoryAs:
        return collectionNameData?.category;
      case collectionNameData?.assetType:
        return collectionNameData?.type;
      case collectionNameData?.usedBy:
        return collectionNameData?.users;
      case collectionNameData?.usedByAction:
        return collectionNameData?.users;
      case collectionNameData?.createdBy:
        return collectionNameData?.users;
      case collectionNameData?.assignTo:
        return collectionNameData?.users;
      default:
        return '';
    }
  }

  const mapGroup = (group: any) => ({
    ...group,
    conditions: group?.conditions?.map((condition: any) => ({
      condition: condition?.condition,
      fieldName: condition?.fieldName?.value,
      fieldValue: condition?.fieldValue?._id
        ? condition?.fieldValue?._id
        : condition?.fieldName?.value === collectionNameData?.notifyBefore
          ? condition?.fieldValue?.value
          : condition?.fieldValue,
      fieldType: mapField(condition),
      collectionName:
        condition?.condition === optionsConstants?.isEmpty ||
        condition?.condition === optionsConstants?.isNotEmpty
          ? ''
          : getCollectionName(condition?.fieldName),
    })),
    conditionType: group?.conditionType?.value,
  });

  const mapAction = (action: any) => ({
    ...action,
    fieldName: action?.fieldName?.value,
    fieldValue: action?.fieldValue?._id
      ? action?.fieldValue?._id
      : action?.fieldValue,
    fieldType: mapField(action),
    collectionName: getCollectionName(action?.fieldName),
  });

  const [postWorkflowTrigger, postWorkflowProgress] =
    usePostServicesWorkflowMutation();
  const [updateWorkflowTrigger, updatedWorkflowProcess] =
    useUpdateWorkflowMutation();
  const [saveWorkflowTrigger, saveWorkflowProgress] = useSaveWorkflowMutation();
  const [postTestTrigger, testWorkflowProgress] = usePostTestWorkflowMutation();

  const handleTestWorkflow = async () => {
    setTestWorkflow(true);
  };

  const handleApiCall = async (body: any) => {
    try {
      let successMessage = '';
      if (testWorkflow && validation === buttonData?.test) {
        const response = await postTestTrigger(body).unwrap();
        setIsWorkflowDrawer(true);
        setTestWorkflowResponse(response);
        successMessage = 'Test Workflow Executed Successfully';
      } else {
        if (
          pageActionType === EDIT_WORKFLOW &&
          validation === buttonData?.upsert
        ) {
          await updateWorkflowTrigger({ ...body, id: singleId }).unwrap();
          successMessage = 'Workflow Update Successfully';
        } else if (validation === buttonData?.save) {
          await saveWorkflowTrigger(body).unwrap();
          successMessage = 'Workflow Save Successfully';
        } else if (validation === buttonData?.upsert) {
          await postWorkflowTrigger(body).unwrap();
          successMessage = 'Workflow Create Successfully';
        }
      }

      successSnackbar(successMessage);
      if (validation !== buttonData?.test) {
        reset();
        movePage();
      }
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleFormSubmit = async (data: any) => {
    const timeRange = dayjs(data?.time)?.format(TIME_FORMAT?.TH);
    const {
      time,
      schedule,
      scheduleDay,
      scheduleMonth,
      scheduleDate,
      scheduleDateRange,
      custom,
      ...rest
    } = data;

    const body = {
      ...rest,
      schedule: {
        type: data?.schedule?.toUpperCase(),
        daily: {
          time: timeRange,
        },
        weekly: {
          days: [data?.scheduleDay?.toUpperCase()],
          time: timeRange,
        },
        monthly: {
          day: Number(dayjs(data?.scheduleDate)?.format(DATE_TIME_FORMAT?.D)),
          time: timeRange,
        },
        annually: {
          month: dayjs(data?.scheduleMonth)
            ?.format(DATE_TIME_FORMAT?.MMMM)
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
      groups: data?.groups?.map((group: any) => mapGroup(group)),
      actions: data?.actions?.map((action: any) => mapAction(action)),
    };
    await handleApiCall(body);
    return {
      schedule,
      scheduleDay,
      scheduleMonth,
      time,
      scheduleDate,
      scheduleDateRange,
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
    saveWorkflowProgress,
    postWorkflowProgress,
    isWorkflowDrawer,
    setIsWorkflowDrawer,
    handleTestWorkflow,
    testWorkflowProgress,
    updatedWorkflowProcess,
    testWorkflowResponse,
    movePage,
  };
};
