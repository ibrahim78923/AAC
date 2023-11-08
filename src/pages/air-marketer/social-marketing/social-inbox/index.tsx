import Layout from '@/layout';
import SocialInbox from '@/modules/airMarketer/SocialMarketing/SocialInbox';
import React from 'react';

const SocialInboxPage = () => {
  return <SocialInbox />;
};

export default SocialInboxPage;

SocialInboxPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
