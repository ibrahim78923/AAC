import BuyerCompany from './BuyerCompany';
import QuoteInfo from './QuoteInfo';
import ProductsAndServices from './ProductsAndServices/index';
import Quotation from './Quotation';

const ViewQuote = () => {
  return (
    <>
      <BuyerCompany />

      <QuoteInfo />

      <ProductsAndServices />

      <Quotation />
    </>
  );
};

export default ViewQuote;
