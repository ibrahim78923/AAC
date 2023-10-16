import Layout from '@/layout';
import React from 'react';

const loyaltyProgramExamplePage = () => {
  return <div>loyalty Program Example Page</div>;
};

export default loyaltyProgramExamplePage;

loyaltyProgramExamplePage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
