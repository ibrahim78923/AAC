import { Box } from '@mui/material';
import { styles } from './Quotation.style';
import useViewQuotes from '../useViewQuote';

const Quotation = () => {
  const { viewQuotesData } = useViewQuotes();
  const sum = viewQuotesData?.data?.products?.reduce(
    (accumulator: any, currentValue: any) =>
      accumulator + currentValue?.unitPrice * currentValue?.quantity,
    0,
  );

  const unitDiscount = viewQuotesData?.data?.products?.reduce(
    (accumulator: any, currentValue: any) =>
      accumulator + currentValue?.unitDiscount * currentValue?.quantity,
    0,
  );
  return (
    <Box sx={styles?.box}>
      <Box sx={styles?.bRow}>
        <Box sx={styles?.bHead}>Sub Total</Box>
        <Box sx={styles?.bCell}>£{sum}</Box>
      </Box>

      {/* <Box sx={styles?.bRow}>
        <Box sx={styles?.bHead}>V.A.T</Box>
        <Box sx={styles?.bCell}>20%</Box>
      </Box> */}

      <Box sx={styles?.bRow}>
        <Box sx={styles?.bHead}>Unit Discount</Box>
        <Box sx={styles?.bCell}>£ {unitDiscount} GBP</Box>
      </Box>

      <Box sx={styles?.bRowTotal}>
        <Box sx={styles?.bHead}>Total</Box>
        <Box sx={styles?.bHead}>£{sum - unitDiscount}</Box>
      </Box>

      <Box sx={styles?.signatureCard}>
        <Box sx={styles?.signatureBox}>
          <Box sx={styles?.signatureSpace}>{}</Box>
          <Box sx={styles?.boxLabel}>Signature</Box>
        </Box>
        <Box sx={styles?.dateBox}>
          <Box sx={styles?.dateSpace}>{}</Box>
          <Box sx={styles?.boxLabel}>Date</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Quotation;
