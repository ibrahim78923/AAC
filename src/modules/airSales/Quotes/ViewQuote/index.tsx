import BuyerCompany from './BuyerCompany';
import QuoteInfo from './QuoteInfo';
import ProductsAndServices from './ProductsAndServices/index';
import Quotation from './Quotation';
import useViewQuotes from './useViewQuote';
import { Box } from '@mui/material';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

const ViewQuote = () => {
  const { viewQuotesData, QuotesProduct, isFetching } = useViewQuotes();

  return (
    <>
      {isFetching ? (
        <>
          <SkeletonTable />
          <SkeletonTable />
        </>
      ) : (
        <Box>
          <BuyerCompany viewQuotesData={viewQuotesData} />
          <QuoteInfo viewQuotesData={viewQuotesData} />
          <ProductsAndServices QuotesProduct={QuotesProduct} />
          <Quotation viewQuotesData={viewQuotesData} />
        </Box>
      )}
    </>
  );
};

export default ViewQuote;
