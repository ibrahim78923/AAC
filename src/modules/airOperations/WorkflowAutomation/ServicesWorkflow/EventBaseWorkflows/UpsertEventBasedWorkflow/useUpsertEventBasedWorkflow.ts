import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  eventBasedWorkflowSchema,
  eventBasedWorkflowValues,
} from './UpsertEventBasedWorkflow.data';
import { useTheme } from '@mui/material';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import {
  useGetByIdWorkflowQuery,
  usePostServicesWorkflowMutation,
  usePostTestWorkflowMutation,
  useSaveWorkflowMutation,
  useUpdateWorkflowMutation,
} from '@/services/airOperations/workflow-automation/services-workflow';
import { useRouter } from 'next/router';
import { AIR_OPERATIONS } from '@/constants';
import { useEffect, useState } from 'react';

export const useUpsertEventBasedWorkflow = () => {
  const [validation, setValidation] = useState(false);
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
    agent: 'agent',
    assignToAgent: 'Assign to Agent',
    selectDepartment: 'Select Department',
    department: 'departments',
    setDepartmentAs: 'Set Department as',
    location: 'location',
    addRequester: 'Add Requester',
    requester: 'users',
    setCategoryAs: 'Set Category as',
    category: 'category',
    users: 'users',
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

  const eventMethod = useForm({
    defaultValues: eventBasedWorkflowValues(singleWorkflowData),
    resolver: validation ? yupResolver(eventBasedWorkflowSchema) : undefined,
  });

  const { reset, watch, register, handleSubmit, setValue, control } =
    eventMethod;

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
        return collectionNameData?.users;
      case collectionNameData?.assignToAgent:
        return collectionNameData?.users;
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
      condition: condition?.condition,
      fieldName: condition?.fieldName?.value,
      fieldValue:
        condition?.fieldName &&
        [
          collectionNameData?.agent,
          collectionNameData?.selectDepartment,
          collectionNameData?.setDepartmentAs,
          collectionNameData?.location,
          collectionNameData?.addRequester,
          collectionNameData?.setCategoryAs,
        ].includes(condition?.fieldName?.label)
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
      if (testWorkflow && validation) {
        const response = await postTestTrigger(body).unwrap();
        setIsWorkflowDrawer(true);
        setTestWorkflowResponse(response);
        successMessage = 'Test Workflow Executed Successfully';
      } else {
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
      }

      successSnackbar(successMessage);
      if (!testWorkflow) {
        reset();
        movePage();
      }
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleFormSubmit = async (data: any) => {
    const body = {
      ...data,
      events: data?.events?.value ? [data?.events?.value] : [],
      runType: data?.runType?.value,
      groups: data?.groups?.map((group: any) => mapGroup(group, typeData)),
      actions: data?.actions?.map((action: any) => mapAction(action, typeData)),
    };
    await handleApiCall(body);
  };

  useEffect(() => {
    reset(eventBasedWorkflowValues(singleWorkflowData));
  }, [reset, singleWorkflowData]);
  const { palette } = useTheme();
  const moduleType = watch('module');

  return {
    eventMethod,
    handleFormSubmit,
    register,
    handleSubmit,
    palette,
    moduleType,
    setValue,
    watch,
    control,
    isLoading,
    isFetching,
    setValidation,
    validation,
    postWorkflowProgress,
    saveWorkflowProgress,
    handleTestWorkflow,
    testWorkflowResponse,
    isWorkflowDrawer,
    setIsWorkflowDrawer,
    updatedWorkflowProcess,
    testWorkflowProgress,
  };
};
