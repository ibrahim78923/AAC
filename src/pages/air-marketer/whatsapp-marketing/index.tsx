import React from 'react';
import Layout from '@/layout';
import WhatsAppMarketing from '@/modules/airMarketer/WhatsAppMarketing';
import { Permissions } from '@/constants/permissions';

const AirMarketerWhatsappMarketingPage = () => {
  return <WhatsAppMarketing />;
};

export default AirMarketerWhatsappMarketingPage;

AirMarketerWhatsappMarketingPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions.AIR_MARKETER_WHATSAPP_MARKETING}>
      {page}
    </Layout>
  );
};
