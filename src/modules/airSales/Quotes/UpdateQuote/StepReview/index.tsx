import BuyerCompany from './BuyerCompany';
import QuoteInfo from './QuoteInfo';
import ProductsAndServices from './ProductsAndServices/index';
import Quotation from './Quotation';
import { Box } from '@mui/material';

const ViewQuote = ({ loyalityCalculation }: any) => {
  return (
    <Box id="quote-invoice">
      <BuyerCompany />
      <QuoteInfo />
      <ProductsAndServices />
      <Quotation loyalityCalculation={loyalityCalculation} />
    </Box>
  );
};

export default ViewQuote;
