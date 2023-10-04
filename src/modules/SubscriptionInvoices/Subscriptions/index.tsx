import React, { useState } from 'react';
import { Grid } from '@mui/material';
import PlanCard from './PlanCard';
import BillingDetail from './BillingDetail';
import {
  IconProductSales,
  IconProductService,
  IconProductMarketing,
  IconProductOperation,
  IconProductLoyaltyProgram,
} from '@/assets/icons';
import { data } from './Subscription.data';

const getProductIcon = (product: any) => {
  let iconProduct;
  switch (product) {
    case 'Sales':
      iconProduct = <IconProductSales />;
      break;
    case 'Service':
      iconProduct = <IconProductService />;
      break;
    case 'Marketing':
      iconProduct = <IconProductMarketing />;
      break;
    case 'Operation':
      iconProduct = <IconProductOperation />;
      break;
    case 'Loyalty Program':
      iconProduct = <IconProductLoyaltyProgram />;
      break;
    default:
      iconProduct = <></>;
  }
  return iconProduct;
};

const Subscriptions = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
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
        {data?.map((plan: any) => {
          return (
            <Grid item key={plan.id} xs={12} md={6} lg={4}>
              <PlanCard
                status={plan.status}
                icon={getProductIcon(plan.product)}
                title={plan.product}
                planDuration={plan.planDuration}
                planUsers={plan?.planUsers}
                planData={plan?.planData}
                price={plan.price}
                billOn={plan.billOn}
                type={plan.type}
                handleBillingDetail={handleDrawerOpen}
              />
            </Grid>
          );
        })}
      </Grid>

      <BillingDetail open={isOpenDrawer} onClose={handleDrawerClose} />
    </>
  );
};

export default Subscriptions;
