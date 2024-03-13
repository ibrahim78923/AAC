import {
  useGetCompaniesOwnersQuery,
  useGetContactsQuery,
} from '@/services/airSales/quotes';
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
  const { data: contacts } = useGetContactsQuery({});

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
    // const numberEmpl=parseInt(values?.noOfEmloyee?.toString())
    // console.log(typeof values.noOfEmloyee, 'noOfEmloyee');
    const formData = new FormData();
    formData?.append('domain', values?.domain);
    formData?.append('profilePicture', values?.profilePicture);
    formData?.append('name', values?.name);
    formData?.append('ownerId', values?.ownerId);
    formData?.append('industry', values?.industry);
    formData?.append('type', values?.type);
    formData?.append('noOfEmloyee', 12 as any);
    formData?.append('totalRevenue', values?.totalRevenue);
    formData?.append('city', values?.city);
    formData?.append('postalCode', values?.postalCode);
    formData?.append('address', values?.address);
    formData?.append('description', values?.description);
    formData?.append('linkedInUrl', values?.linkedInUrl);
    // formData?.append('noOfEmloyee', '12');

    // console.log('formData',formData);

    try {
      postCompanies({ body: formData })?.then((res) => {
        const associationBody = {
          dealId: dataGetQuoteById?.data?.dealId,
          companyId: res,
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
    contacts,
  };
};

export default useFormAddContact;
