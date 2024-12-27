import React from 'react';
import Layout from '@/layout';
import { Permissions } from '@/constants/permissions';
import IntegrationConfiguration from '@/modules/airMarketer/SMSMarketing/ConnectNumber/integrationConfiguration';

const AirMarketerSMSMarketingIntegrationConfigurationPage = () => {
  return <IntegrationConfiguration />;
};

export default AirMarketerSMSMarketingIntegrationConfigurationPage;

AirMarketerSMSMarketingIntegrationConfigurationPage.getLayout =
  function getLayout(page: any) {
    return (
      <Layout permissions={Permissions?.AIR_MARKETER_SMS_MARKETING}>
        {page}
      </Layout>
    );
  };
