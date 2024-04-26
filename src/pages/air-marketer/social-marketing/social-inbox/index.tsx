import React from 'react';
import Layout from '@/layout';
import SocialInbox from '@/modules/airMarketer/SocialMarketing/SocialInbox';
import { Permissions } from '@/constants/permissions';

const SocialInboxPage = () => {
  return <SocialInbox />;
};

export default SocialInboxPage;

SocialInboxPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      guardRoute
      permissions={
        Permissions.AIR_MARKETER_SOCIAL_MARKETING_SOCIAL_INBOX_PERMISSIONS
      }
    >
      {page}
    </Layout>
  );
};
