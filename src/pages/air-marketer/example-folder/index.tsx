import Layout from '@/layout';
import React from 'react';

const AirMarketerExamplePage = () => {
  return <div>AirMarketer Example Page</div>;
};

export default AirMarketerExamplePage;

AirMarketerExamplePage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
