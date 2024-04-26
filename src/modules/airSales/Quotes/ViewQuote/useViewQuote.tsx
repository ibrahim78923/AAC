import {
  useGetQuoteByIdQuery,
  useGetTaxCalculationsQuery,
} from '@/services/airSales/quotes';
import { useSearchParams } from 'next/navigation';

const useViewQuotes = () => {
  const param = {
    applyOn: 'quotes',
  };
  const quoteId = useSearchParams().get('id');

  const { data: viewQuotesData } = useGetQuoteByIdQuery({ id: quoteId });
  const { data: QuotesProduct } = useGetQuoteByIdQuery({ id: quoteId });
  const { data: taxCalculation } = useGetTaxCalculationsQuery(param);

  return {
    viewQuotesData,
    QuotesProduct,
    taxCalculation,
  };
};

export default useViewQuotes;
