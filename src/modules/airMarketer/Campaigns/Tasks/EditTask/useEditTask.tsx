import { useTheme } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { validationSchema } from './EditTask.data';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { usePostCampaignTaskMutation } from '@/services/airMarketer/campaigns';

const useEditTask = ({ initialValueProps }: any) => {
  const theme = useTheme();

  const [postCampaignTask] = usePostCampaignTaskMutation();

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValueProps,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: any) => {
    await postCampaignTask({ body: values })?.unwrap();

    enqueueSnackbar('Task Updated Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };

  return {
    handleSubmit,
    onSubmit,
    methods,
    theme,
  };
};
export default useEditTask;
