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
} from '@mui/material';
import { ViewInvoicesI } from './ViewInvoices.interface';
import { CloseModalIcon, LogoIcon } from '@/assets/icons';
import { styles } from './ViewInvoices.style';
import TanstackTable from '@/components/Table/TanstackTable';
import { AvatarImage } from '@/assets/images';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

const ViewInvoices: FC<ViewInvoicesI> = ({ open, onClose, invoiceData }) => {
  const dataArray = [invoiceData];

  const planPrice = invoiceData?.plans?.planPrice;
  const invoiceDiscount = invoiceData?.invoiceDiscount;
  const invoiceDiscountAmounts =
    (invoiceDiscount / 100) * invoiceData?.details?.subTotal;

  const tax = invoiceData?.tax;

  const totalAdditionalUserPrice =
    invoiceData?.details?.sumAdditionalUsersPrices;
  const totalAdditionalStoragePrice =
    invoiceData?.details?.sumAdditionalStoragePrices;

  const planDiscount = invoiceData?.details?.planDiscount;

  const subtotalBeforeDiscount =
    planPrice + totalAdditionalUserPrice + totalAdditionalStoragePrice;

  const subtotalAfterDiscount =
    subtotalBeforeDiscount - (planDiscount / 100) * subtotalBeforeDiscount;

  const total =
    subtotalAfterDiscount - (invoiceDiscount / 100) * subtotalAfterDiscount;

  const netAmout = total + (tax / 100) * total;

  const TaxAmountOfSubtotal = (tax / 100) * total;

  const columns: any = [
    {
      accessorFn: (row: any) => row?.id,
      id: 'srNumber',
      cell: () => '1',
      header: 'Sr#',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.product,
      id: 'product',
      cell: (info: any) => (
        <>
          <Box sx={{ fontWeight: '500', color: 'blue.dull_blue' }}>
            {info.getValue()}
          </Box>
          <Box>{invoiceData?.plans?.name}</Box>
        </>
      ),
      header: 'Product/Suite',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.planPrice,
      id: 'planPrice',
      isSortable: true,
      header: 'Plan Price',
      cell: () => <>£ {invoiceData?.plans?.planPrice}</>,
    },
    {
      accessorFn: (row: any) => row?.additionalUsers,
      id: 'additionalUsers',
      isSortable: true,
      header: 'Additional Users',
      cell: () => (
        <>
          {invoiceData?.details?.additionalUsers} * (£
          {invoiceData?.plans?.additionalPerUserPrice}) = £
          {invoiceData?.details?.sumAdditionalUsersPrices}
        </>
      ),
    },
    {
      accessorFn: (row: any) => row?.additionalStorage,
      id: 'additionalStorage',
      isSortable: true,
      header: 'Additional Storage',
      cell: () => (
        <>
          {invoiceData?.details?.additionalStorage} * (£
          {invoiceData?.plans?.additionalStoragePrice}) = £
          {invoiceData?.details?.sumAdditionalStoragePrices}
        </>
      ),
    },
    {
      accessorFn: (row: any) => row?.discount,
      id: 'discount',
      isSortable: true,
      header: 'Discount(%)',
      cell: () => (
        <Box sx={{ fontWeight: '800' }}>
          {invoiceData?.details?.planDiscount} %
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.subTotal,
      id: 'subTotal',
      isSortable: true,
      header: 'Subtotal',
      cell: () => (
        <Box sx={{ fontWeight: '800' }}>£ {invoiceData?.details?.subTotal}</Box>
      ),
    },
  ];

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
          <Box sx={styles?.topBar}>
            <Box sx={styles?.modalClose} onClick={onClose}>
              <CloseModalIcon />
            </Box>
          </Box>

          {/* Blue Card */}
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
                <Typography variant="body3" sx={styles?.cardLeftText()}>
                  123 Street Address
                </Typography>
                <Typography variant="body3" sx={styles?.cardLeftText}>
                  City | State | Zip Code
                </Typography>
                <Typography variant="body3" sx={styles?.cardLeftText}>
                  Phone No
                </Typography>
                <Typography variant="body3" sx={styles?.cardLeftText}>
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
                  <Typography sx={styles?.userName}>--</Typography>
                  <Box sx={styles?.orgName}>
                    {invoiceData?.organizations?.name}
                  </Box>
                </Box>
              </Box>
              <Box>
                {invoiceData?.organizations?.address?.composite ? (
                  <>
                    <Typography variant="body3" sx={styles?.cardLeftText}>
                      {invoiceData?.organizations?.address?.composite}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="body3" sx={styles?.cardLeftText}>
                      {invoiceData?.organizations?.address?.street}
                    </Typography>
                    <Typography variant="body3" sx={styles?.cardLeftText}>
                      {invoiceData?.organizations?.address?.city} |{' '}
                      {invoiceData?.organizations?.address?.state} |{' '}
                      {invoiceData?.organizations?.address?.postalCode}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          </Box>

          <Box sx={styles?.invoiceInfo}>
            <Grid container spacing={'16px'}>
              <Grid item xs={3}>
                <Box sx={styles?.invoiceInfoTitle}>
                  Invoice No:{' '}
                  <Box component="span">{invoiceData?.invoiceNo}</Box>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box sx={styles?.invoiceInfoTitle}>
                  Invoice Date:{' '}
                  <Box component="span">
                    {dayjs(invoiceData?.updatedAt).format(DATE_FORMAT?.API)}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box sx={styles?.invoiceInfoTitle}>
                  Due Date:{' '}
                  <Box component="span">
                    {dayjs(invoiceData?.dueDate).format(DATE_FORMAT?.API)}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box sx={styles?.invoiceInfoTitle}>
                  Prepared By: <Box component="span">Auto Generated</Box>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Product Table */}
          <Box sx={styles?.productCont}>
            <Box sx={styles?.productHeading}>Products</Box>
            <TanstackTable columns={columns} data={dataArray} />
          </Box>

          {/* Voucher Card*/}
          <Box sx={styles?.voucher}>
            <Box sx={styles?.vRow}>
              <Box sx={styles?.vLabel}>
                Discount{' '}
                <Box
                  component="span"
                  sx={{ fontWeight: '500', fontSize: '14px' }}
                >
                  ({invoiceData?.invoiceDiscount}%)
                </Box>
              </Box>
              <Box sx={styles?.vValue}>£ {invoiceDiscountAmounts || 0}</Box>
            </Box>
            {/* total  */}
            {/* <Box sx={styles?.vRow}>
              <Box sx={styles?.vLabel}>
                Total{' '}
                <Box
                  component="span"
                  sx={{ fontWeight: '500', fontSize: '14px' }}
                ></Box>
              </Box>
              <Box sx={styles?.vValue}>£ {total}</Box>
            </Box> */}
            {/* total  */}
            <Box sx={styles?.vRow}>
              <Box sx={styles?.vLabel}>
                Tax{' '}
                <Box
                  component={'span'}
                  sx={{ fontWeight: '400', fontSize: '12px' }}
                >
                  ({tax} %)
                </Box>
              </Box>
              <Box sx={styles?.vValue}>£ {TaxAmountOfSubtotal?.toFixed(2)}</Box>
            </Box>
            <Divider sx={{ borderColor: 'custom.off_white_one', my: '6px' }} />
            <Box sx={styles?.vRow}>
              <Box sx={styles?.vLabel}>Total Cost</Box>
              <Box sx={styles?.vValue}>£ {netAmout?.toFixed(2)}</Box>
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

export default ViewInvoices;
