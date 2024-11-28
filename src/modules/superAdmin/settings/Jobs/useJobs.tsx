import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  jobPostingValidationSchema,
  jobPostingDefaultValues,
} from './Jobs.data';
import { usePostJobMutation } from '@/services/superAdmin/settings/jobs';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

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
      successSnackbar('Job Posted Successfully');
    } catch (error: any) {
      errorSnackbar('An error occured');
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
