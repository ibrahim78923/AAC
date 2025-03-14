import { useGetQuoteByIdQuery } from '@/services/airSales/quotes';
import { useSearchParams } from 'next/navigation';

const useViewQuotes = () => {
  const quoteId = useSearchParams().get('id');
  const { data: viewQuotesData, isFetching } = useGetQuoteByIdQuery({
    id: quoteId,
  });
  const { data: QuotesProduct } = useGetQuoteByIdQuery({ id: quoteId });

  return {
    isFetching,
    QuotesProduct,
    viewQuotesData,
  };
};

export default useViewQuotes;
