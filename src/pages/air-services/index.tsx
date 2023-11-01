import Layout from '@/layout';
import CustomerPortal from '@/modules/airServices/customer-portal';
import React from 'react';

const AirServicesDashboard = () => {
  return (
    <div>
      <CustomerPortal />
    </div>
  );
};

export default AirServicesDashboard;

AirServicesDashboard.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
