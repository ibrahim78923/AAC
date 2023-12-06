import { useRouter } from 'next/router';
import { defaultValues, validationSchema } from './CreateTemplate.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const useCreateTemplate = () => {
  const router = useRouter();

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const { handleSubmit, watch } = methods;

  const TemplateName = watch('TemplateName');

  const onSubmit = async () => {};

  return {
    router,
    methods,
    handleSubmit,
    onSubmit,
    TemplateName,
  };
};

export default useCreateTemplate;
