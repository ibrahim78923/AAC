import { Box, Typography, useTheme } from '@mui/material';
import { styles } from './Quotation.style';
import useViewQuotes from '../useViewQuote';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

const Quotation = () => {
  const { viewQuotesData, taxCalculation } = useViewQuotes();
  const theme = useTheme();

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

  const taxCalculationPerc = taxCalculation?.data?.taxCalculations;

  const gettingDiscount = viewQuotesData?.data?.products[0]?.unitDiscount;

  let totalPercentage = 0;
  if (taxCalculationPerc && Array.isArray(taxCalculationPerc)) {
    for (const tax of taxCalculationPerc) {
      totalPercentage += tax.percentage;
    }
  }

  const percentageOfSubtotal = sum * (totalPercentage / 100);
  const discount = isNaN(gettingDiscount) ? 0 : gettingDiscount;

  let FinalTotal;
  if (!isNaN(percentageOfSubtotal) && !isNaN(discount)) {
    FinalTotal = (percentageOfSubtotal - discount)?.toFixed(2);
  } else {
    FinalTotal = 'N/A';
  }

  return (
    <Box sx={styles?.box}>
      <Box sx={styles?.bRow}>
        <Box sx={styles?.bHead}>Sub Total</Box>
        <Box sx={styles?.bCell}>£{sum}</Box>
      </Box>

      <Box sx={styles?.bRow}>
        <Box sx={styles?.bHead}>
          {taxCalculationPerc?.map((item: any) => {
            return item?.name;
          })}
        </Box>
        <Box sx={styles?.bCell}>{totalPercentage ?? 'N/A'}</Box>
      </Box>

      <Box sx={styles?.bRow}>
        <Box sx={styles?.bHead}>Unit Discount</Box>
        <Box sx={styles?.bCell}>£ {unitDiscount ?? 'N/A'} GBP</Box>
      </Box>

      <Box sx={styles?.bRowTotal}>
        <Box sx={styles?.bHead}>Total</Box>
        <Box sx={styles?.bHead}>£{FinalTotal}</Box>
      </Box>

      <Box sx={styles?.signatureCard}>
        <Box sx={styles?.signatureBox}>
          <Box sx={styles?.signatureSpace}>{}</Box>
          <Box sx={styles?.boxLabel}>Signature</Box>
        </Box>
        <Box sx={styles?.dateBox}>
          {/* <Box sx={styles?.dateSpace}></Box> */}
          <Typography
            sx={{
              ml: 1,
              fontSize: '13px',
              fontWeight: '400',
              color: theme?.palette?.custom?.main,
            }}
          >
            {dayjs(viewQuotesData?.data?.createdAt)?.format(DATE_FORMAT?.API)}
          </Typography>
          <Box sx={styles?.boxLabel}>Date</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Quotation;
