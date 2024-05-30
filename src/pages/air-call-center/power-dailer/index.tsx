import React from 'react';
import Layout from '@/layout';
import PowerDialer from '@/modules/airCallCenter/PowerDialer';

const AirPowerDialerPage = () => {
  return <PowerDialer />;
};

export default AirPowerDialerPage;

AirPowerDialerPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
