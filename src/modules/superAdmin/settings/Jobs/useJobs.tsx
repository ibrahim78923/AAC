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

  const { handleSubmit: handleMethodAddJob, reset } = methodsAddJobPost;

  const handleOpenAddJobPost = () => {
    setOpenAddJobPost(true);
  };

  const handleCloseAddJobPost = () => {
    setOpenAddJobPost(false);
    reset();
  };

  const onSubmitAddJob = async (values: any) => {
    try {
      await postAddJobPost({ body: values })?.unwrap();
      handleCloseAddJobPost();
      enqueueSnackbar('Job Posted Successfully', {
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
