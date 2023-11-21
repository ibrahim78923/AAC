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

const InvoiceList = ({
  setOpenViewInvoice,
  EditInvoice,
  discountValue,
}: any) => {
  const { isOpenInvoiceList, setIsOpenInvoiceList, handleCloseInvoiceList } =
    useInvoiceList();
  const router = useRouter();
  const theme = useTheme();
  return (
    <>
      <Box sx={styles?.card(theme)}>
        <Typography variant="h5" sx={{ color: '#111827', mb: '28px' }}>
          Invoice Summary
        </Typography>
        <Box sx={styles?.cardHeader}>
          <Box sx={styles?.cardHeaderIcon}>
            <PlaneIcon />
          </Box>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: '600' }}>
              Dummy
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: '600', textTransform: 'capitalize' }}
            >
              ({EditInvoice?.details?.plantypes} Plan)
            </Typography>
          </Box>

          <Box sx={styles?.cardHeaderAction}>
            <Chip
              label={`Paid ${EditInvoice?.details?.billingCycle}`}
              color="primary"
            />
          </Box>
        </Box>

        <Box sx={styles?.divider}></Box>

        <Box sx={styles?.planTableRow}>
          <Box sx={styles?.planTableTd}>
            {EditInvoice?.details?.additionalUsers} Additional Users{' '}
            <Box component="span" sx={{ fontSize: '12px' }}>
              (£ 15/user)
            </Box>
          </Box>
          <Box sx={styles?.planTableTh}>
            £ {EditInvoice?.details?.additionalUsers * 15}
          </Box>
        </Box>
        <Box sx={styles?.planTableRow}>
          <Box sx={styles?.planTableTd}>
            {EditInvoice?.details?.additionalStorage}GB Additional Storage{' '}
            <Box component="span" sx={{ fontSize: '12px' }}>
              (£ 15/GB)
            </Box>
          </Box>
          <Box sx={styles?.planTableTh}>
            £ {EditInvoice?.details?.additionalStorage * 15}
          </Box>
        </Box>

        <Box sx={styles?.planTableRow}>
          <Box sx={styles?.planTableTdBold}>Sub Total</Box>
          <Box sx={styles?.planTableTh}>£ {EditInvoice?.subTotal}</Box>
        </Box>

        <Box sx={styles?.planTableRow}>
          <Box sx={styles?.planTableTdBold}>
            Discount{' '}
            <Box component="span" sx={{ fontSize: '12px' }}>
              ({EditInvoice?.invoiceDiscount && discountValue} %)
            </Box>
          </Box>
          <Box sx={styles?.planTableTh}>
            £ {EditInvoice?.invoiceDiscount && discountValue}
          </Box>
        </Box>
        <Box sx={styles?.planTableRow}>
          <Box sx={styles?.planTableTdBold}>
            Tax{' '}
            <Box component="span" sx={{ fontSize: '12px' }}>
              (Vat {EditInvoice?.vat}%)
            </Box>
          </Box>
          <Box sx={styles?.planTableTh}>£ {EditInvoice?.vat}</Box>
        </Box>

        <Box sx={styles?.divider}></Box>

        <Box sx={styles?.planTableRow}>
          <Box sx={styles?.planTableTdBold}>Total Cost</Box>
          <Box sx={styles?.planTableTh}>£ {EditInvoice?.total}</Box>
        </Box>
      </Box>
      <Grid container>
        <Grid item sm={3}>
          <Stack
            useFlexGap
            direction={'row'}
            sx={styles?.updateSubscription}
            style={{ justifyContent: 'flex-start' }}
          >
            <Button
              sx={styles?.cancelButton}
              onClick={() => setOpenViewInvoice(false)}
            >
              Back
            </Button>
          </Stack>
        </Grid>
        <Grid item sm={9}>
          <Stack
            spacing={'12px'}
            useFlexGap
            direction={'row'}
            sx={styles?.updateSubscription}
          >
            <Button
              sx={styles?.cancelButton}
              onClick={() => setIsOpenInvoiceList(true)}
            >
              Download
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router?.back()}
            >
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
