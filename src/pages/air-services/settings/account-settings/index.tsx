import Layout from '@/layout';
import React from 'react';

const AccountSettingsPage = () => {
  return <div>AccountSettingsPage</div>;
};

export default AccountSettingsPage;

AccountSettingsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
