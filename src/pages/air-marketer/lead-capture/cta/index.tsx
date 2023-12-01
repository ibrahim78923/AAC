import Layout from '@/layout';
import React from 'react';

const CtaPage = () => {
  return <div>CTA</div>;
};

export default CtaPage;

CtaPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
