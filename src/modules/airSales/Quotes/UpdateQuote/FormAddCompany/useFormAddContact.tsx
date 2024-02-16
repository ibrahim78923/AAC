import { useGetCompaniesOwnersQuery } from '@/services/airSales/quotes';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import {
  createComapnySchema,
  defaultCreateCompanyValues,
} from './FormAddCompany.data';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { companiesAPI } from '@/services/commonFeatures/companies';

const useFormAddContact = () => {
  const { usePostCompaniesMutation } = companiesAPI;
  // const { user } = getSession();

  // const params = {
  //   page: 1,
  //   limit: 10,
  //   contactOwnerId: user?._id,
  // };

  // const { data: getCompanyContacts } = useGetCompanyContactsQuery(params);

  const { data: companiesOwner } = useGetCompaniesOwnersQuery({});

  const [postCompanies] = usePostCompaniesMutation();
  const methods: any = useForm<any>({
    resolver: yupResolver(createComapnySchema),
    defaultValues: defaultCreateCompanyValues,
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = async (values: any) => {
    try {
      postCompanies({ body: values });
      enqueueSnackbar(`Company Created Successfully`, {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      // setIsOpenDrawer(false);
      reset();
    } catch (error) {
      enqueueSnackbar(`Something went wrong`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }

    // try {
    //   const response = await companiesPost({ body: values })?.unwrap();

    //   enqueueSnackbar('Ticket Updated Successfully', {
    //     variant: 'success',
    //   });
    // } catch (error: any) {
    //   const errMsg = error?.data?.message;
    //   enqueueSnackbar(errMsg ?? 'Error occurred', { variant: 'error' });
    // }
  };
  return {
    // getCompanyContacts,
    onSubmit,
    handleSubmit,
    methods,
    companiesOwner,
  };
};

export default useFormAddContact;
