import React from 'react';

import Layout from '@/layout';

import ViewDetails from '@/modules/airSales/Deals/ViewDetails';
import { Permissions } from '@/constants/permissions';

const ViewDetailsPage = () => {
  return <ViewDetails />;
};
export default ViewDetailsPage;

ViewDetailsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout guardRoute permissions={Permissions?.AIR_SALES_DEALS}>
      {page}
    </Layout>
  );
};
