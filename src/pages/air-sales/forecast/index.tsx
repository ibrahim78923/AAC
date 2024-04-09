import React from 'react';
import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import Forecast from '@/modules/airSales/forecast';

const ForeCastPage = () => {
  return (
    <Layout guardRoute permissions={Permissions?.AIR_SALES_FORECAST}>
      <Forecast />
    </Layout>
  );
};

export default ForeCastPage;
