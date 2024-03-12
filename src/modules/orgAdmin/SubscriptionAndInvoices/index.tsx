import React from 'react';
import PaymentMethods from './PaymentMethods';
import Subscriptions from './Subscriptions';
import Invoices from './Invoices';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS } from '@/constants/permission-keys';

const SubscriptionAndInvoices = () => {
  return (
    <HorizontalTabs
      tabsDataArray={['subscriptions', 'invoices', 'payment Methods']}
    >
      <PermissionsGuard
        permissions={[
          ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS?.SUBSCRIPTION_VIEW_PRODUCTS_PLANS,
        ]}
      >
        <Subscriptions />
      </PermissionsGuard>

      <PermissionsGuard
        permissions={[
          ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS?.INVOICES_LIST_VIEW,
        ]}
      >
        <Invoices />
      </PermissionsGuard>

      <PaymentMethods />
    </HorizontalTabs>
  );
};

export default SubscriptionAndInvoices;
