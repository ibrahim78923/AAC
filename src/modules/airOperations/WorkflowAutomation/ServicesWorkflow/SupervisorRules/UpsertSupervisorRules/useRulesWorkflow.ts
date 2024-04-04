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
  useSaveWorkflowMutation,
  useUpdateWorkflowMutation,
} from '@/services/airOperations/workflow-automation/services-workflow';
import { useRouter } from 'next/router';
import { AIR_OPERATIONS } from '@/constants';
import { useEffect } from 'react';

export const useRulesWorkflow = () => {
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
    resolver: yupResolver(rulesWorkflowSchema),
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

  const { reset, watch, register, handleSubmit, setValue, control, getValues } =
    rulesMethod;

  const [postWorkflowTrigger, postWorkflowProgress] =
    usePostServicesWorkflowMutation();
  const [updateWorkflowTrigger] = useUpdateWorkflowMutation();
  const [saveWorkflowTrigger] = useSaveWorkflowMutation();

  const handleFormSubmit = async (data: any) => {
    if (pageActionType === EDIT_WORKFLOW) {
      const { options, ...rest } = data;
      const body = {
        ...rest,
        id: singleId,
        runType: data?.runType?.value,
        groups: data?.groups?.map((group: any) => mapGroup(group, typeData)),
        actions: data?.actions?.map((action: any) =>
          mapAction(action, typeData),
        ),
      };
      try {
        await updateWorkflowTrigger(body).unwrap();
        successSnackbar('Workflow Update Successfully');
        reset();
        movePage();
        return options;
      } catch (error) {
        errorSnackbar();
      }
    } else {
      const { options, ...rest } = data;
      const body = {
        ...rest,
        runType: data?.runType?.value,
        groups: data?.groups?.map((group: any) => mapGroup(group, typeData)),
        actions: data?.actions?.map((action: any) =>
          mapAction(action, typeData),
        ),
      };
      try {
        await postWorkflowTrigger(body).unwrap();
        successSnackbar('Workflow Enabled Successfully');
        reset();
        movePage();
        return options;
      } catch (error) {
        errorSnackbar();
      }
    }
  };

  const handleSaveAsDraft = async (data: any) => {
    const title = getValues('title');
    if (!title) {
      errorSnackbar('Title is required');
      return;
    } else {
      try {
        await saveWorkflowTrigger(data)?.unwrap();
        successSnackbar('Workflow Updated Successfully');
        reset();
        movePage();
      } catch (error) {
        errorSnackbar();
      }
    }
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
    handleSaveAsDraft,
  };
};
