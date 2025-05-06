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
  Tooltip,
} from '@mui/material';
import {
  InvoiceDataI,
  PlanCellInfoI,
  ViewInvoicesI,
} from './ViewInvoices.interface';
import { CloseModalIcon } from '@/assets/icons';
import { styles } from './ViewInvoices.style';
import TanstackTable from '@/components/Table/TanstackTable';
import { AvatarImage } from '@/assets/images';
import { v4 as uuidv4 } from 'uuid';
import jsPDF from 'jspdf';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import html2canvas from 'html2canvas';
import { useTheme } from '@emotion/react';
import { PROJECT_NAME } from '@/config';
import { SmallLogoAvatar } from '@/components/Avatars/SmallLogoAvatar';

const ViewInvoices: FC<ViewInvoicesI> = ({ open, onClose, isGetRowValues }) => {
  const theme = useTheme();
  let planPrice: number = 0;

  let totalAdditionalUserPrice: number = 0;

  let totalAdditionalStoragePrice: number = 0;

  let planDiscount: number = 0;

  let subtotalBeforeDiscount: number = 0;

  let subtotalAfterDiscount: number = 0;

  let invoiceDiscount: number = 0;

  let total: number = 0;

  let tax: number = 0;

  let netAmout: number = 0;
  let invoiceDiscountAmount: number = 0;
  let TaxAmountOfSubtotal: number = 0;

  const columns = (data: any) => {
    planPrice = data?.plans?.planPrice;

    totalAdditionalUserPrice = data?.details?.sumAdditionalUsersPrices;

    totalAdditionalStoragePrice = data?.details?.sumAdditionalStoragePrices;

    planDiscount = data?.details?.planDiscount;

    subtotalBeforeDiscount =
      planPrice + totalAdditionalUserPrice + totalAdditionalStoragePrice;

    subtotalAfterDiscount =
      subtotalBeforeDiscount - (planDiscount / 100) * subtotalBeforeDiscount;

    invoiceDiscount = data?.invoiceDiscount;

    invoiceDiscountAmount = (invoiceDiscount / 100) * data?.details?.subTotal;

    total =
      subtotalAfterDiscount - (invoiceDiscount / 100) * subtotalAfterDiscount;

    tax = data?.tax;
    TaxAmountOfSubtotal = (tax / 100) * total;

    netAmout = data?.netAmount;

    return [
      {
        accessorFn: (row: InvoiceDataI) => row?.id,
        id: 'srNumber',
        cell: () => '1',
        header: 'Sr#',
        isSortable: false,
      },
      {
        accessorFn: (row: InvoiceDataI) => row?.products,
        id: 'product',
        cell: (info: PlanCellInfoI) => {
          const planProducts = info?.row?.original?.plans?.products;
          const tooltipTitle = (
            <Box>
              {planProducts?.map((data: any) => (
                <Typography key={uuidv4()} variant="h6">
                  {data?.name}
                </Typography>
              ))}
            </Box>
          );
          return (
            <>
              {info?.row?.original?.plans?.isCRM ? (
                <>
                  <Tooltip title={tooltipTitle}>
                    <>
                      <Typography variant="body3" sx={{ cursor: 'pointer' }}>
                        {info?.row?.original?.plans?.name}
                      </Typography>{' '}
                      &nbsp;
                      <Typography
                        variant="body3"
                        fontSize={'11px'}
                        style={{
                          background: theme?.palette?.primary?.main,
                          color: 'white',
                          padding: '2px 6px',
                          borderRadius: '5px',
                          width: 'fit-content',
                        }}
                      >
                        CRM
                      </Typography>
                    </>
                  </Tooltip>
                </>
              ) : (
                info?.row?.original?.plans?.products?.map((data: any) => (
                  <Typography variant="body3" key={uuidv4()}>
                    {data?.name}{' '}
                  </Typography>
                ))
              )}
              <br />
              <Typography variant="body3">
                ({info?.row?.original?.plantypes})
              </Typography>
            </>
          );
        },
        header: 'Product/Suite',
        isSortable: true,
      },
      {
        accessorFn: (row: InvoiceDataI) => row?.details?.plans?.planPrice,
        id: 'planPrice',
        isSortable: true,
        header: 'Plan Price',
        cell: () => <>£ {planPrice}</>,
      },
      {
        accessorFn: (row: InvoiceDataI) => row?.details?.additionalUsers,
        id: 'additionalUsers',
        isSortable: true,
        header: 'Additional Users',
        cell: (info: PlanCellInfoI) => (
          <>
            {info?.getValue()} *(£
            {info?.row?.original?.plans?.additionalPerUserPrice}) = £{' '}
            {totalAdditionalUserPrice}
          </>
        ),
      },
      {
        accessorFn: (row: InvoiceDataI) => row?.details?.additionalStorage,
        id: 'additionalStorage',
        isSortable: true,
        header: 'Additional Storage',
        cell: (info: any) => (
          <>
            {info?.getValue()} *(£
            {info?.row?.original?.plans?.additionalStoragePrice}) = £
            {totalAdditionalStoragePrice}
          </>
        ),
      },
      {
        accessorFn: (row: InvoiceDataI) => row?.details?.planDiscount,
        id: 'discount',
        isSortable: true,
        header: 'Discount(%)',
        cell: (info: any) => (
          <Box sx={{ fontWeight: '800' }}>{info?.getValue()} %</Box>
        ),
      },
      {
        accessorFn: (row: InvoiceDataI) => row?.subTotal,
        id: 'subTotal',
        isSortable: true,
        header: 'Subtotal',
        cell: () => (
          <Box sx={{ fontWeight: '800' }}>£ {subtotalAfterDiscount}</Box>
        ),
      },
    ];
  };
  const handleDownload = () => {
    const invoiceElement = document.querySelector('#invoice-data');
    const downloadButton = document.querySelector('#download-button');

    if (downloadButton) {
      // Hide the download button
      downloadButton.style.display = 'none';
    }

    html2canvas(invoiceElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('portrait', 'pt', 'a4');
      const imgWidth = 595.28;
      const pageHeight = 841.89;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('invoice.pdf');
      if (downloadButton) {
        // Show the download button again
        downloadButton.style.display = 'inline-flex';
      }
      onClose();
    });
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
                <SmallLogoAvatar />
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
                  {PROJECT_NAME}
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
                    {dayjs(isGetRowValues?.row?.original?.billingDate)?.format(
                      DATE_FORMAT?.UI,
                    )}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={styles?.invoiceInfoTitle}>
                  Due Date:{' '}
                  <Typography>
                    {dayjs(isGetRowValues?.row?.original?.dueDate)?.format(
                      DATE_FORMAT?.UI,
                    )}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Product Table */}
          <Box sx={styles?.productCont}>
            <Box sx={styles?.productHeading}>Products</Box>
            <TanstackTable
              columns={columns(isGetRowValues?.row?.original)}
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
                (£ {invoiceDiscountAmount?.toFixed(2)})
              </Box>
            </Box>
            <Box sx={styles?.vRow}>
              <Box sx={styles?.vLabel}>
                Tax{' '}
                <Typography sx={{ fontWeight: '400', fontSize: '12px' }}>
                  ({tax}%)
                </Typography>
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
            <Button
              id="download-button"
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
