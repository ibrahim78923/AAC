import { useGetQuoteByIdQuery } from '@/services/airSales/quotes';
import { useSearchParams } from 'next/navigation';

const useViewQuotes = () => {
  const quoteId = useSearchParams().get('id');
  const { data: viewQuotesData } = useGetQuoteByIdQuery({ id: quoteId });

  return {
    viewQuotesData,
  };
};

export default useViewQuotes;
