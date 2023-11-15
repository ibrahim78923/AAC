import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  validationSchema,
  defaultValues,
} from './DetailsViewPropertiesSection.data';

export const useDetailsViewPropertiesSection = () => {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),

    defaultValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = async () => {};
  return {
    methods,
    handleSubmit,
    onSubmit,
  };
};
