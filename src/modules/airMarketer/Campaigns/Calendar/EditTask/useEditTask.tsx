import { useTheme } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { validationSchema } from './EditTask.data';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { usePostCampaignTaskMutation } from '@/services/airMarketer/campaigns';

const useEditTask = ({
  initialValueProps,
  setCreateTask,
  clickedDate,
}: any) => {
  const theme = useTheme();

  const [postCampaignTask, { isLoading: postTaskLoading }] =
    usePostCampaignTaskMutation();

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValueProps,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (values: any) => {
    values.assignedTo = values.assignedTo?._id;
    values.campaignId = values.campaignId?._id;
    values.createdAt = clickedDate;
    try {
      await postCampaignTask({ body: values })?.unwrap();
      enqueueSnackbar('Task Updated Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
    reset();
    setCreateTask(false);
  };

  return {
    postTaskLoading,
    handleSubmit,
    onSubmit,
    methods,
    theme,
  };
};
export default useEditTask;
