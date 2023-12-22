import BuyerCompany from './BuyerCompany';
import QuoteInfo from './QuoteInfo';
import QuoteCreatedFor from './QuoteCreatedFor';
import ProductsAndServices from './ProductsAndServices/index';
import Quotation from './Quotation';
// import useViewQuotes from './useViewQuote';

const ViewQuote = () => {
  // const { viewQuotesData } = useViewQuotes();

  return (
    <>
      <BuyerCompany />

      <QuoteInfo />

      <QuoteCreatedFor />

      <ProductsAndServices />

      <Quotation />
    </>
  );
};

export default ViewQuote;
