import QuoteInfo from './QuoteInfo';
import ProductsAndServices from './ProductsAndServices/index';
import { Box } from '@mui/material';
import DetailCard from './DetailCard';

const ViewQuote = ({ loyalityCalculation }: any) => {
  return (
    <Box id="quote-invoice">
      <DetailCard />
      <QuoteInfo />
      <ProductsAndServices loyalityCalculation={loyalityCalculation} />
    </Box>
  );
};

export default ViewQuote;
