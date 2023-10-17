import Layout from '@/layout';
import SalesInvoices from '@/modules/airSales/Invoices';
import React from 'react';

const SalesInvoicesPage = () => {
  return <SalesInvoices />;
};

export default SalesInvoicesPage;

SalesInvoicesPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
