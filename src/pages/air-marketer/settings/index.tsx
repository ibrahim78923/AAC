import React from 'react';

import Layout from '@/layout';

import SocialInboxSettings from '@/modules/airMarketer/SocialMarketing/SocialInbox/SocialInboxSettings';
import { Permissions } from '@/constants/permissions';

const SettingsPage = () => {
  return <SocialInboxSettings />;
};
export default SettingsPage;

SettingsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_MARKETER_SETTINGS}>{page}</Layout>
  );
};
