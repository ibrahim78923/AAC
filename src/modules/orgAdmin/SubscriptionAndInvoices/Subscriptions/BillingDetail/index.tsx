import React, { FC } from 'react';
import {
  Box,
  Divider,
  LinearProgress,
  Typography,
  useTheme,
} from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { BillingDetailI } from './BillingDetail.interface';
import { AirPlaneIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
import { useGetInvoicesByIdQuery } from '@/services/orgAdmin/subscription-and-invoices';
import dayjs from 'dayjs';
import { DATE_FORMAT, PLAN_CALCULATIONS } from '@/constants';
import { useAppSelector } from '@/redux/store';
import usePlanCalculations from '../../usePlanCalculations';

const BillingDetail: FC<BillingDetailI> = ({
  open,
  onClose,
  subscriptionId,
}) => {
  const { data, status } = useGetInvoicesByIdQuery({ id: subscriptionId });

  const parsedManageData = useAppSelector(
    (state) => state?.subscriptionAndInvoices?.selectedPlanData,
  );

  const planCalculations = usePlanCalculations({
    additionalDefaultUser: parsedManageData?.additionalUsers,
    additionalDefaultStorage: parsedManageData?.additionalStorage,
    additionalUserPrice: parsedManageData?.planData?.additionalPerUserPrice,
    additionalStoragePrice: parsedManageData?.planData?.additionalStoragePrice,
    planDefaultPrice:
      parsedManageData?.planData?.planPrice ||
      parsedManageData?.planPrice ||
      parsedManageData?.plans?.planPrice,
    planDefaultDiscount: parsedManageData?.planDiscount,
    PLAN_CALCULATIONS,
  });

  return (
    <CommonDrawer title="Billing Details" isDrawerOpen={open} onClose={onClose}>
      {status === 'pending' ? (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      ) : (
        <>
          {data?.data?.invoices?.length ? (
            <>
              {data?.data?.invoices?.map((data: any) => {
                const planDiscount = data?.details?.planDiscount;
                const subbTotal =
                  data?.details?.plans?.planPrice +
                  planCalculations?.additionalUsers +
                  planCalculations?.additionalStorage;
                const subTotalAfterDiscount =
                  subbTotal - (planDiscount / 100) * subbTotal;

                const discount = (planDiscount / 100) * subbTotal;

                const taxPercent = PLAN_CALCULATIONS?.PLAN_DISCOUNT;
                const taxAmount = taxPercent * subTotalAfterDiscount;

                const NetAmount =
                  Number(subTotalAfterDiscount) + Number(taxAmount);

                return (
                  <>
                    <Box key={uuidv4()}>
                      <InvoiceCard
                        productName={parsedManageData?.productName}
                        planType={data?.details?.plantypes}
                        billingCycle={''}
                        payment={data?.payment}
                        billingDate={data?.billingDate}
                        dueDate={data?.dueDate}
                        planPrice={data?.details?.plans?.planPrice}
                        defaultUsers={parsedManageData?.planData?.defaultUsers}
                        defaultStorage={
                          parsedManageData?.planData?.defaultStorage
                        }
                        additionalUser={parsedManageData?.additionalUsers}
                        additionalStorage={parsedManageData?.additionalStorage}
                        additionalPerUserPrice={planCalculations?.perUserPrice}
                        additionalStoragePrice={
                          planCalculations?.perStoragePrice
                        }
                        calculatedUserPrice={planCalculations?.additionalUsers}
                        calculatedStoragePrice={
                          planCalculations?.additionalStorage
                        }
                        planDiscount={planDiscount}
                        discount={discount.toFixed(2)}
                        tax={taxAmount.toFixed(2)}
                        subTotal={subTotalAfterDiscount.toFixed(2)}
                        totalCost={NetAmount.toFixed(2)}
                      />
                    </Box>
                  </>
                );
              })}
            </>
          ) : (
            <>
              <InvoiceCard
                productName={parsedManageData?.productName}
                planType={parsedManageData?.planTypeName}
                billingCycle={parsedManageData?.billingCycle}
                payment={''}
                billingDate={parsedManageData?.billingDate}
                dueDate={''}
                planPrice={parsedManageData?.planData?.planPrice}
                defaultUsers={parsedManageData?.planData?.defaultUsers}
                defaultStorage={parsedManageData?.planData?.defaultStorage}
                additionalUser={parsedManageData?.additionalUsers}
                additionalStorage={parsedManageData?.additionalStorage}
                additionalPerUserPrice={planCalculations?.perUserPrice}
                additionalStoragePrice={planCalculations?.perStoragePrice}
                calculatedUserPrice={planCalculations?.additionalUsers}
                calculatedStoragePrice={planCalculations?.additionalStorage}
                planDiscount={planCalculations?.planDiscount}
                discount={planCalculations?.discountApplied}
                tax={planCalculations?.taxAmount}
                totalCost={planCalculations?.finalPrice}
              />
            </>
          )}
        </>
      )}
    </CommonDrawer>
  );
};

const InvoiceCard = ({
  productName,
  planType,
  billingCycle,
  payment,
  billingDate,
  dueDate,
  planPrice,

  additionalUser,
  additionalStorage,

  additionalPerUserPrice,
  additionalStoragePrice,

  calculatedUserPrice,
  calculatedStoragePrice,

  planDiscount,
  discount,
  tax,
  totalCost,
  subTotal,
}: any) => {
  const theme = useTheme();
  return (
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
            background: theme?.palette?.primary?.light,
            padding: '5px 8px',
            marginRight: '13px',
          }}
        >
          <AirPlaneIcon />
        </Box>
        <Box>
          <Typography variant="overline" sx={{ textTransform: 'capitalize' }}>
            {productName} ( {planType})
          </Typography>
          <Typography variant="body1">{billingCycle}</Typography>
        </Box>

        <Box sx={{ ml: 'auto' }}>
          <Typography
            variant="body3"
            sx={{
              background:
                payment === 'pending'
                  ? theme?.palette?.warning?.main
                  : theme?.palette?.primary?.main,
              borderRadius: '15px',
              padding: '7px',
              color: 'white',
            }}
          >
            {payment ? payment : 'Unpaid'}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', alignItems: 'center', mt: '15px' }}>
        <Typography variant="caption">
          Invoice Date: {dayjs(billingDate).format(DATE_FORMAT?.UI)}
        </Typography>
        <Box sx={{ ml: 'auto' }}>
          <Typography variant="caption">Due Date: {dueDate}</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: '15px' }}>
        <Typography variant="caption">Plan Price</Typography>
        <Box sx={{ ml: 'auto' }}>
          <Typography variant="overline">£{planPrice}</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: '15px' }}>
        <Typography variant="caption">
          {additionalUser} Additional Users (£
          {additionalPerUserPrice}/user)
        </Typography>
        <Box sx={{ ml: 'auto' }}>
          <Typography variant="overline">£{calculatedUserPrice}</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: '15px' }}>
        <Typography variant="caption">
          {additionalStorage} Additional Storage (£ {additionalStoragePrice}{' '}
          /GB)
        </Typography>
        <Box sx={{ ml: 'auto' }}>
          <Typography variant="overline">£{calculatedStoragePrice}</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: '15px' }}>
        <Typography variant="caption">
          <Typography variant="overline" sx={{ textTransform: 'capitalize' }}>
            Discount{' '}
          </Typography>{' '}
          ({planDiscount}%)
        </Typography>
        <Box sx={{ ml: 'auto' }}>
          <Typography variant="overline">{discount}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: '15px' }}>
        <Typography variant="caption">
          <Typography variant="overline" sx={{ textTransform: 'capitalize' }}>
            <em>Sub Total</em>
          </Typography>{' '}
        </Typography>
        <Box sx={{ ml: 'auto' }}>
          <Typography variant="overline">{subTotal}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', my: '15px' }}>
        <Typography variant="caption">
          <Typography variant="overline" sx={{ textTransform: 'capitalize' }}>
            Tax{' '}
          </Typography>{' '}
          (Vat 20%)
        </Typography>
        <Box sx={{ ml: 'auto' }}>
          <Typography variant="overline">{tax}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', alignItems: 'center', mt: '15px' }}>
        <Typography variant="overline" sx={{ textTransform: 'capitalize' }}>
          Total Cost{' '}
        </Typography>

        <Box sx={{ ml: 'auto' }}>
          <Typography variant="overline">£{totalCost}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BillingDetail;
