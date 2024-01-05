import { useGetInvoiceQoutesListQuery } from '@/services/airSales/invoices';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { quoteDefaultValues, quoteValidation } from './ChooseQuotes.data';

const useChooseQuotes = () => {
  const { data } = useGetInvoiceQoutesListQuery([]);

  const methodRequest = useForm({
    resolver: yupResolver(quoteValidation),
    defaultValues: quoteDefaultValues,
  });

  return {
    dataQuotes: data?.data?.quotes,
    methodRequest,
  };
};

export default useChooseQuotes;
