import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  addResponseDefaultValues,
  addResponseValidationSchema,
} from './AddResponseForm/AddResponseForm.data';

export const useAddResponseDrawer = () => {
  const methodsAddResponseForm = useForm<any>({
    resolver: yupResolver(addResponseValidationSchema),
    defaultValues: addResponseDefaultValues,
  });
  const submitAddResponse = async () => {};
  return {
    submitAddResponse,
    methodsAddResponseForm,
  };
};
