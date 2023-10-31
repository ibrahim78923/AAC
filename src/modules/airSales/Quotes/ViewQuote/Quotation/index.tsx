import { Box } from '@mui/material';
import { styles } from './Quotation.style';

const Quotation = () => {
  return (
    <Box sx={styles.box}>
      <Box sx={styles.bRow}>
        <Box sx={styles.bHead}>Sub Total</Box>
        <Box sx={styles.bCell}>£75</Box>
      </Box>

      <Box sx={styles.bRow}>
        <Box sx={styles.bHead}>V.A.T</Box>
        <Box sx={styles.bCell}>20%</Box>
      </Box>

      <Box sx={styles.bRow}>
        <Box sx={styles.bHead}>Unit Discount</Box>
        <Box sx={styles.bCell}>30 GBP</Box>
      </Box>

      <Box sx={styles.bRowTotal}>
        <Box sx={styles.bHead}>Total</Box>
        <Box sx={styles.bHead}>£122</Box>
      </Box>

      <Box sx={styles.signatureCard}>
        <Box sx={styles.signatureBox}>
          <Box sx={styles.signatureSpace}>{}</Box>
          <Box sx={styles.boxLabel}>Signature</Box>
        </Box>
        <Box sx={styles.dateBox}>
          <Box sx={styles.dateSpace}>{}</Box>
          <Box sx={styles.boxLabel}>Date</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Quotation;
