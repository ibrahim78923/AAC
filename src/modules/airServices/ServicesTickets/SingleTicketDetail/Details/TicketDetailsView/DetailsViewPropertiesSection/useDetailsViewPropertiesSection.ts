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
  const {
    handleSubmit,
    // formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    // console.log(data);
  };
  return {
    methods,
    handleSubmit,
    onSubmit,
  };
};
