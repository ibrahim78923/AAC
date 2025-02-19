import QuoteInfo from './QuoteInfo';
import ProductsAndServices from './ProductsAndServices/index';
import Quotation from './Quotation';
import { Box } from '@mui/material';
import DetailCard from './DetailCard';

const ViewQuote = ({ loyalityCalculation }: any) => {
  return (
    <Box id="quote-invoice">
      <DetailCard />
      <QuoteInfo />
      <ProductsAndServices />
      <Quotation loyalityCalculation={loyalityCalculation} />
    </Box>
  );
};

export default ViewQuote;
