import { Box, Divider, Typography, useTheme } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { AirPlaneIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
import { useGetBillingHistoryQuery } from '@/services/superAdmin/billing-invoices';

const ViewBillingDetails = ({ isOpenDrawer, onClose, isGetRowValues }: any) => {
  const theme: any = useTheme();
  const { data: BillingDetailsHistory } = useGetBillingHistoryQuery<any>({
    pagination: `page=1&limit=2`,
    organizationPlanId: isGetRowValues?._id,
  });

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => onClose(false)}
      title={'Billing Details'}
      isOk
      footer={false}
    >
      {BillingDetailsHistory?.data?.invoices?.length > 0
        ? BillingDetailsHistory?.data?.invoices?.map((data: any) => (
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
                    {data?.plans?.description} ( {data?.details?.plantypes} )
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ textTransform: 'lowercase' }}
                  >
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
                    ? new Date(data.billingDate).toLocaleDateString('en-GB')
                    : 'Invalid Date'}
                </Typography>
                <Box sx={{ ml: 'auto' }}>
                  <Typography variant="caption">
                    Due Date:{' '}
                    {data?.dueDate
                      ? new Date(data.dueDate).toLocaleDateString('en-GB')
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
                  {data?.details?.additionalUsers} Additional Users (£ 15/user)
                </Typography>
                <Box sx={{ ml: 'auto' }}>
                  <Typography variant="overline">
                    £ {data?.details?.additionalUsers * 15}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: '15px' }}>
                <Typography variant="caption">
                  Additional Storage (£ 1/GB)
                </Typography>
                <Box sx={{ ml: 'auto' }}>
                  <Typography variant="overline">
                    £ {data?.details?.additionalStorage}
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
                    £ {data?.invoiceDiscount}
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
                  (Vat {data?.vat}%)
                </Typography>
                <Box sx={{ ml: 'auto' }}>
                  <Typography variant="overline">£ {data?.vat}</Typography>
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
                  <Typography variant="overline">{data?.total}</Typography>
                </Box>
              </Box>
            </Box>
          ))
        : 'No Billing History'}
    </CommonDrawer>
  );
};
export default ViewBillingDetails;
