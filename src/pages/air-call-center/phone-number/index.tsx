import React from 'react';
import PhoneNumber from '../../../modules/airCallCenter/PhoneNumber';
import Layout from '@/layout';

const PhoneNumberPage = () => {
  return <PhoneNumber />;
};

export default PhoneNumberPage;

PhoneNumberPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
