import {
  CardActions,
  Typography,
  Grid,
  Box,
  Button,
  Divider,
  Avatar,
} from '@mui/material';

import { styles } from './UserInfo.style';

import { LogoIcon } from '@/assets/icons';
import { AvatarImage } from '@/assets/images';
import TanstackTable from '@/components/Tabel/TanstackTable';
import { invoiceProducData } from '@/mock/modules/superAdmin/BillingAndDetails/GenerateInvoice';
import { columns } from './UserInfo.data';
import { useRouter } from 'next/router';

const UserInfo = () => {
  const router = useRouter();
  return (
    <Box>
      <Box sx={styles.blueCard}>
        <Box sx={styles.cardLeft}>
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
            <Typography variant="body3" sx={styles.cardLeftText}>
              123 Street Address
            </Typography>
            <Typography variant="body3" sx={styles.cardLeftText}>
              City | State | Zip Code
            </Typography>
            <Typography variant="body3" sx={styles.cardLeftText}>
              Phone No
            </Typography>
            <Typography variant="body3" sx={styles.cardLeftText}>
              Company Email
            </Typography>
          </Box>
        </Box>

        <Box sx={styles.cardRight}>
          <Box sx={styles.userInfo}>
            <Avatar sx={styles.avatar} alt="" src={AvatarImage.src}>
              R
            </Avatar>
            <Box>
              <Typography sx={styles.userName}>Olivia Rhye</Typography>
              <Box sx={styles.orgName}>Extreme Commerce</Box>
            </Box>
          </Box>
          <Box>
            <Typography variant="body3" sx={styles.cardLeftText}>
              123 Street Address
            </Typography>
            <Typography variant="body3" sx={styles.cardLeftText}>
              City | State | Zip Code
            </Typography>
            <Typography variant="body3" sx={styles.cardLeftText}>
              Phone No
            </Typography>
            <Typography variant="body3" sx={styles.cardLeftText}>
              Company Email
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={styles.invoiceInfo}>
        <Grid container spacing={'16px'}>
          <Grid item xs={3}>
            <Box sx={styles.invoiceInfoTitle}>
              Invoice No: <Box component="span">Doc-3</Box>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={styles.invoiceInfoTitle}>
              Invoice Date: <Box component="span">April 9,2023</Box>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={styles.invoiceInfoTitle}>
              Due Date: <Box component="span">April 27,2023</Box>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={styles.invoiceInfoTitle}>
              Prepared By: <Box component="span">Adil Khan</Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={styles.productCont}>
        <Box sx={styles.productHeading}>Products</Box>
        <TanstackTable columns={columns} data={invoiceProducData} />
      </Box>
      <Box sx={styles.voucher}>
        <Box sx={styles.vRow}>
          <Box sx={styles.vLabel}>
            Discount{' '}
            <Box component="span" sx={{ fontWeight: '500', fontSize: '14px' }}>
              (10%)
            </Box>
          </Box>
          <Box sx={styles.vValue}>(£ 10)</Box>
        </Box>
        <Box sx={styles.vRow}>
          <Box sx={styles.vLabel}>
            Tax{' '}
            <Box
              component={'span'}
              sx={{ fontWeight: '400', fontSize: '12px' }}
            >
              (Vat 20%)
            </Box>
          </Box>
          <Box sx={styles.vValue}>£ 27</Box>
        </Box>
        <Divider sx={{ borderColor: 'custom.off_white_one', my: '6px' }} />
        <Box sx={styles.vRow}>
          <Box sx={styles.vLabel}>Total Cost</Box>
          <Box sx={styles.vValue}>£ 162</Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'custom.off_white_one', my: '24px' }} />

      <Box sx={{ textAlign: 'right' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            router.push('/super-admin/billing-invoices/invoice-list')
          }
        >
          Next
        </Button>
      </Box>
      <CardActions></CardActions>
    </Box>
  );
};
export default UserInfo;
