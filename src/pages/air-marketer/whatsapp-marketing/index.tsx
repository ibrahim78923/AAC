import React from 'react';
import Layout from '@/layout';
import WhatsAppMarketing from '@/modules/airMarketer/WhatsAppMarketing';

const AirMarketerWhatsappMarketingPage = () => {
  return <WhatsAppMarketing />;
};

export default AirMarketerWhatsappMarketingPage;

AirMarketerWhatsappMarketingPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
