import Layout from '@/layout';
import React from 'react';

const SoftwarePage = () => {
  return <div>SoftwarePage</div>;
};

export default SoftwarePage;
SoftwarePage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
