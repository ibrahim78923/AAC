import { useForm } from 'react-hook-form';
import {
  useLazyGetInvoiceQoutesListQuery,
  useGetInvoiceByIdQuery,
} from '@/services/airSales/invoices';

const useEditDetails = () => {
  const QuoteData = useLazyGetInvoiceQoutesListQuery();
  const methods: any = useForm();

  const { watch } = methods;
  const watchField = watch('Quote');

  const QuoteID = watchField?._id;

  const { data: invoiceDataById, isLoading: loadingInvoiceData } =
    useGetInvoiceByIdQuery(QuoteID);

  return {
    methods,
    QuoteData,
    invoiceDataById,
    loadingInvoiceData,
  };
};

export default useEditDetails;
