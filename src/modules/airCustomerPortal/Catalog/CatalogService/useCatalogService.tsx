import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  dataBackUpDefaultValues,
  dataBackUpValidationSchema,
} from './CatalogService.data';

const useCatalogService = () => {
  const method = useForm({
    resolver: yupResolver(dataBackUpValidationSchema),
    defaultValues: dataBackUpDefaultValues,
  });

  const { handleSubmit } = method;
  const onSubmit = handleSubmit(() => {});

  return {
    method,
    handleSubmit,
    onSubmit,
  };
};
export default useCatalogService;
