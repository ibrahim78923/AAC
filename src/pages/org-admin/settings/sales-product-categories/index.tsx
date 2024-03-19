import React from 'react';
import SuperAdminLayout from '../../../../layout';
import SalesProductCategories from '@/modules/orgAdmin/Settings/SalesProductCategories';
import { Permissions } from '@/constants/permissions';

const SalesProductCategoriesPage = () => {
  return <SalesProductCategories />;
};
export default SalesProductCategoriesPage;
SalesProductCategoriesPage.getLayout = function getLayout(page: any) {
  return (
    <SuperAdminLayout
      guardRoute
      permissions={Permissions?.ORG_ADMIN_SETTINGS_CATEGORIES}
    >
      {page}
    </SuperAdminLayout>
  );
};
