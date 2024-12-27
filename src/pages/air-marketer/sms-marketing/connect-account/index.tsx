import React from 'react';
import Layout from '@/layout';
import { Permissions } from '@/constants/permissions';
import ConnectTwilioAccount from '@/modules/airMarketer/SMSMarketing/ConnectNumber/ConnectTwilioAccount';

const AirMarketerSMSMarketingConnectAccountPage = () => {
  return <ConnectTwilioAccount />;
};

export default AirMarketerSMSMarketingConnectAccountPage;

AirMarketerSMSMarketingConnectAccountPage.getLayout = function getLayout(
  page: any,
) {
  return (
    <Layout permissions={Permissions?.AIR_MARKETER_SMS_MARKETING}>
      {page}
    </Layout>
  );
};
