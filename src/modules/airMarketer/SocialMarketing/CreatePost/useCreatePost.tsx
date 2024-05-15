import { useRouter } from 'next/router';
import { defaultValues, validationSchema } from './CreatePost.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTheme } from '@emotion/react';
import { useGetCampaignsViewQuery } from '@/services/airMarketer/socialMarketer';

const useCreatePost = () => {
  const router = useRouter();
  const theme: any = useTheme();
  const { data: campaignsViewData }: any = useGetCampaignsViewQuery({
    page: 1,
    limit: 10,
  });
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
    theme,
    campaignsViewData,
  };
};

export default useCreatePost;
