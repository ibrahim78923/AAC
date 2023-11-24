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

  return {
    methodsEditJobPost,
  };
};

export default useEditJobPost;
