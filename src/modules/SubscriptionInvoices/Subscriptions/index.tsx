import { useEffect } from 'react';
import PlanCard from './PlanCard';
import { IconProductSales } from '../../../assets/icons';
import { Box, Grid } from '@mui/material';

const data = [
  {
    id: '001',
    status: 'active',
    product: 'Sales',
    price: '20',
    numberOfUsers: '3',
    subscriptionDuration: 'paid Monthly',
    data: '3GB',
    billOn: '20th Feb 2024',
    type: 'Growth Plan',
  },
  {
    id: '002',
    status: 'inactive',
    product: 'Service',
    price: '0',
    numberOfUsers: '1',
    subscriptionDuration: '',
    data: '',
    billOn: '20th Feb 2024',
    type: 'Free Plan',
  },
];

function Subscriptions() {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {}, []);

  /* RENDER COMPONENT
  -------------------------------------------------------------------------------------*/
  return (
    <Box className="subscription-content">
      <Grid container rowSpacing={'24px'} columnSpacing={'60px'}>
        {data?.map((plan: any) => (
          <Grid item key={plan.id} xs={4}>
            <PlanCard
              status={plan.status}
              icon={<IconProductSales />}
              title={plan.product}
              planDuration={plan.subscriptionDuration}
              planUsers={''}
              planData={''}
              price={plan.price}
              billOn={plan.billOn}
              type={plan.type}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Subscriptions;
