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

const useFormAddContact = (onClose: () => void) => {
  const { usePostCompaniesMutation } = companiesAPI;
  const { data: contacts } = useGetContactsQuery({});

  const { dataGetQuoteById, createAssociationQuote } = useUpdateQuote();

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
    try {
      postCompanies({ body: formData })?.then((res: any) => {
        const associationBody = {
          dealId: dataGetQuoteById?.data?.dealId,
          companyId: res?.data?.data?._id,
        };
        createAssociationQuote({ body: associationBody })?.unwrap();
        enqueueSnackbar('Company Updated Successfully', {
          variant: 'success',
        });
      });
      reset();
    } catch (error) {
      enqueueSnackbar(`Something went wrong`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
    onClose();
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
