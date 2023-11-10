import React from 'react';
import Layout from '@/layout';
import SocialMarketing from '@/modules/airMarketer/SocialMarketing';

const AirMarketerSocialMarketingPage = () => {
  return <SocialMarketing />;
};

export default AirMarketerSocialMarketingPage;

AirMarketerSocialMarketingPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
