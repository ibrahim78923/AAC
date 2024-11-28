import { useForm } from 'react-hook-form';
import { useLazyGetInvoiceQoutesListQuery } from '@/services/airSales/invoices';
import { useEffect, useState } from 'react';

const useCreateInvoice = () => {
  const [quoteId, setQuoteId] = useState(null);
  const QuoteData = useLazyGetInvoiceQoutesListQuery();
  const methods: any = useForm({
    defaultValues: {
      Quote: null,
    },
  });
  const { watch } = methods;
  const watchField = watch('Quote');
  useEffect(() => {
    if (watchField) {
      setQuoteId(watchField?._id);
    } else {
      setQuoteId(null);
    }
  }, [watchField]);

  return {
    methods,
    QuoteData,
    quoteId,
  };
};

export default useCreateInvoice;
