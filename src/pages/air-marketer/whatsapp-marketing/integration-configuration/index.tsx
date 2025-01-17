import React from 'react';
import Layout from '@/layout';
import { Permissions } from '@/constants/permissions';
import IntegrationConfiguration from '@/modules/airMarketer/WhatsAppMarketing/ConnectNumber/integrationConfiguration';

const AirMarketerSMSMarketingIntegrationConfigurationPage = () => {
  return <IntegrationConfiguration />;
};

export default AirMarketerSMSMarketingIntegrationConfigurationPage;

AirMarketerSMSMarketingIntegrationConfigurationPage.getLayout =
  function getLayout(page: any) {
    return (
      <Layout permissions={Permissions?.AIR_MARKETER_WHATSAPP_MARKETING}>
        {page}
      </Layout>
    );
  };
