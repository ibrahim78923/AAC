import React, { FC } from 'react';

import {
  Box,
  Button,
  Typography,
  Divider,
  Grid,
  Avatar,
  Dialog,
  DialogContent,
  useTheme,
} from '@mui/material';

import TanstackTable from '@/components/Tabel/TanstackTable';

import { invoiceProducData } from '@/mock/modules/SubscriptionAndInvoices';
import { ViewInvoicesI } from './ViewInvoices.interface';

import { styles } from './ViewInvoices.style';

import { CloseModalIcon, LogoIcon } from '@/assets/icons';
import { AvatarImage } from '@/assets/images';

const DownloadInvoices: FC<ViewInvoicesI> = ({ open, onClose }) => {
  const columns: any = [
    {
      accessorFn: (row: any) => row.id,
      id: 'srNumber',
      cell: () => '1',
      header: 'Sr#',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.product,
      id: 'product',
      cell: (info: any) => (
        <>
          <Box sx={{ fontWeight: '500', color: 'blue.dull_blue' }}>
            {info.getValue()}
          </Box>
          <Box>{info.row.original.plan}</Box>
        </>
      ),
      header: 'Product/Suite',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row.planPrice,
      id: 'planPrice',
      isSortable: true,
      header: 'Plan Price',
      cell: (info: any) => <>£ {info.getValue()}</>,
    },
    {
      accessorFn: (row: any) => row.additionalUsers,
      id: 'additionalUsers',
      isSortable: true,
      header: 'Additional Users',
      cell: (info: any) => (
        <>
          {info.getValue()} (*£15) = £{info.getValue() * 15}
        </>
      ),
    },
    {
      accessorFn: (row: any) => row.additionalStorage,
      id: 'additionalStorage',
      isSortable: true,
      header: 'Additional Storage',
      cell: (info: any) => (
        <>
          {info.getValue()} (*£15) = £{info.getValue() * 15}
        </>
      ),
    },
    {
      accessorFn: (row: any) => row.discount,
      id: 'discount',
      isSortable: true,
      header: 'Discount(%)',
      cell: (info: any) => (
        <Box sx={{ fontWeight: '800' }}>{info.getValue()} %</Box>
      ),
    },
    {
      accessorFn: (row: any) => row.subTotal,
      id: 'subTotal',
      isSortable: true,
      header: 'Subtotal',
      cell: (info: any) => (
        <Box sx={{ fontWeight: '800' }}>£ {info.getValue()}</Box>
      ),
    },
  ];
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '8px',
        },
      }}
    >
      <DialogContent sx={{ p: '12px 24px 24px' }}>
        <Box>
          <Box sx={styles.topBar}>
            <Box sx={styles.modalClose} onClick={onClose}>
              <CloseModalIcon />
            </Box>
          </Box>
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
                <Typography variant="body3" sx={styles.cardLeftText(theme)}>
                  123 Street Address
                </Typography>
                <Typography variant="body3" sx={styles.cardLeftText(theme)}>
                  City | State | Zip Code
                </Typography>
                <Typography variant="body3" sx={styles.cardLeftText(theme)}>
                  Phone No
                </Typography>
                <Typography variant="body3" sx={styles.cardLeftText(theme)}>
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
                  <Box sx={styles.orgName(theme)}>Extreme Commerce</Box>
                </Box>
              </Box>
              <Box>
                <Typography variant="body3" sx={styles.cardLeftText(theme)}>
                  123 Street Address
                </Typography>
                <Typography variant="body3" sx={styles.cardLeftText(theme)}>
                  City | State | Zip Code
                </Typography>
                <Typography variant="body3" sx={styles.cardLeftText(theme)}>
                  Phone No
                </Typography>
                <Typography variant="body3" sx={styles.cardLeftText(theme)}>
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
                <Box
                  component="span"
                  sx={{ fontWeight: '500', fontSize: '14px' }}
                >
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
            <Button variant="contained" color="primary">
              Download
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadInvoices;
