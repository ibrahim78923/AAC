import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  rulesSaveWorkflowSchema,
  rulesWorkflowSchema,
  rulesWorkflowValues,
} from './UpsertRulesWorkflow.data';
import { useTheme } from '@mui/material';
import {
  useGetByIdWorkflowQuery,
  usePostServicesWorkflowMutation,
  useSaveWorkflowMutation,
  useUpdateWorkflowMutation,
} from '@/services/airOperations/workflow-automation/services-workflow';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { optionsConstants } from './WorkflowConditions/SubWorkflowConditions/SubWorkflowConditions.data';
import { useDispatch } from 'react-redux';
import { setTestServicesWorkflowBody } from '@/redux/slices/servicesWorkflow';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { isoDateString } from '@/lib/date-time';

export const useRulesWorkflow = () => {
  const [validation, setValidation] = useState('');
  const [testWorkflow, setTestWorkflow] = useState(false);
  const [isWorkflowDrawer, setIsWorkflowDrawer] = useState(false);
  const dispatch = useDispatch();
  const typeData = {
    string: 'string',
    number: 'number',
    object: 'object',
    date: 'date',
    objectId: 'objectId',
  };

  const buttonData = {
    save: 'save',
    test: 'test',
    upsert: 'upsert',
  };

  const collectionNameData = {
    agent: 'Agent',
    assignToAgent: 'Assign to Agent',
    selectDepartment: 'Select Department',
    department: 'departments',
    setDepartmentAs: 'Set Department as',
    location: 'location',
    addRequester: 'Add Requester',
    requester: 'users',
    setCategoryAs: 'Set Category as',
    category: 'servicecategories',
    users: 'users',
    plannedEndDate: 'plannedEndDate',
    plannedStartDate: 'plannedStartDate',
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

  const rulesMethod = useForm({
    defaultValues: rulesWorkflowValues(singleWorkflowData),
    resolver:
      validation === buttonData?.upsert || validation === buttonData?.test
        ? yupResolver(rulesWorkflowSchema)
        : yupResolver(rulesSaveWorkflowSchema),
  });

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
        return collectionNameData?.location;
      case collectionNameData?.addRequester:
        return collectionNameData?.requester;
      case collectionNameData?.setCategoryAs:
        return collectionNameData?.category;
      default:
        return '';
    }
  }

  const mapGroup = (group: any) => ({
    ...group,
    conditions: group?.conditions?.map((condition: any) => ({
      condition: condition?.condition,
      fieldName: condition?.fieldName?.value,
      fieldValue:
        condition?.fieldName?.value === collectionNameData?.plannedStartDate ||
        condition?.fieldName?.value === collectionNameData?.plannedEndDate
          ? isoDateString(condition?.fieldValue)
          : condition?.fieldValue?._id
            ? condition?.fieldValue?._id
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
    fieldValue:
      action?.fieldName?.value === collectionNameData?.plannedStartDate ||
      action?.fieldName?.value === collectionNameData?.plannedEndDate
        ? isoDateString(action?.fieldValue)
        : action?.fieldValue?._id
          ? action?.fieldValue?._id
          : action?.fieldValue,
    fieldType: mapField(action),
    collectionName: getCollectionName(action?.fieldName),
  });

  const { reset, watch, register, handleSubmit, setValue, control } =
    rulesMethod;

  const [postWorkflowTrigger, postWorkflowProgress] =
    usePostServicesWorkflowMutation();
  const [updateWorkflowTrigger, updatedWorkflowProcess] =
    useUpdateWorkflowMutation();
  const [saveWorkflowTrigger, saveWorkflowProgress] = useSaveWorkflowMutation();

  const handleTestWorkflow = async () => {
    setTestWorkflow(true);
  };

  const handleApiCall = async (body: any) => {
    try {
      let successMessage = '';
      if (testWorkflow && validation === buttonData?.test) {
        dispatch(setTestServicesWorkflowBody(body));
        setIsWorkflowDrawer(true);
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
      if (successMessage) {
        successSnackbar(successMessage);
      }
      if (validation !== buttonData?.test) {
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
      groups: data?.groups?.map((group: any) => mapGroup(group)),
      actions: data?.actions?.map((action: any) => mapAction(action)),
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
    handleTestWorkflow,
    movePage,
  };
};
