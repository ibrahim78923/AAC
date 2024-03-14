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
import useUpdateQuote from '../useUpdateQuote';

const useFormAddContact = () => {
  const { usePostCompaniesMutation } = companiesAPI;
  const { dataGetQuoteById, createAssociationQuote } = useUpdateQuote();
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
    const formData = new FormData();
    formData?.append('domain', values?.domain);
    formData?.append('profilePicture', values?.profilePicture);
    formData?.append('profilePicture', values?.name);
    formData?.append('profilePicture', values?.ownerId);
    formData?.append('profilePicture', values?.indusry);
    formData?.append('profilePicture', values?.type);
    formData?.append('profilePicture', values?.noOfEmloyee);
    formData?.append('profilePicture', values?.totalRevenue);
    formData?.append('profilePicture', values?.city);
    formData?.append('profilePicture', values?.postalCode);
    formData?.append('profilePicture', values?.address);
    formData?.append('profilePicture', values?.description);
    formData?.append('profilePicture', values?.linkedInUrl);
    try {
      postCompanies({ body: formData }).then((res) => {
        const associationBody = {
          dealId: dataGetQuoteById?.data?.dealId,
          companyId: res?._id,
        };
        createAssociationQuote({ body: associationBody })?.unwrap();
        enqueueSnackbar('Ticket Updated Successfully', {
          variant: 'success',
        });
      });
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
