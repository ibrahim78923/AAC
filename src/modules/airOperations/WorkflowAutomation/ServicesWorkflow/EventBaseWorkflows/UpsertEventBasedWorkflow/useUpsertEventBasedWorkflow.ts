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
  useSaveWorkflowMutation,
  useUpdateWorkflowMutation,
} from '@/services/airOperations/workflow-automation/services-workflow';
import { useRouter } from 'next/router';
import { AIR_OPERATIONS } from '@/constants';
import { useEffect } from 'react';

export const useUpsertEventBasedWorkflow = () => {
  const typeData = {
    string: 'string',
    number: 'number',
    object: 'object',
    date: 'Date',
    objectId: 'objectId',
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
    resolver: yupResolver(eventBasedWorkflowSchema),
  });

  const { reset, watch, register, handleSubmit, setValue, control, getValues } =
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

  const mapGroup = (group: any, typeData: any) => ({
    ...group,
    conditions: group?.conditions?.map((condition: any) => ({
      ...condition,
      fieldValue: condition?.fieldValue?._id,
      fieldType: mapField(condition, typeData),
    })),
    conditionType: group?.conditionType?.value,
  });

  const mapAction = (action: any, typeData: any) => ({
    ...action,
    fieldType: mapField(action, typeData),
  });

  const [postWorkflowTrigger] = usePostServicesWorkflowMutation();
  const [updateWorkflowTrigger] = useUpdateWorkflowMutation();
  const [saveWorkflowTrigger] = useSaveWorkflowMutation();

  const handleFormSubmit = async (data: any) => {
    if (pageActionType === EDIT_WORKFLOW) {
      const { options, ...rest } = data;
      const body = {
        ...rest,
        id: singleId,
        events: [data?.events?.value],
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
        events: [data?.events?.value],
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
    handleSaveAsDraft,
  };
};
