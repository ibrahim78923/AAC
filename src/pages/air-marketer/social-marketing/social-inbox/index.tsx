import React from 'react';
import Layout from '@/layout';
import SocialInbox from '@/modules/airMarketer/SocialMarketing/SocialInbox';

const SocialInboxPage = () => {
  return <SocialInbox />;
};

export default SocialInboxPage;

SocialInboxPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
