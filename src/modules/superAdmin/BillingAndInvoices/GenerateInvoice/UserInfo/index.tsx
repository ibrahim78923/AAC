import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  CardActions,
  Typography,
  Grid,
  Box,
  Button,
  Divider,
  Avatar,
  useTheme,
} from '@mui/material';

import TanstackTable from '@/components/Table/TanstackTable';

import { columns } from './UserInfo.data';

import { LogoIcon } from '@/assets/icons';
import { AvatarImage } from '@/assets/images';

import { SUPER_ADMIN } from '@/constants';

import { styles } from './UserInfo.style';
import InvoiceList from '../../InvoiceList';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { usePatchUpdateInvoicesMutation } from '@/services/superAdmin/billing-invoices';
import { enqueueSnackbar } from 'notistack';

const UserInfo = () => {
  const [openViewInvoice, setOpenViewInvoice] = useState(false);
  const [discountValue, setDiscountValue] = useState('');
  const [dateValue, setDateValue] = useState<Date | null>(Date(''));

  const inputDate = new Date(dateValue);

  const [updateInvoice] = usePatchUpdateInvoicesMutation();

  const year = inputDate.getUTCFullYear();
  const month = (inputDate.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = inputDate.getUTCDate().toString().padStart(2, '0');
  const formattedDateString = `${year}-${month}-${day}`;

  const router = useRouter();
  const theme = useTheme();

  let EditInvoice: any;
  if (router?.query?.key) {
    EditInvoice = JSON?.parse(router?.query?.key);
  }

  const getDiscountValues = columns(setDiscountValue, discountValue);

  const handleUpdate = async () => {
    const updateInvoicePayload = {
      dueDate: formattedDateString,
      invoiceDiscount: discountValue,
      status: EditInvoice?.status,
    };

    try {
      await updateInvoice({
        body: updateInvoicePayload,
        invoiceId: EditInvoice?._id,
      }).unwrap();
      enqueueSnackbar('Invoice Updated Successfully', {
        variant: 'success',
      });
      setOpenViewInvoice(true);
    } catch {
      enqueueSnackbar('Some thing went wrong', {
        variant: 'error',
      });
    }
  };

  return (
    <Box>
      <Box sx={styles?.blueCard}>
        <Box sx={styles?.cardLeft}>
          <Box sx={{ mr: '18px' }}>
            <LogoIcon />
          </Box>

          <Box>
            <Typography
              variant="h5"
              sx={{
                color: '#fff',
                fontSize: '18px !important',
                lineHeight: '1.555556',
              }}
            >
              Air Applecart
            </Typography>
            <Typography variant="body3" sx={styles?.cardLeftText(theme)}>
              {EditInvoice?.organizations?.address?.street}
            </Typography>
            <Typography variant="body3" sx={styles?.cardLeftText(theme)}>
              {EditInvoice?.organizations?.address?.city} |{' '}
              {EditInvoice?.organizations?.address?.state} |{' '}
              {EditInvoice?.organizations?.address?.postalCode}
            </Typography>
            <Typography variant="body3" sx={styles?.cardLeftText(theme)}>
              {EditInvoice?.organizations?.address?.phoneNo}
            </Typography>
            <Typography variant="body3" sx={styles?.cardLeftText(theme)}>
              {EditInvoice?.organizations?.address?.email}
            </Typography>
          </Box>
        </Box>

        <Box sx={styles?.cardRight}>
          <Box sx={styles?.userInfo}>
            <Avatar sx={styles?.avatar} alt="" src={AvatarImage?.src}>
              R
            </Avatar>
            <Box>
              <Typography sx={styles?.userName(theme)}>Dummy</Typography>
              <Box sx={styles?.orgName}>
                {' '}
                {EditInvoice?.organizations?.name}
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography variant="body3" sx={styles?.cardLeftText(theme)}>
              {EditInvoice?.organizations?.address?.street}
            </Typography>
            <Typography variant="body3" sx={styles?.cardLeftText(theme)}>
              {EditInvoice?.organizations?.address?.city} |{' '}
              {EditInvoice?.organizations?.address?.state} |{' '}
              {EditInvoice?.organizations?.address?.postalCode}
            </Typography>
            <Typography variant="body3" sx={styles?.cardLeftText(theme)}>
              {EditInvoice?.organizations?.address?.phoneNo}
            </Typography>
            <Typography variant="body3" sx={styles?.cardLeftText(theme)}>
              {EditInvoice?.organizations?.address?.email}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={styles?.invoiceInfo}>
        <Grid container spacing={'16px'}>
          <Grid item xs={4}>
            <Box sx={styles?.invoiceInfoTitle}>
              Invoice No: <Box component="span">{EditInvoice?.invoiceNo}</Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={styles?.invoiceInfoTitle}>
              Invoice Date:{' '}
              <Box component="span">
                {' '}
                {EditInvoice?.billingDate
                  ? new Date(EditInvoice?.billingDate).toLocaleDateString(
                      'en-GB',
                    )
                  : 'Invalid Date'}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={styles?.invoiceInfoTitle}>
              {/* Due Date: <Box component="span">April 27,2023</Box> */}
              Due Date:
              <DatePicker
                slotProps={{
                  textField: {
                    label: '',
                    inputProps: { style: { height: 2 } },
                  },
                }}
                // value={dateValue}
                onChange={(newValue) => setDateValue(newValue)}
                label="date picker"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      {openViewInvoice ? (
        <InvoiceList
          setOpenViewInvoice={setOpenViewInvoice}
          EditInvoice={EditInvoice}
          discountValue={discountValue}
        />
      ) : (
        <>
          <Box sx={styles?.productCont}>
            <Box sx={styles?.productHeading}>Products</Box>
            <TanstackTable columns={getDiscountValues} data={[EditInvoice]} />
          </Box>
          <Box sx={styles?.voucher}>
            <Box sx={styles?.vRow}>
              <Box sx={styles?.vLabel}>
                Discount{' '}
                <Box
                  component="span"
                  sx={{ fontWeight: '500', fontSize: '14px' }}
                >
                  ({EditInvoice?.invoiceDiscount}%)
                </Box>
              </Box>
              <Box sx={styles?.vValue}>(£ {EditInvoice?.invoiceDiscount})</Box>
            </Box>
            <Box sx={styles?.vRow}>
              <Box sx={styles?.vLabel}>
                Tax{' '}
                <Box
                  component={'span'}
                  sx={{ fontWeight: '400', fontSize: '12px' }}
                >
                  (Vat {EditInvoice?.vat}%)
                </Box>
              </Box>
              <Box sx={styles?.vValue}>£ {EditInvoice?.vat}</Box>
            </Box>
            <Divider sx={{ borderColor: 'custom.off_white_one', my: '6px' }} />
            <Box sx={styles?.vRow}>
              <Box sx={styles?.vLabel}>Total Cost</Box>
              <Box sx={styles?.vValue}>£ {EditInvoice?.total}</Box>
            </Box>
          </Box>
        </>
      )}

      <Divider sx={{ borderColor: 'custom.off_white_one', my: '24px' }} />

      {!openViewInvoice && (
        <Box sx={{ textAlign: 'right' }}>
          <Button
            variant="outlined"
            sx={{ border: '1px solid #D1D5DB', color: '#6B7280' }}
            onClick={() => router?.push(`${SUPER_ADMIN?.BILLING_INVOICES}`)}
          >
            cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleUpdate();
            }}
            sx={{ marginLeft: '15px' }}
          >
            Next
          </Button>
        </Box>
      )}

      <CardActions></CardActions>
    </Box>
  );
};
export default UserInfo;
