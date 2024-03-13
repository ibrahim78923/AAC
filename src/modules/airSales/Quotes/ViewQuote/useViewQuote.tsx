import { useGetQuoteByIdQuery } from '@/services/airSales/quotes';
import { useSearchParams } from 'next/navigation';

const useViewQuotes = () => {
  const quoteId = useSearchParams().get('data');

  const { data: viewQuotesData } = useGetQuoteByIdQuery({ id: quoteId });
  const { data: QuotesProduct } = useGetQuoteByIdQuery({ id: quoteId });

  return {
    viewQuotesData,
    QuotesProduct,
  };
};

export default useViewQuotes;
