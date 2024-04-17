import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  rulesWorkflowSchema,
  rulesWorkflowValues,
} from './UpsertRulesWorkflow.data';
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

export const useRulesWorkflow = () => {
  const [validation, setValidation] = useState(false);
  const [testWorkflow, setTestWorkflow] = useState(false);
  const [testWorkflowResponse, setTestWorkflowResponse] = useState<any>(null);
  const [isWorkflowDrawer, setIsWorkflowDrawer] = useState(false);
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

  const rulesMethod = useForm({
    defaultValues: rulesWorkflowValues(singleWorkflowData),
    resolver: validation ? yupResolver(rulesWorkflowSchema) : undefined,
  });

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
      condition: condition?.condition,
      fieldName: condition?.fieldName,
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

  const { reset, watch, register, handleSubmit, setValue, control } =
    rulesMethod;

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
      runType: data?.runType?.value,
      groups: data?.groups?.map((group: any) => mapGroup(group, typeData)),
      actions: data?.actions?.map((action: any) => mapAction(action, typeData)),
    };
    await handleApiCall(body);
  };

  useEffect(() => {
    reset(rulesWorkflowValues(singleWorkflowData));
  }, [reset, singleWorkflowData]);

  const { palette } = useTheme();
  const moduleType = watch('module');
  return {
    rulesMethod,
    handleFormSubmit,
    register,
    handleSubmit,
    palette,
    moduleType,
    setValue,
    watch,
    control,
    postWorkflowProgress,
    isLoading,
    isFetching,
    setValidation,
    saveWorkflowProgress,
    isWorkflowDrawer,
    setIsWorkflowDrawer,
    updatedWorkflowProcess,
    testWorkflowProgress,
    handleTestWorkflow,
    testWorkflowResponse,
  };
};
