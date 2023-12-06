import Layout from '@/layout';
import CTA from '@/modules/airMarketer/LeadCapture/Cta';
import React from 'react';

const CtaPage = () => {
  return <CTA />;
};

export default CtaPage;

CtaPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
