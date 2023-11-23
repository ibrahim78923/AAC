import Layout from '@/layout';
import PaidAds from '@/modules/airMarketer/PaidAds';
import React from 'react';

const PaidAdsPage = () => {
  return <PaidAds />;
};

export default PaidAdsPage;

PaidAdsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
