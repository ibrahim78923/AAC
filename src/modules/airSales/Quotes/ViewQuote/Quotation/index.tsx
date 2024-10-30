import { Box, Typography, useTheme } from '@mui/material';
import { styles } from './Quotation.style';
import useViewQuotes from '../useViewQuote';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

const Quotation = () => {
  const {
    viewQuotesData,
    // taxCalculation
  } = useViewQuotes();
  const theme = useTheme();

  const unitDiscount = viewQuotesData?.data?.products?.reduce(
    (accumulator: any, currentValue: any) =>
      accumulator + currentValue?.unitDiscount * currentValue?.quantity,
    0,
  );

  // const taxCalculationPerc = taxCalculation?.data;

  return (
    <Box sx={styles?.box}>
      <Box sx={styles?.bRow}>
        <Box sx={styles?.bHead}>Sub Total</Box>
        <Box sx={styles?.bCell}>£ {viewQuotesData?.data?.subTotal}</Box>
      </Box>

      <Box sx={styles?.bRow}>
        <Box sx={styles?.bHead}>V.A.T</Box>
        <Box sx={styles?.bCell}>{viewQuotesData?.data?.tax ?? 'N/A'}%</Box>
      </Box>

      <Box sx={styles?.bRow}>
        <Box sx={styles?.bHead}>Unit Discount</Box>
        <Box sx={styles?.bCell}>£ {unitDiscount ?? 'N/A'} GBP</Box>
      </Box>
      <Box sx={styles?.bRow}>
        <Box sx={styles?.bHead}>Total Redeemed Discount</Box>
        <Box sx={styles?.bCell}>
          £ {viewQuotesData?.data?.RedeemedDiscount ?? 'N/A'}
        </Box>
      </Box>

      <Box sx={styles?.bRowTotal}>
        <Box sx={styles?.bHead}>Total</Box>
        <Box sx={styles?.bHead}>£{viewQuotesData?.data?.total}</Box>
      </Box>

      <Box sx={styles?.signatureCard}>
        <Box sx={styles?.signatureBox}>
          <Box sx={styles?.signatureSpace}>{}</Box>
          <Box sx={styles?.boxLabel}>Signature</Box>
        </Box>
        <Box sx={styles?.dateBox}>
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
