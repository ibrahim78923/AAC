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
import { DATE_FORMAT, PLAN_PRICE_TYPE_TAGS, PRODUCT_LABELS } from '@/constants';
import dayjs from 'dayjs';

import { v4 as uuidv4 } from 'uuid';
import { PlanCRMI, PlanI } from './subscriptions.interface';
import ProductCallCenterIcon from '@/assets/icons/modules/orgAdmin/SubscriptionAndInvoices/product-call-center-icon';

export const getProductIcon = (product: string) => {
  let iconProduct;
  switch (product) {
    case PRODUCT_LABELS?.AIR_SALES:
      iconProduct = <ProductSalesIcon />;
      break;
    case PRODUCT_LABELS?.AIR_SERVICES:
      iconProduct = <ProductServiceIcon />;
      break;
    case PRODUCT_LABELS?.AIR_MARKETER:
      iconProduct = <ProductMarketingIcon />;
      break;
    case PRODUCT_LABELS?.AIR_OPERATIONS:
      iconProduct = <ProductOperationIcon />;
      break;
    case PRODUCT_LABELS?.LOYALTY_PROGRAM:
      iconProduct = <ProductLoyaltyProgramIcon />;
      break;
    case PRODUCT_LABELS?.CALL_CENTER:
      iconProduct = <ProductCallCenterIcon />;
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

  const handleDrawerOpen = (id: string) => {
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
          {getSubscriptionData &&
            getSubscriptionData?.data?.map((plan: PlanI) => {
              return (
                <Grid item key={plan?._id} xs={12} md={6} lg={4}>
                  <PlanCard
                    status={plan?.status}
                    icon={getProductIcon(plan?.name || plan?.productName || '')}
                    title={plan?.name ?? plan?.productName ?? ''}
                    planDuration={plan?.planDuration}
                    planUsers={plan?.additionalUsers ?? ''}
                    planData={plan?.billingCycle}
                    price={plan?.planData?.planPrice ?? 0}
                    billOn={dayjs(plan?.billingDate)?.format(DATE_FORMAT?.UI)}
                    type={plan?.planTypeName ?? plan?.plan}
                    handleBillingDetail={handleDrawerOpen}
                    id={plan?._id}
                    plan={plan}
                  />
                </Grid>
              );
            })}
          {getSubscriptionCRMData?.data?.map((plan: PlanCRMI) => {
            return (
              <Grid item key={plan?.id} xs={12} md={6} lg={4}>
                <PlanCard
                  status={plan?.status}
                  icon={<CrmSuiteIcon />}
                  title={plan?.name || plan?.planName || ''}
                  planDuration={plan?.planDuration}
                  planUsers={plan?.additionalUsers}
                  planData={plan?.billingCycle}
                  price={plan?.planPrice || plan?.plans?.planPrice || 0}
                  billOn={dayjs(plan?.billingDate).format(DATE_FORMAT?.UI)}
                  type={
                    plan?.planTypeName
                      ? plan?.planTypeName
                      : PLAN_PRICE_TYPE_TAGS?.FREE_PLAN
                  }
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
