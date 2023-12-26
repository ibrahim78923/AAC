import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createComapnySchema,
  defaultCreateCompanyValues,
} from './CreateCompany.data';

const useCreateCompany = () => {
  const methods: any = useForm<any>({
    resolver: yupResolver(createComapnySchema),
    defaultValues: defaultCreateCompanyValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    reset();
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    reset,
  };
};

export default useCreateCompany;
