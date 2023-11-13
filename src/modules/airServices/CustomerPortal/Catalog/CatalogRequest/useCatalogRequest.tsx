import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  placeRequestDefaultValues,
  placeRequestValidationSchema,
} from './CatalogRequest.data';
const useCatalogRequest = () => {
  const methodRequest = useForm({
    resolver: yupResolver(placeRequestValidationSchema),
    defaultValues: placeRequestDefaultValues,
  });
  const { handleSubmit, getValues, control } = methodRequest;
  const onSubmitRequest = handleSubmit(() => {});

  return {
    methodRequest,
    handleSubmit,
    onSubmitRequest,
    getValues,
    control,
  };
};
export default useCatalogRequest;
