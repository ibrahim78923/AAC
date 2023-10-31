import React from 'react';
import SuperAdminLayout from '../../../../layout';
import SalesProductCategories from '@/modules/orgAdmin/Settings/SalesProductCategories';

const SalesProductCategoriesPage = () => {
  return <SalesProductCategories />;
};
export default SalesProductCategoriesPage;
SalesProductCategoriesPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
