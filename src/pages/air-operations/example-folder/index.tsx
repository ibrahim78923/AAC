import Layout from '@/layout';
import React from 'react';

const AirOperationExamplePage = () => {
  return <div>AirOperation Example Page</div>;
};

export default AirOperationExamplePage;

AirOperationExamplePage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
