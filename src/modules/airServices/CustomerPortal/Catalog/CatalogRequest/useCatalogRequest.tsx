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

  const onSubmitRequest = () => {};
  const { handleSubmit } = methodRequest;
  return {
    methodRequest,
    handleSubmit,
    onSubmitRequest,
  };
};
export default useCatalogRequest;
