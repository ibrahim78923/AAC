import Layout from '@/layout';

import CatalogService from '@/modules/airServices/CustomerPortal/Catalog/CatalogService';
import React from 'react';

const CatalogServicePage = () => {
  return <CatalogService />;
};
CatalogServicePage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
export default CatalogServicePage;
