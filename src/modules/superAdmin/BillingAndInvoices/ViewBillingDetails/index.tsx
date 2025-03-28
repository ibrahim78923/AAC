import { Box, Divider, Skeleton, Typography, useTheme } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { AirPlaneIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
import { useGetBillingHistoryQuery } from '@/services/superAdmin/billing-invoices';
import { isNullOrEmpty } from '@/utils';
import { useGetTaxCalculationsQuery } from '@/services/airSales/quotes';

const ViewBillingDetails = ({ isOpenDrawer, onClose, isGetRowValues }: any) => {
  const theme: any = useTheme();
  const orginzationPlanId = isGetRowValues?._id;
  const paramsObj: any = {};
  if (!isNullOrEmpty(orginzationPlanId))
    paramsObj['organizationPlanId'] = orginzationPlanId;

  const queryParams = Object.entries(paramsObj)
    .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
    .join('&');
  const query = `&${queryParams}`;
  const { data: BillingDetailsHistory, isLoading } =
    useGetBillingHistoryQuery<any>({
      params: query,
      pagination: `page=1&limit=10`,
    });
  const param = {
    applyOn: 'invoice',
  };
  const { data: taxCalculation } = useGetTaxCalculationsQuery(param);

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => onClose(false)}
      title={'Billing Details'}
      isOk
      footer={false}
    >
      {isLoading ? (
        <Skeleton variant="rounded" width="100%" height={300} />
      ) : BillingDetailsHistory?.data?.invoices?.length > 0 ? (
        BillingDetailsHistory?.data?.invoices?.map((data: any) => (
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
                  {data?.plans?.products[0]?.name} ( {data?.details?.plantypes}{' '}
                  )
                </Typography>
                <Typography variant="body1" sx={{ textTransform: 'lowercase' }}>
                  paid {data?.details?.billingCycle}
                </Typography>
              </Box>

              <Box sx={{ ml: 'auto' }}>
                <Typography
                  variant="body3"
                  sx={{
                    background:
                      data?.status === 'pending'
                        ? theme?.palette?.warning?.main
                        : theme?.palette?.primary?.main,
                    borderRadius: '15px',
                    padding: '7px',
                    color: 'white',
                  }}
                >
                  {data?.status}
                </Typography>
              </Box>
            </Box>
            <Divider />

            <Box sx={{ display: 'flex', alignItems: 'center', mt: '15px' }}>
              <Typography variant="caption">
                Invoice Date:{' '}
                {data?.billingDate
                  ? new Date(data?.billingDate)?.toLocaleDateString('en-GB')
                  : 'Invalid Date'}
              </Typography>
              <Box sx={{ ml: 'auto' }}>
                <Typography variant="caption">
                  Due Date:{' '}
                  {data?.dueDate
                    ? new Date(data?.dueDate)?.toLocaleDateString('en-GB')
                    : 'Invalid Date'}
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
                {data?.details?.additionalUsers} Additional Users (£{' '}
                {data?.details?.plans?.additionalPerUserPrice}/user)
              </Typography>
              <Box sx={{ ml: 'auto' }}>
                <Typography variant="overline">
                  £{' '}
                  {data?.details?.additionalUsers *
                    data?.details?.plans?.additionalPerUserPrice}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: '15px' }}>
              <Typography variant="caption">
                {data?.details?.additionalStorage} Additional Storage (£{' '}
                {data?.details?.plans?.additionalStoragePrice}/GB)
              </Typography>
              <Box sx={{ ml: 'auto' }}>
                <Typography variant="overline">
                  £{' '}
                  {data?.details?.additionalStorage *
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
                ({data?.invoiceDiscount}%)
              </Typography>
              <Box sx={{ ml: 'auto' }}>
                <Typography variant="overline">
                  £{' '}
                  {(
                    (data?.invoiceDiscount / 100) *
                    data?.details?.subTotal
                  )?.toFixed(2)}
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
                (Vat {data?.tax}%)
              </Typography>
              <Box sx={{ ml: 'auto' }}>
                <Typography variant="overline">
                  £
                  {(
                    (data?.tax / 100) *
                      (data?.plans?.planPrice +
                        data?.details?.sumAdditionalUsersPrices +
                        data?.details?.sumAdditionalStoragePrices -
                        (data?.details?.planDiscount / 100) *
                          (data?.plans?.planPrice +
                            data?.details?.sumAdditionalUsersPrices +
                            data?.details?.sumAdditionalStoragePrices)) -
                    (data?.invoiceDiscount / 100) *
                      (data?.plans?.planPrice +
                        data?.details?.sumAdditionalUsersPrices +
                        data?.details?.sumAdditionalStoragePrices -
                        (data?.details?.planDiscount / 100) *
                          (data?.plans?.planPrice +
                            data?.details?.sumAdditionalUsersPrices +
                            data?.details?.sumAdditionalStoragePrices))
                  )?.toFixed(2)}
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: '15px' }}>
              <Typography
                variant="overline"
                sx={{ textTransform: 'capitalize' }}
              >
                Total Cost{' '}
              </Typography>

              <Box sx={{ ml: 'auto' }}>
                <Typography variant="overline">
                  {data?.netAmount?.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))
      ) : (
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
                {isGetRowValues?.planProducts[0]?.name} ({' '}
                {isGetRowValues?.plantypes?.name} )
              </Typography>
              <Typography variant="body1" sx={{ textTransform: 'lowercase' }}>
                {isGetRowValues?.billingCycle}
              </Typography>
            </Box>
          </Box>
          <Divider />

          <Box sx={{ display: 'flex', alignItems: 'center', mt: '15px' }}>
            <Typography variant="caption">
              Invoice Date:{' '}
              {isGetRowValues?.billingDate
                ? new Date(isGetRowValues?.billingDate)?.toLocaleDateString(
                    'en-GB',
                  )
                : 'Invalid Date'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mt: '15px' }}>
            <Typography variant="caption">Plan Price</Typography>
            <Box sx={{ ml: 'auto' }}>
              <Typography variant="overline">
                £ {isGetRowValues?.plans?.planPrice}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: '15px' }}>
            <Typography variant="caption">
              {isGetRowValues?.additionalUsers ?? 0} Additional Users (£{' '}
              {isGetRowValues?.plans?.additionalPerUserPrice ?? 0}/user)
            </Typography>
            <Box sx={{ ml: 'auto' }}>
              <Typography variant="overline">
                £{' '}
                {isGetRowValues?.additionalUsers *
                  isGetRowValues?.plans?.additionalPerUserPrice}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: '15px' }}>
            <Typography variant="caption">
              {isGetRowValues?.additionalStorage ?? 0} Additional Storage (£{' '}
              {isGetRowValues?.plans?.additionalStoragePrice ?? 0}/GB)
            </Typography>
            <Box sx={{ ml: 'auto' }}>
              <Typography variant="overline">
                £{' '}
                {isGetRowValues?.additionalStorage *
                  isGetRowValues?.plans?.additionalStoragePrice}
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
              {isGetRowValues?.planDiscount ?? 0} %
            </Typography>
            <Box sx={{ ml: 'auto' }}>
              <Typography variant="overline">
                £{' '}
                {(isGetRowValues?.planDiscount / 100) *
                  isGetRowValues?.subtotal}
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
              (Vat {taxCalculation?.data ?? 0} %)
            </Typography>
            <Box sx={{ ml: 'auto' }}>
              <Typography variant="overline">
                £ {(taxCalculation?.data / 100) * isGetRowValues?.total}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', alignItems: 'center', mt: '15px' }}>
            <Typography variant="overline" sx={{ textTransform: 'capitalize' }}>
              Total Cost{' '}
            </Typography>

            <Box sx={{ ml: 'auto' }}>
              <Typography variant="overline">
                £{' '}
                {(taxCalculation?.data / 100) * isGetRowValues?.total +
                  isGetRowValues?.total}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </CommonDrawer>
  );
};
export default ViewBillingDetails;
