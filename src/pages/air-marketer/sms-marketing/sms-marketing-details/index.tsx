import React from 'react';
import Layout from '@/layout';
import SMSBroadcastDetails from '@/modules/airMarketer/SMSMarketing/SMSBroadcast/SMSBroadcastDetails';

const AirMarketerSMSBroadcastDetailsPage = () => {
  return <SMSBroadcastDetails />;
};

export default AirMarketerSMSBroadcastDetailsPage;

AirMarketerSMSBroadcastDetailsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
