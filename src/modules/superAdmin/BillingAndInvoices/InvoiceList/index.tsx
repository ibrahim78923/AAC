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
import { v4 as uuidv4 } from 'uuid';
import { InvoiceListPropsI, ListProductI } from './invoicesList.interface';

const InvoiceList = ({
  setOpenViewInvoice,
  EditInvoice,
  discountValue,
}: InvoiceListPropsI) => {
  const { isOpenInvoiceList, setIsOpenInvoiceList, handleCloseInvoiceList } =
    useInvoiceList();
  const theme = useTheme();

  const planPrice = EditInvoice?.plans?.planPrice ?? 0;

  const totalAdditionalUserPrice =
    EditInvoice?.details?.sumAdditionalUsersPrices ?? 0;

  const totalAdditionalStoragePrice =
    EditInvoice?.details?.sumAdditionalStoragePrices ?? 0;

  const planDiscount = EditInvoice?.details?.planDiscount ?? 0;

  const subtotalBeforeDiscount =
    planPrice + totalAdditionalUserPrice + totalAdditionalStoragePrice;

  const subtotalAfterDiscount =
    subtotalBeforeDiscount - (planDiscount / 100) * subtotalBeforeDiscount;

  const invoiceDiscount = EditInvoice?.invoiceDiscount ?? 0;

  const invoiceDiscountAmount =
    (invoiceDiscount / 100) * (EditInvoice?.details?.subTotal ?? 0);

  const total =
    subtotalAfterDiscount - (invoiceDiscount / 100) * subtotalAfterDiscount;

  const tax = EditInvoice?.tax ?? 0;
  const TaxAmountOfSubtotal = (tax / 100) * total;

  const netAmout = EditInvoice?.netAmount;

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
            {EditInvoice?.plans?.products?.map((data: ListProductI) => (
              <Typography
                variant="h6"
                sx={{ fontWeight: '600' }}
                key={uuidv4()}
              >
                {data?.name}{' '}
              </Typography>
            ))}
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
              (£ {EditInvoice?.plans?.additionalPerUserPrice}/user)
            </Box>
          </Box>
          <Box sx={styles?.planTableTh}>
            £ {EditInvoice?.details?.sumAdditionalUsersPrices}
          </Box>
        </Box>
        <Box sx={styles?.planTableRow}>
          <Box sx={styles?.planTableTd}>
            {EditInvoice?.details?.additionalStorage} GB Additional Storage{' '}
            <Box component="span" sx={{ fontSize: '12px' }}>
              (£ {EditInvoice?.plans?.additionalStoragePrice}/GB)
            </Box>
          </Box>
          <Box sx={styles?.planTableTh}>
            £ {EditInvoice?.details?.sumAdditionalStoragePrices}
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
            £ {invoiceDiscountAmount?.toFixed(2)}
          </Box>
        </Box>
        <Box sx={styles?.planTableRow}>
          <Box sx={styles?.planTableTdBold}>
            Tax{' '}
            <Box component="span" sx={{ fontSize: '12px' }}>
              (Vat {EditInvoice?.tax}%)
            </Box>
          </Box>
          <Box sx={styles?.planTableTh}>
            £ {TaxAmountOfSubtotal?.toFixed(2)}
          </Box>
        </Box>

        <Box sx={styles?.divider}></Box>

        <Box sx={styles?.planTableRow}>
          <Box sx={styles?.planTableTdBold}>Total Cost</Box>
          <Box sx={styles?.planTableTh}>£ {netAmout?.toFixed(2)}</Box>
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
          </Stack>
        </Grid>
      </Grid>

      <DownloadInvoices
        open={isOpenInvoiceList}
        onClose={handleCloseInvoiceList}
        DownloadInvoiceData={EditInvoice}
        discountValue={discountValue}
      />
    </>
  );
};
export default InvoiceList;
