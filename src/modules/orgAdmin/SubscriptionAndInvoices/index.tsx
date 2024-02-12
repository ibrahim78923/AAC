import React from 'react';
import PaymentMethods from './PaymentMethods';
import Subscriptions from './Subscriptions';
import Invoices from './Invoices';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';

const SubscriptionAndInvoices = () => {
  return (
    <HorizontalTabs
      tabsDataArray={['subscriptions', 'invoices', 'payment Methods']}
    >
      <Subscriptions />
      <Invoices />
      <PaymentMethods />
    </HorizontalTabs>
  );
};

export default SubscriptionAndInvoices;
