import { useRouter } from 'next/router';
import { defaultValues, validationSchema } from './CreatePost.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const useCreatePost = () => {
  const router = useRouter();

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {};

  return {
    router,
    methods,
    handleSubmit,
    onSubmit,
  };
};

export default useCreatePost;
