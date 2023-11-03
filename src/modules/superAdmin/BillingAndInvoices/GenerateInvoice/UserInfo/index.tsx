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

import TanstackTable from '@/components/Tabel/TanstackTable';

import { columns } from './UserInfo.data';

import { invoiceProducData } from '@/mock/modules/superAdmin/BillingAndDetails/GenerateInvoice';

import { LogoIcon } from '@/assets/icons';
import { AvatarImage } from '@/assets/images';

import { SUPER_ADMIN } from '@/constants';

import { styles } from './UserInfo.style';
import InvoiceList from '../../InvoiceList';

const UserInfo = () => {
  const [openViewInvoice, setOpenViewInvoice] = useState(false);

  const router = useRouter();
  const theme = useTheme();
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
              123 Street Address
            </Typography>
            <Typography variant="body3" sx={styles?.cardLeftText(theme)}>
              City | State | Zip Code
            </Typography>
            <Typography variant="body3" sx={styles?.cardLeftText(theme)}>
              Phone No
            </Typography>
            <Typography variant="body3" sx={styles?.cardLeftText(theme)}>
              Company Email
            </Typography>
          </Box>
        </Box>

        <Box sx={styles?.cardRight}>
          <Box sx={styles?.userInfo}>
            <Avatar sx={styles?.avatar} alt="" src={AvatarImage?.src}>
              R
            </Avatar>
            <Box>
              <Typography sx={styles?.userName(theme)}>Olivia Rhye</Typography>
              <Box sx={styles?.orgName}>Extreme Commerce</Box>
            </Box>
          </Box>
          <Box>
            <Typography variant="body3" sx={styles?.cardLeftText(theme)}>
              123 Street Address
            </Typography>
            <Typography variant="body3" sx={styles?.cardLeftText(theme)}>
              City | State | Zip Code
            </Typography>
            <Typography variant="body3" sx={styles?.cardLeftText(theme)}>
              Phone No
            </Typography>
            <Typography variant="body3" sx={styles?.cardLeftText(theme)}>
              Company Email
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={styles?.invoiceInfo}>
        <Grid container spacing={'16px'}>
          <Grid item xs={3}>
            <Box sx={styles?.invoiceInfoTitle}>
              Invoice No: <Box component="span">Doc-3</Box>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={styles?.invoiceInfoTitle}>
              Invoice Date: <Box component="span">April 9,2023</Box>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={styles?.invoiceInfoTitle}>
              Due Date: <Box component="span">April 27,2023</Box>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={styles?.invoiceInfoTitle}>
              Prepared By: <Box component="span">Adil Khan</Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {openViewInvoice ? (
        <InvoiceList setOpenViewInvoice={setOpenViewInvoice} />
      ) : (
        <>
          <Box sx={styles?.productCont}>
            <Box sx={styles?.productHeading}>Products</Box>
            <TanstackTable columns={columns} data={invoiceProducData} />
          </Box>
          <Box sx={styles?.voucher}>
            <Box sx={styles?.vRow}>
              <Box sx={styles?.vLabel}>
                Discount{' '}
                <Box
                  component="span"
                  sx={{ fontWeight: '500', fontSize: '14px' }}
                >
                  (10%)
                </Box>
              </Box>
              <Box sx={styles?.vValue}>(£ 10)</Box>
            </Box>
            <Box sx={styles?.vRow}>
              <Box sx={styles?.vLabel}>
                Tax{' '}
                <Box
                  component={'span'}
                  sx={{ fontWeight: '400', fontSize: '12px' }}
                >
                  (Vat 20%)
                </Box>
              </Box>
              <Box sx={styles?.vValue}>£ 27</Box>
            </Box>
            <Divider sx={{ borderColor: 'custom.off_white_one', my: '6px' }} />
            <Box sx={styles?.vRow}>
              <Box sx={styles?.vLabel}>Total Cost</Box>
              <Box sx={styles?.vValue}>£ 162</Box>
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
            onClick={() => setOpenViewInvoice(true)}
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
