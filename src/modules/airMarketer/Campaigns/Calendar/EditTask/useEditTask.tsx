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
import { useEffect } from 'react';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

const useEditTask = ({
  initialValueProps,
  onClose,
  isType,
  createTask,
}: any) => {
  const theme = useTheme();
  const [postCampaignTask, { isLoading: postTaskLoading }] =
    usePostCampaignTaskMutation();

  const [updateCampaignTasks, { isLoading: updateTaskLoading }] =
    useUpdateCampaignTasksMutation();

  const { data: getCampaignsTaskById } = useGetCampaignsTaskByIdQuery(
    createTask?.id,
  );

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
      time: data?.time ? new Date(data?.time) : null,
      note: data?.note,
    };
    for (const key in fieldsToSet) {
      setValue(key, fieldsToSet[key]);
    }
  }, [getCampaignsTaskById]);

  const onSubmit = async (values: any) => {
    values.assignedTo = values.assignedTo?._id;
    values.campaignId = values.campaignId?._id;
    values.startDate = dayjs(createTask?.startDate)?.format(DATE_FORMAT?.API);
    try {
      if (isType === DRAWER_TYPES?.EDIT) {
        delete values?.campaignId;
        await updateCampaignTasks({
          id: createTask?.id,
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
      enqueueSnackbar(error?.data?.message, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
    reset();
    onClose();
  };

  return {
    updateTaskLoading,
    postTaskLoading,
    handleSubmit,
    onSubmit,
    methods,
    theme,
  };
};
export default useEditTask;
