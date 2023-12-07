import { useRouter } from 'next/router';
import { defaultValues, validationSchema } from './CreateTemplate.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material';

const useCreateTemplate = () => {
  const router = useRouter();
  const navigate = useRouter();
  const { type } = navigate.query;
  const theme = useTheme();
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const { handleSubmit, watch } = methods;

  const TemplateName = watch('TemplateName');
  const Category = watch('Category');
  const Details = watch('Details');

  const onSubmit = async () => {};

  return {
    router,
    methods,
    handleSubmit,
    onSubmit,
    TemplateName,
    Category,
    Details,
    type,
    theme,
  };
};

export default useCreateTemplate;
