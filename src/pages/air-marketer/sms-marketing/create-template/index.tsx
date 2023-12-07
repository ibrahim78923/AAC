import React from 'react';
import Layout from '@/layout';
import CreateTemplate from '@/modules/airMarketer/SMSMarketing/Templates/CreateTemplate';

const AirMarketerSMSMarketingCreateTemplatePage = () => {
  return <CreateTemplate />;
};

export default AirMarketerSMSMarketingCreateTemplatePage;

AirMarketerSMSMarketingCreateTemplatePage.getLayout = function getLayout(
  page: any,
) {
  return <Layout>{page}</Layout>;
};
