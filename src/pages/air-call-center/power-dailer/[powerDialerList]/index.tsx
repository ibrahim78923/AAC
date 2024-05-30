import React from 'react';
import Layout from '@/layout';
import { PowerDialerChildList } from '@/modules/airCallCenter/PowerDialer/PowerDialerList/PowerDialerChildList';

const PowerDialerChildListPage = () => {
  return <PowerDialerChildList />;
};

export default PowerDialerChildListPage;

PowerDialerChildListPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
