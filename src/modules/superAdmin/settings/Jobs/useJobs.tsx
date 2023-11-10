import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  jobPostingValidationSchema,
  jobPostingDefaultValues,
} from './JobPosting/jobPosting.data';
import { usePostJobMutation } from '@/services/superAdmin/settings/jobs';

const useJobs = () => {
  const [openAddJobPost, setOpenAddJobPost] = useState(false);
  const [postAddJobPost, { isLoading: loadingPostAddJob }] =
    usePostJobMutation();

  const handleOpenAddJobPost = () => {
    setOpenAddJobPost(true);
  };

  const handleCloseAddJobPost = () => {
    setOpenAddJobPost(false);
  };

  const methodsAddJobPosting = useForm({
    resolver: yupResolver(jobPostingValidationSchema),
    defaultValues: jobPostingDefaultValues,
  });

  const onSubmitAddJobPost = async (values: any) => {
    const dateString = values?.deadline;
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toISOString();
    const payload = {
      ...values,
      deadline: formattedDate,
    };

    try {
      await postAddJobPost({ body: payload })?.unwrap();
      setOpenAddJobPost(false);
      enqueueSnackbar('Plan Modules Details Added Successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  const { handleSubmit: handleMethodAddJobpost } = methodsAddJobPosting;

  const handleSubmitAddJobPost = handleMethodAddJobpost(onSubmitAddJobPost);

  return {
    openAddJobPost,
    handleOpenAddJobPost,
    handleCloseAddJobPost,
    methodsAddJobPosting,
    handleSubmitAddJobPost,
    loadingPostAddJob,
  };
};

export default useJobs;
