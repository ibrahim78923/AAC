import { useGetContactsQuery } from '@/services/airSales/quotes';
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
  const [postCompanies, { isLoading: loadingCompnayPost }] =
    usePostCompaniesMutation();
  const methods: any = useForm<any>({
    resolver: yupResolver(createComapnySchema),
    defaultValues: defaultCreateCompanyValues,
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = async (values: any) => {
    const formData = new FormData();
    Object.entries(values)?.forEach(([key, value]: any) => {
      if (value !== undefined && value !== null && value !== '') {
        formData.append(key, value);
      }
    });
    try {
      postCompanies({ body: formData })?.then((res: any) => {
        const associationBody = {
          dealId: dataGetQuoteById?.data?.dealId,
          companyId: res?.data?.data?._id,
        };
        createAssociationQuote({ body: associationBody })?.unwrap();
        enqueueSnackbar('Company Added Successfully', {
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
    onSubmit,
    handleSubmit,
    methods,
    contacts,
    loadingCompnayPost,
  };
};

export default useFormAddContact;
