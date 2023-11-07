import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
import SalesInvoices from '@/modules/SalesInvoices';
import React from 'react';

const SalesInvoicesPage = () => {
  return <SalesInvoices />;
};

export default SalesInvoicesPage;

SalesInvoicesPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
