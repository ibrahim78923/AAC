import { useRef, useState } from 'react';
import { useGetQuoteByIdQuery } from '@/services/airSales/quotes';

const useDownloadQuote = (rowId: any) => {
  const downloadRef = useRef(null);
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const { data: viewQuotesData, isFetching } = useGetQuoteByIdQuery(
    { id: rowId },
    { skip: !rowId },
  );
  const { data: QuotesProduct } = useGetQuoteByIdQuery(
    { id: rowId },
    { skip: !rowId },
  );

  return {
    downloadRef,
    viewQuotesData,
    QuotesProduct,
    isFetching,
    hasDownloaded,
    setHasDownloaded,
  };
};

export default useDownloadQuote;
