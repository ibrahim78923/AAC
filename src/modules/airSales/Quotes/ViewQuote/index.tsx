import BuyerCompany from './BuyerCompany';
import QuoteInfo from './QuoteInfo';
import QuoteCreatedFor from './QuoteCreatedFor';
import ProductsAndServices from './ProductsAndServices/index';

const ViewQuote = () => {
  return (
    <>
      <BuyerCompany />

      <QuoteInfo />

      <QuoteCreatedFor />

      <ProductsAndServices />
    </>
  );
};

export default ViewQuote;
