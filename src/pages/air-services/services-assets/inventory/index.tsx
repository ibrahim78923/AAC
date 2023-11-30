import Layout from '@/layout';
import React from 'react';

const InventoryPage = () => {
  return <div>InventoryPage</div>;
};

export default InventoryPage;

InventoryPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
