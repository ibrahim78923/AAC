import Layout from '@/layout';
import React from 'react';

const AssetsPage = () => {
  return <div>AssetsPage</div>;
};

export default AssetsPage;

AssetsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
