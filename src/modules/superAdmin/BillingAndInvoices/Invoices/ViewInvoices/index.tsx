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
import { v4 as uuidv4 } from 'uuid';
import jsPDF from 'jspdf';

const ViewInvoices: FC<ViewInvoicesI> = ({ open, onClose, isGetRowValues }) => {
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
        <Box sx={{ fontWeight: '800' }}>{info?.getValue()} %</Box>
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

  const handleDownload = () => {
    const invoice: any = new jsPDF('portrait', 'pt', [1200, 1200]);
    invoice.html(document.querySelector('#invoice-data')).then(() => {
      invoice.save('invoice.pdf');
    });
    onClose();
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
                  {
                    isGetRowValues?.row?.original?.organizations?.address
                      ?.street
                  }
                </Typography>
                <Typography variant="body3" sx={styles?.cardLeftText}>
                  {isGetRowValues?.row?.original?.organizations?.address?.city}{' '}
                  |{' '}
                  {isGetRowValues?.row?.original?.organizations?.address?.state}{' '}
                  |{' '}
                  {
                    isGetRowValues?.row?.original?.organizations?.address
                      ?.postalCode
                  }
                </Typography>
                <Typography variant="body3" sx={styles?.cardLeftText}>
                  {isGetRowValues?.row?.original?.organizations?.phoneNo}
                </Typography>
                <Typography variant="body3" sx={styles?.cardLeftText}>
                  {isGetRowValues?.row?.original?.organizations?.email}
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
                    {isGetRowValues?.row?.original?.usersOrg?.firstName}{' '}
                    {isGetRowValues?.row?.original?.usersOrg?.lastName}
                  </Typography>
                  <Box sx={styles?.orgName}>
                    {isGetRowValues?.row?.original?.organizations?.name}
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography variant="body3" sx={styles?.cardLeftText}>
                  {
                    isGetRowValues?.row?.original?.organizations?.address
                      ?.street
                  }
                </Typography>
                <Typography variant="body3" sx={styles?.cardLeftText}>
                  {isGetRowValues?.row?.original?.organizations?.address?.city}{' '}
                  |{' '}
                  {isGetRowValues?.row?.original?.organizations?.address?.state}{' '}
                  |{' '}
                  {
                    isGetRowValues?.row?.original?.organizations?.address
                      ?.postalCode
                  }
                </Typography>
                <Typography variant="body3" sx={styles?.cardLeftText}>
                  {isGetRowValues?.row?.original?.organizations?.phoneNo}
                </Typography>
                <Typography variant="body3" sx={styles?.cardLeftText}>
                  {isGetRowValues?.row?.original?.organizations?.email}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={styles?.invoiceInfo}>
            <Grid container spacing={'16px'}>
              <Grid item xs={4}>
                <Box sx={styles?.invoiceInfoTitle}>
                  Invoice No:{' '}
                  <Typography>
                    {isGetRowValues?.row?.original?.invoiceNo}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={styles?.invoiceInfoTitle}>
                  Invoice Date:{' '}
                  <Typography>
                    {isGetRowValues?.row?.original?.billingDate
                      ? new Date(
                          isGetRowValues?.row?.original?.billingDate,
                        ).toLocaleDateString('en-GB')
                      : 'Invalid Date'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={styles?.invoiceInfoTitle}>
                  Due Date:{' '}
                  <Typography>
                    {isGetRowValues?.row?.original?.dueDate
                      ? new Date(
                          isGetRowValues?.row?.original?.dueDate,
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
            <TanstackTable
              columns={columns}
              data={[isGetRowValues?.row?.original]}
            />
          </Box>

          {/* Voucher Card*/}
          <Box sx={styles?.voucher}>
            <Box sx={styles?.vRow}>
              <Box sx={styles?.vLabel}>
                Discount{' '}
                <Typography sx={{ fontWeight: '500', fontSize: '14px' }}>
                  ({isGetRowValues?.row?.original?.invoiceDiscount}%)
                </Typography>
              </Box>
              <Box sx={styles?.vValue}>
                (£ {isGetRowValues?.row?.original?.invoiceDiscount})
              </Box>
            </Box>
            <Box sx={styles?.vRow}>
              <Box sx={styles?.vLabel}>
                Tax{' '}
                <Typography sx={{ fontWeight: '400', fontSize: '12px' }}>
                  (Vat {isGetRowValues?.row?.original?.vat}%)
                </Typography>
              </Box>
              <Box sx={styles?.vValue}>
                £ {isGetRowValues?.row?.original?.vat}
              </Box>
            </Box>
            <Divider sx={{ borderColor: 'custom.off_white_one', my: '6px' }} />
            <Box sx={styles?.vRow}>
              <Box sx={styles?.vLabel}>Total Cost</Box>
              <Box sx={styles?.vValue}>
                £ {isGetRowValues?.row?.original?.total}
              </Box>
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

export default ViewInvoices;
