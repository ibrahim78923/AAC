import {
  eventBasedSaveWorkflowSchema,
  eventBasedWorkflowSchema,
  eventBasedWorkflowValues,
} from './UpsertEventBasedWorkflow.data';
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
import { setTestServicesWorkflowBody } from '@/redux/slices/servicesWorkflow';
import { useDispatch } from 'react-redux';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { isoDateString } from '@/lib/date-time';
import { useFormLib } from '@/hooks/useFormLib';

export const useUpsertEventBasedWorkflow = () => {
  const [validation, setValidation] = useState('');
  const [testWorkflow, setTestWorkflow] = useState(false);
  const [isWorkflowDrawer, setIsWorkflowDrawer] = useState<boolean>(false);
  const dispatch = useDispatch();
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
    setLocationAs: 'Set location as',
    locations: 'locations',
    addRequester: 'Add Requester',
    requester: 'users',
    setCategoryAs: 'Set Category as',
    category: 'servicecategories',
    users: 'users',
    usedBy: 'Used By',
    usedByAction: 'Set used by as',
    createdBy: 'Created By',
    assignTo: 'Assign To',
    assetType: 'Asset Type',
    type: 'assettypes',
    notifyBefore: 'notifyBefore',
    plannedEndDate: 'plannedEndDate',
    plannedStartDate: 'plannedStartDate',
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

  const eventMethodProps = {
    defaultValues: eventBasedWorkflowValues(singleWorkflowData),
    validationSchema:
      validation === buttonData?.upsert || validation === buttonData?.test
        ? eventBasedWorkflowSchema
        : eventBasedSaveWorkflowSchema,
  };

  const { reset, watch, handleSubmit, setValue, control, methods } =
    useFormLib(eventMethodProps);

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
      case collectionNameData?.setLocationAs:
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
    conditions: group?.conditions?.map((condition: any) => {
      return {
        condition: condition?.condition,
        fieldName: condition?.fieldName?.value,
        fieldValue:
          condition?.fieldName?.value ===
            collectionNameData?.plannedStartDate ||
          condition?.fieldName?.value === collectionNameData?.plannedEndDate
            ? isoDateString(condition?.fieldValue)
            : condition?.fieldValue?._id
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
      };
    }),
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
      events: data?.events?.value ? [data?.events?.value] : [],
      runType: data?.runType?.value,
      groups: data?.groups?.map((group: any) => mapGroup(group)),
      actions: data?.actions?.map((action: any) => mapAction(action)),
    };
    await handleApiCall(body);
  };
  const moduleType = watch('module');
  useEffect(() => {
    reset(eventBasedWorkflowValues(singleWorkflowData));
  }, [reset, singleWorkflowData]);

  const { palette } = useTheme();

  return {
    methods,
    handleFormSubmit,
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
    isWorkflowDrawer,
    setIsWorkflowDrawer,
    updatedWorkflowProcess,
    movePage,
  };
};
