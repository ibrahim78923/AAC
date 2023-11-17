import React from 'react';

import Layout from '@/layout';

import SocialInboxSettings from '@/modules/airMarketer/SocialMarketing/SocialInbox/SocialInboxSettings';

const SettingsPage = () => {
  return <SocialInboxSettings />;
};
export default SettingsPage;

SettingsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
