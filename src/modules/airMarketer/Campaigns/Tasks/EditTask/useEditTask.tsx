import { useTheme } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { validationSchema } from './EditTask.data';
import { DRAWER_TYPES, NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  useGetCampaignsTaskByIdQuery,
  usePostCampaignTaskMutation,
  useUpdateCampaignTasksMutation,
} from '@/services/airMarketer/campaigns';
import { useEffect, useState } from 'react';
import { indexNumbers } from '@/constants';
import dayjs from 'dayjs';
import { useLazyGetDynamicFieldsQuery } from '@/services/dynamic-fields';
import { DYNAMIC_FIELDS } from '@/utils/dynamic-forms';

const useEditTask = ({
  initialValueProps,
  setIsOpenEditTaskDrawer,
  selectedRec,
  isType,
}: any) => {
  const theme = useTheme();
  const CAMPAIGN_ID = 'campaignId';
  const [form, setForm] = useState<any>([]);

  const [postCampaignTask, { isLoading: postTaskLoading }] =
    usePostCampaignTaskMutation();

  const [updateCampaignTasks, { isLoading: updateTaskLoading }] =
    useUpdateCampaignTasksMutation();

  const { data: getCampaignsTaskById, isLoading: loadingCampaignTasks } =
    useGetCampaignsTaskByIdQuery(selectedRec, {
      skip:
        !Array?.isArray(selectedRec) ||
        selectedRec?.length === indexNumbers?.ZERO,
    });

  // dynamic fields starts here
  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();

  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_MARKETING,
      moduleType: DYNAMIC_FIELDS?.MT_TASK,
    };
    const getDynamicFieldsParameters = { params };

    try {
      const res: any = await getDynamicFieldsTrigger(
        getDynamicFieldsParameters,
      )?.unwrap();
      setForm(res);
    } catch (error: any) {
      setForm([]);
    }
  };

  useEffect(() => {
    getDynamicFormData();
  }, []);

  // dynamic fields ends here

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValueProps,
  });

  const { handleSubmit, reset, setValue } = methods;

  useEffect(() => {
    const data = getCampaignsTaskById?.data[0];
    const fieldsToSet: any = {
      taskName: data?.taskName,
      taskType: data?.taskType,
      campaignId: data?.campaignDetails[0],
      assignedTo: data?.assignedTo[0],
      dueDate: data?.dueDate ? new Date(data?.dueDate) : null,
      time: data?.time ? dayjs(data?.time) : null,
      note: data?.note,
    };
    for (const key in fieldsToSet) {
      setValue(key, fieldsToSet[key]);
    }
  }, [getCampaignsTaskById]);

  const onSubmit = async (values: any) => {
    values.assignedTo = values.assignedTo?._id;
    values.campaignId = values.campaignId?._id;
    try {
      if (isType === DRAWER_TYPES?.EDIT) {
        delete values?.campaignId;
        await updateCampaignTasks({
          id: selectedRec,
          body: values,
        })?.unwrap();
        enqueueSnackbar('Task Updated Successfully', {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        });
      } else {
        await postCampaignTask({ body: values })?.unwrap();
        enqueueSnackbar('Task Added Successfully', {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        });
      }
    } catch (error: any) {
      const errMsg = error?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
    reset();
    setIsOpenEditTaskDrawer(false);
  };

  return {
    getDynamicFieldsStatus,
    loadingCampaignTasks,
    updateTaskLoading,
    postTaskLoading,
    handleSubmit,
    CAMPAIGN_ID,
    onSubmit,
    methods,
    theme,
    form,
  };
};
export default useEditTask;
