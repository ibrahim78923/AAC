import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Chip,
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

import { styles } from './InvoiceList.style';
import DownloadInvoices from '../DownloadInvoices';
import useInvoiceList from './useInvoiceList';

import { PlaneIcon } from '@/assets/icons';

const InvoiceList = () => {
  const { isOpenInvoiceList, setIsOpenInvoiceList, handleCloseInvoiceList } =
    useInvoiceList();
  const router = useRouter();
  const theme = useTheme();
  return (
    <>
      <Box sx={styles.card(theme)}>
        <Typography variant="h5" sx={{ color: '#111827', mb: '28px' }}>
          Invoice Summary
        </Typography>
        <Box sx={styles.cardHeader}>
          <Box sx={styles.cardHeaderIcon}>
            <PlaneIcon />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: '600' }}>
            Air Sales
          </Typography>
          <Box sx={styles.cardHeaderAction}>
            <Chip label={'Paid Monthly'} color="primary" />
          </Box>
        </Box>

        <Box sx={styles.divider}></Box>

        <Typography variant="h6" sx={{ fontWeight: '600' }}>
          Growth Plan
        </Typography>

        <Box sx={styles.planTableRow}>
          <Box sx={styles.planTableTd}>Plan Price</Box>
          <Box sx={styles.planTableTh}>£ 20</Box>
        </Box>
        <Box sx={styles.planTableRow}>
          <Box sx={styles.planTableTd}>
            3 Additional Users{' '}
            <Box component="span" sx={{ fontSize: '12px' }}>
              (£ 15/user)
            </Box>
          </Box>
          <Box sx={styles.planTableTh}>£ 45</Box>
        </Box>
        <Box sx={styles.planTableRow}>
          <Box sx={styles.planTableTd}>
            Additional Storage{' '}
            <Box component="span" sx={{ fontSize: '12px' }}>
              (£ 1/GB)
            </Box>
          </Box>
          <Box sx={styles.planTableTh}>£ 1</Box>
        </Box>
        <Box sx={styles.planTableRow}>
          <Box sx={styles.planTableTdBold}>
            Discount{' '}
            <Box component="span" sx={{ fontSize: '12px' }}>
              (10%)
            </Box>
          </Box>
          <Box sx={styles.planTableTh}>-£ 10</Box>
        </Box>
        <Box sx={styles.planTableRow}>
          <Box sx={styles.planTableTdBold}>
            Tax{' '}
            <Box component="span" sx={{ fontSize: '12px' }}>
              (Vat 20%)
            </Box>
          </Box>
          <Box sx={styles.planTableTh}>£ 27</Box>
        </Box>

        <Box sx={styles.divider}></Box>

        <Box sx={styles.planTableRow}>
          <Box sx={styles.planTableTdBold}>Total Cost</Box>
          <Box sx={styles.planTableTh}>£ 158</Box>
        </Box>
      </Box>
      <Grid container>
        <Grid item sm={3}>
          <Stack useFlexGap direction={'row'} sx={styles.updateSubscription}>
            <Button sx={styles.cancelButton} onClick={() => router.back()}>
              Cancle
            </Button>
          </Stack>
        </Grid>
        <Grid item sm={9}>
          <Stack
            spacing={'12px'}
            useFlexGap
            direction={'row'}
            sx={styles.updateSubscription}
          >
            <Button
              sx={styles.cancelButton}
              onClick={() => setIsOpenInvoiceList(true)}
            >
              Download
            </Button>
            <Button variant="contained" color="primary">
              Generate Invoice
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <DownloadInvoices
        open={isOpenInvoiceList}
        onClose={handleCloseInvoiceList}
      />
    </>
  );
};
export default InvoiceList;
