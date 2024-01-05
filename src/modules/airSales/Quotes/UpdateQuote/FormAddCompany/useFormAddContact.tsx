import { usePostCompaniesMutation } from '@/services/airSales/quotes';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import {
  createComapnySchema,
  defaultCreateCompanyValues,
} from './FormAddCompany.data';

const useFormAddContact = () => {
  const [companiesPost] = usePostCompaniesMutation();

  const methods: any = useForm<any>({
    resolver: yupResolver(createComapnySchema),
    defaultValues: defaultCreateCompanyValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = async () => {
    try {
      // const response = await companiesPost({ body: values })?.unwrap();

      enqueueSnackbar('Ticket Updated Successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', { variant: 'error' });
    }
  };
  return {
    companiesPost,
    onSubmit,
    handleSubmit,
    methods,
  };
};

export default useFormAddContact;
