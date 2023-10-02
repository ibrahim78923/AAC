import React, { useState, useEffect } from 'react';

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

// Temporary data
const data = [
  {
    id: '001',
    status: 'active',
    product: 'Sales',
    price: '20',
    numberOfUsers: '3',
    planDuration: 'Paid Monthly',
    planUsers: '2',
    planData: '3GB',
    billOn: '20th Feb 2024',
    type: 'Growth Plan',
  },
  {
    id: '002',
    status: 'inactive',
    product: 'Service',
    price: '0',
    numberOfUsers: '1',
    planDuration: '',
    planUsers: '1',
    planData: '3GB',
    billOn: '-',
    type: 'Free Plan',
  },
  {
    id: '003',
    status: 'inactive',
    product: 'Marketing',
    price: '0',
    numberOfUsers: '1',
    planDuration: '',
    planUsers: '1',
    planData: '3GB',
    billOn: '-',
    type: 'Free Plan',
  },
  {
    id: '004',
    status: 'active',
    product: 'Operation',
    price: '20',
    numberOfUsers: '1',
    planDuration: 'Paid Monthly',
    planUsers: '1',
    planData: '5GB',
    billOn: '20th Feb 2024',
    type: 'Growth Plan',
  },
  {
    id: '005',
    status: 'inactive',
    product: 'Loyalty Program',
    price: '0',
    numberOfUsers: '1',
    planDuration: 'Paid Monthly',
    planUsers: '1',
    planData: '5GB',
    billOn: '-',
    type: 'Free Plan',
  },
];

function getProductIcon(product: any) {
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
}

function Subscriptions() {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [openDrawer, setOpenDrawer] = useState(false);

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {}, []);

  /* RENDER COMPONENT
  -------------------------------------------------------------------------------------*/
  return (
    <>
      <Grid container rowSpacing={'24px'} columnSpacing={'60px'}>
        {data?.map((plan: any) => {
          return (
            <Grid item key={plan.id} xs={4}>
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

      <BillingDetail open={openDrawer} onClose={handleDrawerClose} />
    </>
  );
}

export default Subscriptions;
