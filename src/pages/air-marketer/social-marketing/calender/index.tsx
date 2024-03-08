import React from 'react';
import Layout from '@/layout';
import Calender from '@/modules/airMarketer/SocialMarketing/Calender';
import { Permissions } from '@/constants/permissions';

const AirMarketerSocialMarketingPage = () => {
  return <Calender />;
};

export default AirMarketerSocialMarketingPage;

AirMarketerSocialMarketingPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      guardRoute
      permissions={
        Permissions.AIR_MARKETER_SOCIAL_MARKETING_CALENDER_PERMISSIONS
      }
    >
      {page}
    </Layout>
  );
};
