import Layout from '@/layout';
import CTA from '@/modules/airMarketer/LeadCapture/Cta';
import React from 'react';
import { Permissions } from '@/constants/permissions';

const CtaPage = () => {
  return <CTA />;
};

export default CtaPage;

CtaPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_MARKETER_LEAD_CAPTURE}>{page}</Layout>
  );
};
