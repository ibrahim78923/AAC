import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  jobPostingValidationSchema,
  jobPostingDefaultValues,
} from './EditJobPost.data';

const useEditJobPost = () => {
  const methodsEditJobPost = useForm({
    resolver: yupResolver(jobPostingValidationSchema),
    defaultValues: jobPostingDefaultValues,
  });

  // const { handleSubmit: handleMethodAddJob, reset: resetAddJobForm } = methodsAddJobPost;

  // const onSubmitAddJob = async (values: any) => {
  //   try {
  //     await postAddJobPost({ body: values })?.unwrap();
  //     handleCloseEditJobPost();
  //     enqueueSnackbar('Job added successfully', {
  //       variant: 'success',
  //     });
  //   } catch (error: any) {
  //     enqueueSnackbar('An error occured', {
  //       variant: 'error',
  //     });
  //   }
  // };
  // const handleSubmitAddJobPost = handleMethodAddJob(onSubmitAddJob);

  return {
    methodsEditJobPost,
  };
};

export default useEditJobPost;
