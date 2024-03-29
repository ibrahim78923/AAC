import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  rulesWorkflowSchema,
  rulesWorkflowValues,
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

export const useUpsertSupervisorRules = () => {
  const router = useRouter();
  const pageActionType = router?.query?.action;
  const singleId = router?.query?.id;

  const movePage = () => {
    router.push({
      pathname: AIR_OPERATIONS?.SERVICES_WORKFLOW,
    });
  };
  const EDIT_WORKFLOW = 'edit';
  const { data, isLoading, isFetching }: any =
    useGetByIdWorkflowQuery(singleId);
  const singleWorkflowData = data?.data;

  const rulesMethod = useForm({
    defaultValues: rulesWorkflowValues(singleWorkflowData),
    resolver: yupResolver(rulesWorkflowSchema),
  });

  const { reset, watch, register, handleSubmit, setValue, control, getValues } =
    rulesMethod;
  const [saveWorkflowTrigger] = useSaveWorkflowMutation();
  const [postWorkflowTrigger, postWorkflowProgress] =
    usePostServicesWorkflowMutation();
  const [updateWorkflowTrigger] = useUpdateWorkflowMutation();

  const handleFormSubmit = async (data: any) => {
    if (pageActionType === EDIT_WORKFLOW) {
      const { options, ...rest } = data;
      const body = {
        ...rest,
        id: singleId,
        events: [data?.events?.value],
        runType: data?.runType?.value,
        groups:
          data?.groups?.map((group: any) => ({
            ...group,
            conditionType: group?.conditionType?.value,
          })) ?? [],
      };
      try {
        await updateWorkflowTrigger(body)?.unwrap();
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
        groups:
          data?.groups?.map((group: any) => ({
            ...group,
            conditionType: group?.conditionType?.value,
          })) ?? [],
      };
      try {
        await postWorkflowTrigger(body)?.unwrap();
        successSnackbar('Workflow Enabled Successfully');
        reset();
        movePage();
        return options;
      } catch (error) {
        errorSnackbar();
      }
    }
  };
  const handleSaveAsDraft = async () => {
    const title = getValues('title');
    const values = getValues();
    if (!title) {
      errorSnackbar('Title is required');
      return;
    } else {
      try {
        await saveWorkflowTrigger(values)?.unwrap();
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
