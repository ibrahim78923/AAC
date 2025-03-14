import { Box, Typography, useTheme } from '@mui/material';
import { styles } from './Quotation.style';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

const Quotation = ({ viewQuotesData }: any) => {
  const theme = useTheme();

  return (
    <Box sx={styles?.box}>
      <Box sx={styles?.bRow}>
        <Box sx={styles?.bHead}>Deal Amount</Box>
        <Box sx={styles?.bCell}>£ {viewQuotesData?.data?.dealAmount}</Box>
      </Box>

      <Box sx={styles?.bRow}>
        <Box sx={styles?.bHead}>Sub Total</Box>
        <Box sx={styles?.bCell}>£ {viewQuotesData?.data?.subTotal}</Box>
      </Box>

      <Box sx={styles?.bRow}>
        <Box sx={styles?.bHead}>Unit Discount</Box>
        <Box sx={styles?.bCell}>
          £ {viewQuotesData?.data?.invoiceDiscount ?? 0}
        </Box>
      </Box>
      <Box sx={styles?.bRow}>
        <Box sx={styles?.bHead}>Total Redeemed Discount</Box>
        <Box sx={styles?.bCell}>
          £ {viewQuotesData?.data?.loyaltyRedeemedDiscount ?? 0}
        </Box>
      </Box>

      <Box sx={styles?.bRow}>
        <Box sx={styles?.bHead}>V.A.T</Box>
        <Box sx={styles?.bCell}>{viewQuotesData?.data?.tax ?? '0'}%</Box>
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
