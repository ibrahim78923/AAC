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
import { data } from '@/mock/modules/SubscriptionAndInvoices';

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
