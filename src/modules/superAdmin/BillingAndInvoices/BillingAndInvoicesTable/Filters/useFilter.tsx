import { validationSchema } from './Filters.data';

import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';

const useFilter = (onClose: any, initialValueProps: any) => {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),

    defaultValues: initialValueProps,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    onClose(false);
  };

  return {
    handleSubmit,
    onSubmit,
    methods,
  };
};

export default useFilter;
