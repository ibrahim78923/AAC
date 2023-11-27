import Layout from '@/layout';
import ConnectAds from '@/modules/airMarketer/ConnectAds';

import React from 'react';

const ConnectAdsPage = () => {
  return <ConnectAds />;
};

export default ConnectAdsPage;

ConnectAdsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
