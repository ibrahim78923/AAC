import React, { FC } from 'react';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { BillingDetailI } from './BillingDetail.interface';
import { AirPlaneIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
import { useGetInvoicesByIdQuery } from '@/services/orgAdmin/subscription-and-invoices';

const BillingDetail: FC<BillingDetailI> = ({
  open,
  onClose,
  subscriptionId,
}) => {
  const { data } = useGetInvoicesByIdQuery({ id: subscriptionId });
  const theme: any = useTheme();

  return (
    <CommonDrawer title="Billing Details" isDrawerOpen={open} onClose={onClose}>
      {data?.data?.invoices?.map((data: any) => (
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
                Air Sales ( {data?.details?.plantypes})
              </Typography>
              <Typography variant="body1">
                {data?.details?.billingCycle}
              </Typography>
            </Box>

            <Box sx={{ ml: 'auto' }}>
              <Typography
                variant="body3"
                sx={{
                  background:
                    data?.payment === 'pending'
                      ? theme?.palette?.warning?.main
                      : theme?.palette?.primary?.main,
                  borderRadius: '15px',
                  padding: '7px',
                  color: 'white',
                }}
              >
                {data?.payment ? data?.payment : 'Unpaid'}
              </Typography>
            </Box>
          </Box>
          <Divider />

          <Box sx={{ display: 'flex', alignItems: 'center', mt: '15px' }}>
            <Typography variant="caption">
              Invoice Date: {data?.details?.billingDate}
            </Typography>
            <Box sx={{ ml: 'auto' }}>
              <Typography variant="caption">
                Due Date: {data?.paymentDetailes?.dueDate}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mt: '15px' }}>
            <Typography variant="caption">Plan Price</Typography>
            <Box sx={{ ml: 'auto' }}>
              <Typography variant="overline">
                {data?.details?.plans?.planPrice}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: '15px' }}>
            <Typography variant="caption">
              {data?.details?.plans?.defaultUsers} Additional Users (£ 15/user)
            </Typography>
            <Box sx={{ ml: 'auto' }}>
              <Typography variant="overline">
                £
                {data?.details?.plans?.defaultUsers *
                  data?.details?.plans?.additionalPerUserPrice}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: '15px' }}>
            <Typography variant="caption">
              {data?.details?.plans?.defaultStorage} Additional Storage (£{' '}
              {data?.details?.plans?.additionalStoragePrice} /GB)
            </Typography>
            <Box sx={{ ml: 'auto' }}>
              <Typography variant="overline">
                £
                {data?.details?.plans?.defaultStorage *
                  data?.details?.plans?.additionalStoragePrice}
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
                {data?.paymentDetailes?.Discount}
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
                {data?.paymentDetailes?.Tax}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', alignItems: 'center', mt: '15px' }}>
            <Typography variant="overline" sx={{ textTransform: 'capitalize' }}>
              Total Cost{' '}
            </Typography>

            <Box sx={{ ml: 'auto' }}>
              <Typography variant="overline">{data?.totalCost}</Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </CommonDrawer>
  );
};

export default BillingDetail;
