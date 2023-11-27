import Layout from '@/layout';
import TrackVisitors from '@/modules/airMarketer/ConnectAds/TrackVisitors';

import React from 'react';

const TrackVisitorsPage = () => {
  return <TrackVisitors />;
};

export default TrackVisitorsPage;

TrackVisitorsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
