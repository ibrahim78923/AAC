import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  jobPostingValidationSchema,
  jobPostingDefaultValues,
} from './Jobs.data';
import { usePostJobMutation } from '@/services/superAdmin/settings/jobs';

const useJobs = () => {
  const [openAddJobPost, setOpenAddJobPost] = useState(false);
  const [postAddJobPost, { isLoading: loadingPostAddJob }] =
    usePostJobMutation();
  const methodsAddJobPost = useForm({
    resolver: yupResolver(jobPostingValidationSchema),
    defaultValues: jobPostingDefaultValues,
  });

  const handleOpenAddJobPost = () => {
    setOpenAddJobPost(true);
  };

  const handleCloseAddJobPost = () => {
    setOpenAddJobPost(false);
  };

  const { handleSubmit: handleMethodAddJob } = methodsAddJobPost;

  const onSubmitAddJob = async (values: any) => {
    try {
      await postAddJobPost({ body: values })?.unwrap();
      handleCloseAddJobPost();
      enqueueSnackbar('Job added successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };
  const handleSubmitAddJobPost = handleMethodAddJob(onSubmitAddJob);

  return {
    openAddJobPost,
    handleOpenAddJobPost,
    handleCloseAddJobPost,
    methodsAddJobPost,
    handleSubmitAddJobPost,
    loadingPostAddJob,
  };
};

export default useJobs;
