import React, { FC, useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Radio,
} from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { PaymentMethodIcon, PaymentMethodVisaIcon } from '@/assets/icons';
import { PayInvoiceI } from './PayInvoice.interface';
import { styles } from './PayInvoice.style';
import {
  useGetPaymentCardQuery,
  useGetSingleInvoicesByIdQuery,
  usePostPayInvoiceMutation,
} from '@/services/orgAdmin/subscription-and-invoices';
import { isNullOrEmpty } from '@/utils';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { useTheme } from '@emotion/react';
import Loader from '@/components/Loader';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

const PayInvoice: FC<PayInvoiceI> = ({ open, onClose, invoiceId }) => {
  const theme = useTheme();
  const [selectedValue, setSelectedValue] = useState('');
  const handleChange = (value: any) => {
    setSelectedValue(value?._id);
  };

  const { data } = useGetSingleInvoicesByIdQuery(
    { id: invoiceId },
    { skip: isNullOrEmpty(invoiceId) },
  );

  const { data: dataPaymentCard, isLoading: loadingPaymentCard } =
    useGetPaymentCardQuery({}, { skip: isNullOrEmpty(invoiceId) });

  const [postPayNow, { isLoading: PostPayNowLoading }] =
    usePostPayInvoiceMutation();

  const handleSubmit = async () => {
    if (isNullOrEmpty(selectedValue)) {
      errorSnackbar('Please select card');
    } else {
      try {
        await postPayNow({
          invoiceId: invoiceId,
          paymentId: selectedValue,
        })?.unwrap();
        successSnackbar('Pay Successful');
        onClose();
      } catch (error: any) {
        errorSnackbar('something went wrong');
      }
    }
  };

  return (
    <CommonDrawer
      title="Pay Invoice"
      isDrawerOpen={open}
      onClose={onClose}
      footer={true}
      okText={'Pay Invoice'}
      isOk={true}
      cancelText={'Canel'}
      submitHandler={handleSubmit}
      isLoading={PostPayNowLoading}
    >
      <Box
        display={'flex'}
        justifyContent="space-between"
        sx={styles?.invoiceDetailsTitle}
      >
        <Typography display={'flex'} alignItems={'center'}>
          <Box fontWeight={'bold'}>Invoice#: </Box> {data?.data?.invoiceNo}
        </Typography>
        <Typography
          sx={{
            ...styles?.planActiveChip,
            backgroundColor:
              data?.data?.status === 'PAID'
                ? 'success.lighter'
                : theme?.palette?.custom?.warning_light,
          }}
          variant="body1"
        >
          {data?.data?.status?.charAt(0)?.toUpperCase() +
            data?.data?.status?.slice(1)?.toLowerCase()}
        </Typography>
      </Box>
      <Box sx={styles?.iRow}>
        <Box sx={styles?.iCellHead}>
          {data?.data?.details?.plans?.name} Plan
        </Box>
        <Box sx={styles?.iCellHead}>
          £ {data?.data?.details?.plans?.planPrice}
        </Box>
      </Box>

      <Box sx={{ mt: '8px' }}>
        <Box sx={styles?.iCell}>
          {dayjs(data?.data?.billingFrom)?.format(DATE_FORMAT?.UI)} to{' '}
          {dayjs(data?.data?.billingDate)?.format(DATE_FORMAT?.UI)}
        </Box>
      </Box>

      <Box sx={{ mt: '8px' }}>
        <Box sx={styles?.iRow}>
          <Box sx={styles?.iCell}>
            Additional Users (
            {data?.data?.details?.calculations?.additionalUsers} users/£{' '}
            {data?.data?.details?.calculations?.perDayPerUserPrice} per day){' '}
          </Box>
          <Box sx={styles?.iCellHead}>
            £ {data?.data?.details?.calculations?.sumOfUserPrice}
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: '8px' }}>
        <Box sx={styles?.iRow}>
          <Box sx={styles?.iCell}>
            Additional Storage (
            {data?.data?.details?.calculations?.additionalStorage} gb/£{' '}
            {data?.data?.details?.calculations?.perDayPerStoragePrice} per day)
          </Box>
          <Box sx={styles?.iCellHead}>
            £ {data?.data?.details?.calculations?.sumOfStoragePrice}
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: '8px' }}>
        <Box sx={styles?.iRow}>
          <Box sx={styles?.iCell}>Price Before Discount</Box>
          <Box sx={styles?.iCellHead}>
            £{' '}
            {data?.data?.details?.calculations?.subTotalBeforeDiscount?.toFixed(
              2,
            )}
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: '8px' }}>
        <Box sx={styles?.iRow}>
          <Box sx={styles?.iCell}>
            Plan Discount (
            {data?.data?.details?.calculations?.planDiscountPercentage}%)
          </Box>
          <Box sx={styles?.iCellHead}>
            £{' '}
            {data?.data?.details?.calculations?.planDiscountAmount?.toFixed(2)}
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: '8px' }}>
        <Box sx={styles?.iRow}>
          <Box sx={styles?.iCell} fontWeight={'bold'}>
            Sub total
          </Box>
          <Box sx={styles?.iCellHead}>
            £ {data?.data?.details?.calculations?.subTotal?.toFixed(2)}
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: '8px' }}>
        <Box sx={styles?.iRow}>
          <Box sx={styles?.iCell}>
            Invoice Discount (
            {data?.data?.details?.calculations?.invoiceDiscountPercentage}%)
          </Box>
          <Box sx={styles?.iCellHead}>
            £{' '}
            {data?.data?.details?.calculations?.invoiceDiscountAmount?.toFixed(
              2,
            )}
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: '8px' }}>
        <Box sx={styles?.iRow}>
          <Box sx={styles?.iCell}>Payable</Box>
          <Box sx={styles?.iCellHead}>
            £ {data?.data?.details?.calculations?.payable}
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: '8px' }}>
        <Box sx={styles?.iRow}>
          <Box sx={styles?.iCell}>Adjusted Amount</Box>
          <Box sx={styles?.iCellHead}>
            £ {data?.data?.details?.calculations?.alreadyPaid}
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: '8px' }}>
        <Box sx={styles?.iRow}>
          <Box sx={styles?.iCell} fontWeight={'bold'}>
            Total
          </Box>
          <Box sx={styles?.iCellHead}>
            £ {data?.data?.details?.calculations?.total?.toFixed(2)}
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: '8px' }}>
        <Box sx={styles?.iRow}>
          <Box sx={styles?.iCell}>
            Vat. ({data?.data?.details?.calculations?.taxPercentage}%)
          </Box>
          <Box sx={styles?.iCellHead}>
            £ {data?.data?.details?.calculations?.taxAmount?.toFixed(2)}
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: '16px', borderColor: '#D1D5DB' }} />

      <Box sx={styles?.iRow}>
        <Box sx={styles?.iCell} fontWeight={'bold'}>
          Net Amount
        </Box>
        <Box sx={styles?.iCellHead}>
          £ {data?.data?.details?.calculations?.netAmount?.toFixed(2)}
        </Box>
      </Box>

      <Divider sx={{ mt: '24px', mb: '20px', borderColor: '#D1D5DB' }} />

      <Box sx={styles?.iCellHead}>Primary company address</Box>
      <Box sx={{ mt: '8px' }}>
        {data?.data?.organizations?.address?.street},{' '}
        {data?.data?.organizations?.address?.city},{' '}
        {data?.data?.organizations?.address?.state},{' '}
        {data?.data?.organizations?.address?.postalCode}
      </Box>

      <Box sx={{ mt: '20px' }}>
        <Box sx={styles?.iCellHead}>Payment Methods</Box>

        <List sx={styles?.paymentMethods}>
          {loadingPaymentCard ? (
            <Loader />
          ) : (
            dataPaymentCard?.data?.payments?.map((value: any) => {
              return (
                <ListItem
                  key={value}
                  secondaryAction={
                    value?.brand === 'Visa' ? (
                      <PaymentMethodVisaIcon />
                    ) : (
                      <PaymentMethodIcon />
                    )
                  }
                  disablePadding
                >
                  <ListItemButton dense>
                    <ListItemIcon>
                      <Radio
                        checked={selectedValue === value?._id}
                        onChange={() => handleChange(value)}
                        value={value}
                        name="paymentMethod"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <>
                          <Box>
                            {value?.cardHolderName}
                            <br /> XXXX-XXXX-XXXX-{value?.last4} &nbsp;
                            {value?.isDefault && (
                              <span
                                style={{
                                  color: theme?.palette?.common?.white,
                                  backgroundColor:
                                    theme?.palette?.primary?.main,
                                  width: 'fit-content',
                                  padding: '3px 7px',
                                  borderRadius: '5px',
                                }}
                              >
                                Default
                              </span>
                            )}
                            <br /> {value?.expMonth}/{value?.expYear}
                          </Box>
                        </>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              );
            })
          )}
        </List>
      </Box>
    </CommonDrawer>
  );
};

export default PayInvoice;
