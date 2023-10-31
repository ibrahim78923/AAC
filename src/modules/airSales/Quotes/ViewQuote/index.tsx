import BuyerCompany from './BuyerCompany';
import QuoteInfo from './QuoteInfo';
import QuoteCreatedFor from './QuoteCreatedFor';
import ProductsAndServices from './ProductsAndServices/index';
import Quotation from './Quotation';

const ViewQuote = () => {
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
