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

import TanstackTable from '@/components/Table/TanstackTable';

import { ViewInvoicesI } from './ViewInvoices.interface';

import { styles } from './ViewInvoices.style';

import { CloseModalIcon, LogoIcon } from '@/assets/icons';
import { AvatarImage } from '@/assets/images';
import { v4 as uuidv4 } from 'uuid';
import jsPDF from 'jspdf';
import { useRouter } from 'next/router';

const DownloadInvoices: FC<ViewInvoicesI> = ({
  open,
  onClose,
  DownloadInvoiceData,
  discountValue,
}) => {
  const columns: any = [
    {
      accessorFn: (row: any) => row?.id,
      id: 'srNumber',
      cell: () => '1',
      header: 'Sr#',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.products,
      id: 'product',
      cell: (info: any) => (
        <>
          <Box sx={{ fontWeight: '500', color: 'blue.dull_blue' }}>
            {info?.getValue()}
            {info?.row?.original?.plans?.products?.map((data: any) => (
              <Typography variant="body3" key={uuidv4()}>
                {data?.name}{' '}
              </Typography>
            ))}
          </Box>
          <Typography variant="body3">
            ({info?.row?.original?.plantypes})
          </Typography>
        </>
      ),
      header: 'Product/Suite',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.details?.plans?.planPrice,
      id: 'planPrice',
      isSortable: true,
      header: 'Plan Price',
      cell: (info: any) => <>£ {info?.getValue()}</>,
    },
    {
      accessorFn: (row: any) => row?.details?.additionalUsers,
      id: 'additionalUsers',
      isSortable: true,
      header: 'Additional Users',
      cell: (info: any) => (
        <>
          {info?.getValue()} (*£15) = £ {info?.getValue() * 15}
        </>
      ),
    },
    {
      accessorFn: (row: any) => row?.details?.additionalStorage,
      id: 'additionalStorage',
      isSortable: true,
      header: 'Additional Storage',
      cell: (info: any) => (
        <>
          {info?.getValue()} (*£15) = £{info.getValue() * 15}
        </>
      ),
    },
    {
      accessorFn: (row: any) => row?.invoiceDiscount,
      id: 'discount',
      isSortable: true,
      header: 'Discount(%)',
      cell: (info: any) => (
        <Box sx={{ fontWeight: '800' }}>
          {info?.getValue() && discountValue} %
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.subTotal,
      id: 'subTotal',
      isSortable: true,
      header: 'Subtotal',
      cell: (info: any) => (
        <Box sx={{ fontWeight: '800' }}>£ {info?.getValue()}</Box>
      ),
    },
  ];
  const theme = useTheme();
  const router = useRouter();

  const handleDownload = () => {
    const invoice: any = new jsPDF('portrait', 'pt', [1200, 1200]);
    invoice.html(document.querySelector('#invoice-data')).then(() => {
      invoice.save('invoice.pdf');
    });
    onClose();
    router?.back();
  };

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
        <Box id="invoice-data">
          <Box sx={styles?.topBar}>
            <Box sx={styles?.modalClose} onClick={onClose}>
              <CloseModalIcon />
            </Box>
          </Box>
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
                  {DownloadInvoiceData?.organizations?.address?.street}
                </Typography>
                <Typography variant="body3" sx={styles?.cardLeftText}>
                  {DownloadInvoiceData?.organizations?.address?.city} |{' '}
                  {DownloadInvoiceData?.organizations?.address?.state} |{' '}
                  {DownloadInvoiceData?.organizations?.address?.postalCode}
                </Typography>
                <Typography variant="body3" sx={styles?.cardLeftText}>
                  {DownloadInvoiceData?.organizations?.phoneNo}
                </Typography>
                <Typography variant="body3" sx={styles?.cardLeftText}>
                  {DownloadInvoiceData?.organizations?.email}
                </Typography>
              </Box>
            </Box>

            <Box sx={styles?.cardRight}>
              <Box sx={styles?.userInfo}>
                <Avatar sx={styles?.avatar} alt="" src={AvatarImage?.src}>
                  {' '}
                </Avatar>
                <Box>
                  <Typography sx={styles?.userName}>
                    {DownloadInvoiceData?.usersOrg?.firstName}{' '}
                    {DownloadInvoiceData?.usersOrg?.lastName}
                  </Typography>
                  <Box sx={styles?.orgName}>
                    {DownloadInvoiceData?.organizations?.name}
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography variant="body3" sx={styles?.cardLeftText}>
                  {DownloadInvoiceData?.organizations?.address?.street}
                </Typography>
                <Typography variant="body3" sx={styles?.cardLeftText}>
                  {DownloadInvoiceData?.organizations?.address?.city} |{' '}
                  {DownloadInvoiceData?.organizations?.address?.state} |{' '}
                  {DownloadInvoiceData?.organizations?.address?.postalCode}
                </Typography>
                <Typography variant="body3" sx={styles?.cardLeftText}>
                  {DownloadInvoiceData?.organizations?.phoneNo}
                </Typography>
                <Typography variant="body3" sx={styles?.cardLeftText}>
                  {DownloadInvoiceData?.organizations?.email}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={styles?.invoiceInfo}>
            <Grid container spacing={'16px'}>
              <Grid item xs={4}>
                <Box sx={styles?.invoiceInfoTitle}>
                  Invoice No:{' '}
                  <Typography>{DownloadInvoiceData?.invoiceNo}</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={styles?.invoiceInfoTitle}>
                  Invoice Date:{' '}
                  <Typography>
                    {DownloadInvoiceData?.billingDate
                      ? new Date(
                          DownloadInvoiceData?.billingDate,
                        ).toLocaleDateString('en-GB')
                      : 'Invalid Date'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={styles?.invoiceInfoTitle}>
                  Due Date:{' '}
                  <Typography>
                    {DownloadInvoiceData?.dueDate
                      ? new Date(
                          DownloadInvoiceData?.dueDate,
                        ).toLocaleDateString('en-GB')
                      : 'Invalid Date'}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Product Table */}
          <Box sx={styles?.productCont}>
            <Box sx={styles?.productHeading}>Products</Box>
            <TanstackTable columns={columns} data={[DownloadInvoiceData]} />
          </Box>

          {/* Voucher Card*/}
          <Box sx={styles?.voucher}>
            <Box sx={styles?.vRow}>
              <Box sx={styles?.vLabel}>
                Discount{' '}
                <Typography sx={{ fontWeight: '500', fontSize: '14px' }}>
                  ({DownloadInvoiceData?.invoiceDiscount && discountValue}%)
                </Typography>
              </Box>
              <Box sx={styles?.vValue}>
                (£ {DownloadInvoiceData?.invoiceDiscount && discountValue})
              </Box>
            </Box>
            <Box sx={styles?.vRow}>
              <Box sx={styles?.vLabel}>
                Tax{' '}
                <Typography sx={{ fontWeight: '400', fontSize: '12px' }}>
                  (Vat {DownloadInvoiceData?.vat}%)
                </Typography>
              </Box>
              <Box sx={styles?.vValue}>£ {DownloadInvoiceData?.vat}</Box>
            </Box>
            <Divider sx={{ borderColor: 'custom.off_white_one', my: '6px' }} />
            <Box sx={styles?.vRow}>
              <Box sx={styles?.vLabel}>Total Cost</Box>
              <Box sx={styles?.vValue}>£ {DownloadInvoiceData?.total}</Box>
            </Box>
          </Box>

          <Divider sx={{ borderColor: 'custom.off_white_one', my: '24px' }} />

          <Box sx={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDownload}
            >
              Download
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadInvoices;
