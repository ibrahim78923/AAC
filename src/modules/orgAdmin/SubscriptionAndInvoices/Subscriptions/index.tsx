import React, { useState } from 'react';
import { Box, Grid, Skeleton } from '@mui/material';
import PlanCard from './PlanCard';
import BillingDetail from './BillingDetail';
import {
  ProductSalesIcon,
  ProductServiceIcon,
  ProductMarketingIcon,
  ProductOperationIcon,
  ProductLoyaltyProgramIcon,
  CrmSuiteIcon,
} from '@/assets/icons';
import {
  useGetSubscriptionsAllCrmWithSubscriptionsQuery,
  useGetSubscriptionsAndInvoicesQuery,
} from '@/services/orgAdmin/subscription-and-invoices';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

import { v4 as uuidv4 } from 'uuid';

export const getProductIcon = (product: any) => {
  let iconProduct;
  switch (product) {
    case 'Air Sales':
      iconProduct = <ProductSalesIcon />;
      break;
    case 'Air Services':
      iconProduct = <ProductServiceIcon />;
      break;
    case 'Air Marketer':
      iconProduct = <ProductMarketingIcon />;
      break;
    case 'Air Operations':
      iconProduct = <ProductOperationIcon />;
      break;
    case 'Loyalty Program':
      iconProduct = <ProductLoyaltyProgramIcon />;
      break;
    default:
      iconProduct = <></>;
  }
  return iconProduct;
};

const Subscriptions = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState('');

  const { data: getSubscriptionData, isLoading: loadingSubscriptionData } =
    useGetSubscriptionsAndInvoicesQuery({});
  const { data: getSubscriptionCRMData } =
    useGetSubscriptionsAllCrmWithSubscriptionsQuery({});

  const handleDrawerOpen = (id: any) => {
    setSubscriptionId(id);
    setIsOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setIsOpenDrawer(false);
  };

  return (
    <>
      {loadingSubscriptionData ? (
        <>
          <Grid
            container
            rowSpacing={'24px'}
            columnSpacing={{ xs: '24px', xl: '60px' }}
          >
            {[1, 2, 3, 4, 5]?.map(() => (
              <Grid item key={uuidv4()}>
                <Box sx={{ width: 480 }}>
                  <Skeleton variant="rectangular" height={300} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Grid
          container
          rowSpacing={'24px'}
          columnSpacing={{ xs: '24px', xl: '60px' }}
        >
          {getSubscriptionData?.data?.map((plan: any) => {
            return (
              <Grid item key={plan?.id} xs={12} md={6} lg={4}>
                <PlanCard
                  status={plan?.status}
                  icon={getProductIcon(plan?.name || plan?.productName)}
                  title={plan?.name || plan?.productName}
                  planDuration={plan?.planDuration}
                  planUsers={plan?.additionalUsers}
                  planData={plan?.billingCycle}
                  price={plan?.planData?.planPrice ?? 0}
                  billOn={dayjs(plan?.billingDate).format(DATE_FORMAT?.UI)}
                  type={plan?.planTypeName ?? plan?.plan}
                  handleBillingDetail={handleDrawerOpen}
                  id={plan?._id}
                  plan={plan}
                />
              </Grid>
            );
          })}
          {/* <Grid item  xs={12} md={6} lg={4}>
            CRMs
          </Grid> */}
          {getSubscriptionCRMData?.data?.map((plan: any) => {
            return (
              <Grid item key={plan?.id} xs={12} md={6} lg={4}>
                <PlanCard
                  status={plan?.status}
                  icon={<CrmSuiteIcon />}
                  title={plan?.name || plan?.planName}
                  planDuration={plan?.planDuration}
                  planUsers={plan?.additionalUsers}
                  planData={plan?.billingCycle}
                  price={plan?.planPrice || plan?.plans?.planPrice}
                  billOn={dayjs(plan?.billingDate).format(DATE_FORMAT?.UI)}
                  type={plan?.planTypeName ? plan?.planTypeName : 'Free Plan'}
                  handleBillingDetail={handleDrawerOpen}
                  id={plan?._id}
                  plan={plan}
                />
              </Grid>
            );
          })}
        </Grid>
      )}

      <BillingDetail
        open={isOpenDrawer}
        onClose={handleDrawerClose}
        subscriptionId={subscriptionId}
      />
    </>
  );
};

export default Subscriptions;
