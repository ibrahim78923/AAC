import Layout from '@/layout';
import ConnectAdAccount from '@/modules/airMarketer/ConnectAds/ConnectAdAccount';

import React from 'react';

const ConnectAdsAccountPage = () => {
  return <ConnectAdAccount />;
};

export default ConnectAdsAccountPage;

ConnectAdsAccountPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
