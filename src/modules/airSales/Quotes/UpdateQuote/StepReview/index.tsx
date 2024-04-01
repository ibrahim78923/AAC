import BuyerCompany from './BuyerCompany';
import QuoteInfo from './QuoteInfo';
import QuoteCreatedFor from './QuoteCreatedFor';
import ProductsAndServices from './ProductsAndServices/index';
import Quotation from './Quotation';
import { Box } from '@mui/material';

const ViewQuote = () => {
  return (
    <Box id="pdf-content">
      <BuyerCompany />
      <QuoteInfo />
      <QuoteCreatedFor />
      <ProductsAndServices />
      <Quotation />
    </Box>
  );
};

export default ViewQuote;
