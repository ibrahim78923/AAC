import React, { useState } from 'react';
import { Grid } from '@mui/material';
import PlanCard from './PlanCard';
import BillingDetail from './BillingDetail';
import {
  ProductSalesIcon,
  ProductServiceIcon,
  ProductMarketingIcon,
  ProductOperationIcon,
  ProductLoyaltyProgramIcon,
} from '@/assets/icons';
import { useGetSubscriptionsAndInvoicesQuery } from '@/services/orgAdmin/subscription-and-invoices';

const getProductIcon = (product: any) => {
  let iconProduct;
  switch (product) {
    case 'Sales':
      iconProduct = <ProductSalesIcon />;
      break;
    case 'Service':
      iconProduct = <ProductServiceIcon />;
      break;
    case 'Marketing':
      iconProduct = <ProductMarketingIcon />;
      break;
    case 'Operation':
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
  const { data: getSubscriptionData } = useGetSubscriptionsAndInvoicesQuery({});
  const handleDrawerOpen = (id: any) => {
    setSubscriptionId(id);
    setIsOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setIsOpenDrawer(false);
  };

  return (
    <>
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
                icon={getProductIcon(plan?.product)}
                title={
                  plan?.planProducts?.map(
                    (product: { name: string }) => product?.name,
                  ) ?? plan?.name
                }
                planDuration={plan?.planDuration}
                planUsers={plan?.additionalUsers}
                planData={plan?.billingCycle}
                price={plan?.plans?.planPrice ?? 0}
                billOn={plan?.billingDate}
                type={plan?.plantypes?.name ?? plan?.plan}
                handleBillingDetail={handleDrawerOpen}
                id={plan?._id}
                plan={plan}
              />
            </Grid>
          );
        })}
      </Grid>

      <BillingDetail
        open={isOpenDrawer}
        onClose={handleDrawerClose}
        subscriptionId={subscriptionId}
      />
    </>
  );
};

export default Subscriptions;
