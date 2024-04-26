import { Box } from '@mui/material';
import { styles } from './Quotation.style';
import useUpdateQuote from '../../useUpdateQuote';

const Quotation = () => {
  const { dataGetQuoteById, taxCalculation } = useUpdateQuote();

  const sum = dataGetQuoteById?.data?.products?.reduce(
    (accumulator: any, currentValue: any) =>
      accumulator + currentValue?.unitPrice * currentValue?.quantity,
    0,
  );

  const unitDiscount = dataGetQuoteById?.data?.products?.reduce(
    (accumulator: any, currentValue: any) =>
      accumulator + currentValue?.unitDiscount * currentValue?.quantity,
    0,
  );
  const taxCalculationPerc = taxCalculation?.data?.taxCalculations;
  const gettingDiscount = dataGetQuoteById?.data?.products[0]?.unitDiscount;

  let totalPercentage = 0;
  if (taxCalculationPerc && Array.isArray(taxCalculationPerc)) {
    for (const tax of taxCalculationPerc) {
      totalPercentage += tax.percentage;
    }
  }
  const percentageOfSubtotal = sum * (totalPercentage / 100);

  const FinalTotal = percentageOfSubtotal - gettingDiscount;
  return (
    <Box sx={styles?.box}>
      <Box sx={styles?.bRow}>
        <Box sx={styles?.bHead}>Sub Total</Box>
        <Box sx={styles?.bCell}>£{sum}</Box>
      </Box>

      <Box sx={styles?.bRow}>
        <Box sx={styles?.bHead}>
          {taxCalculationPerc?.map((item: any) => {
            return item.name;
          })}
        </Box>
        <Box sx={styles?.bCell}>{totalPercentage}</Box>
      </Box>

      <Box sx={styles?.bRow}>
        <Box sx={styles?.bHead}>Unit Discount</Box>
        <Box sx={styles?.bCell}>{unitDiscount} GBP</Box>
      </Box>

      <Box sx={styles?.bRowTotal}>
        <Box sx={styles?.bHead}>Total</Box>
        <Box sx={styles?.bHead}>£{FinalTotal?.toFixed(2)}</Box>
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
