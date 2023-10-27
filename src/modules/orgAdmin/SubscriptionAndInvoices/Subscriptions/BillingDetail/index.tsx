import React, { FC } from 'react';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { BillingDetailI } from './BillingDetail.interface';
import { AirPlaneIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';

const BillingDetail: FC<BillingDetailI> = ({ open, onClose }) => {
  const theme: any = useTheme();
  const DataArr = [
    {
      bilingType: 'Growth',
      paymentType: 'paid Monthly',
      payment: 'pending',
      paymentDetailes: {
        invoiceDate: '01/01/2023',
        dueDate: '6/01/2023',
        planPrice: '£ 20',
        additionalUser: '£ 45',
        AdditionalStorage: '£ 1',
        Discount: '£ 10',
        Tax: '£ 27',
      },
      totalCost: '£ 158',
    },
    {
      bilingType: 'Basic',
      paymentType: 'paid Monthly',
      payment: 'Paid',
      paymentDetailes: {
        invoiceDate: '01/01/2023',
        dueDate: '6/01/2023',
        planPrice: '£ 20',
        additionalUser: '£ 45',
        AdditionalStorage: '£ 1',
        Discount: '£ 10',
        Tax: '£ 27',
      },
      totalCost: '£ 158',
    },
  ];

  return (
    <CommonDrawer title="Billing Details" isDrawerOpen={open} onClose={onClose}>
      {DataArr.map((data: any) => (
        <Box
          key={uuidv4()}
          sx={{
            boxShadow: '0px 3px 6px 0px rgba(107, 114, 128, 0.10)',
            padding: '10px',
            borderRadius: '8px',
            marginBottom: '15px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', my: '15px' }}>
            <Box
              sx={{
                background: theme?.palette?.primary?.lighter,
                padding: '5px 8px',
                marginRight: '13px',
              }}
            >
              <AirPlaneIcon />
            </Box>
            <Box>
              <Typography
                variant="overline"
                sx={{ textTransform: 'capitalize' }}
              >
                Air Sales ( {data.bilingType})
              </Typography>
              <Typography variant="body1">{data.paymentType}</Typography>
            </Box>

            <Box sx={{ ml: 'auto' }}>
              <Typography
                variant="body3"
                sx={{
                  background:
                    data.payment === 'pending'
                      ? theme?.palette?.warning?.main
                      : theme?.palette?.primary?.main,
                  borderRadius: '15px',
                  padding: '7px',
                  color: 'white',
                }}
              >
                {data.payment}
              </Typography>
            </Box>
          </Box>
          <Divider />

          <Box sx={{ display: 'flex', alignItems: 'center', mt: '15px' }}>
            <Typography variant="caption">
              Invoice Date: {data.paymentDetailes.invoiceDate}
            </Typography>
            <Box sx={{ ml: 'auto' }}>
              <Typography variant="caption">
                Due Date: {data.paymentDetailes.dueDate}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mt: '15px' }}>
            <Typography variant="caption">Plan Price</Typography>
            <Box sx={{ ml: 'auto' }}>
              <Typography variant="overline">
                {data.paymentDetailes.planPrice}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: '15px' }}>
            <Typography variant="caption">
              3 Additional Users (£ 15/user)
            </Typography>
            <Box sx={{ ml: 'auto' }}>
              <Typography variant="overline">
                {data.paymentDetailes.additionalUser}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: '15px' }}>
            <Typography variant="caption">
              Additional Storage (£ 1/GB)
            </Typography>
            <Box sx={{ ml: 'auto' }}>
              <Typography variant="overline">
                {data.paymentDetailes.AdditionalStorage}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mt: '15px' }}>
            <Typography variant="caption">
              <Typography
                variant="overline"
                sx={{ textTransform: 'capitalize' }}
              >
                Discount{' '}
              </Typography>{' '}
              (10%)
            </Typography>
            <Box sx={{ ml: 'auto' }}>
              <Typography variant="overline">
                {data.paymentDetailes.Discount}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', my: '15px' }}>
            <Typography variant="caption">
              <Typography
                variant="overline"
                sx={{ textTransform: 'capitalize' }}
              >
                Tax{' '}
              </Typography>{' '}
              (Vat 20%)
            </Typography>
            <Box sx={{ ml: 'auto' }}>
              <Typography variant="overline">
                {data.paymentDetailes.Tax}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', alignItems: 'center', mt: '15px' }}>
            <Typography variant="overline" sx={{ textTransform: 'capitalize' }}>
              Total Cost{' '}
            </Typography>

            <Box sx={{ ml: 'auto' }}>
              <Typography variant="overline">{data.totalCost}</Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </CommonDrawer>
  );
};

export default BillingDetail;
