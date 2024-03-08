import React from 'react';
import Layout from '@/layout';
import SMSMarketing from '@/modules/airMarketer/SMSMarketing';
import { Permissions } from '@/constants/permissions';

const AirMarketerSMSMarketingPage = () => {
  return <SMSMarketing />;
};

export default AirMarketerSMSMarketingPage;

AirMarketerSMSMarketingPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_MARKETER_SMS_MARKETING}>
      {page}
    </Layout>
  );
};
