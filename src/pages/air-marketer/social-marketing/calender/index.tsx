import React from 'react';
import Layout from '@/layout';
import Calender from '@/modules/airMarketer/SocialMarketing/Calender';

const AirMarketerSocialMarketingPage = () => {
  return <Calender />;
};

export default AirMarketerSocialMarketingPage;

AirMarketerSocialMarketingPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
