import React from 'react';
import Layout from '@/layout';
import SMSMarketing from '@/modules/airMarketer/SMSMarketing';

const AirMarketerSMSMarketingPage = () => {
  return <SMSMarketing />;
};

export default AirMarketerSMSMarketingPage;

AirMarketerSMSMarketingPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
