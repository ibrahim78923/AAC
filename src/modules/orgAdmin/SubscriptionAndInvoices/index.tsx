import PaymentMethods from './PaymentMethods';
import Subscriptions from './Subscriptions';
import Invoices from './Invoices';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS } from '@/constants/permission-keys';
import { Box, Tab, Tabs, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { styles } from './subscriptionAndInvoice.style';
import { useState } from 'react';

const TabPanel = ({ children, value, index }: any) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const SubscriptionAndInvoices = () => {
  const theme = useTheme();
  const router = useRouter();
  const { tab } = router.query;

  const tabsValues: any = {
    subscriptions: 0,
    invoices: 1,
    payments: 2,
  };

  const [value, setValue] = useState(
    tab && typeof tab === 'string' ? tabsValues[tab] : 0,
  );

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        selectionFollowsFocus
        variant="scrollable"
        orientation="horizontal"
        sx={styles?.tabRootTab(theme)}
        TabIndicatorProps={styles?.tabIndicatorTab(theme)}
        allowScrollButtonsMobile
        value={value}
        onChange={handleChange}
      >
        <Tab label="Subscription" sx={styles?.tabsStyleTab?.(theme)} />
        <Tab label="Invoices" sx={styles?.tabsStyleTab?.(theme)} />
        <Tab label="Payment Methods" sx={styles?.tabsStyleTab?.(theme)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <PermissionsGuard
          permissions={[
            ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS?.SUBSCRIPTION_VIEW_PRODUCTS_PLANS,
          ]}
        >
          <Subscriptions />
        </PermissionsGuard>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PermissionsGuard
          permissions={[
            ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS?.INVOICES_LIST_VIEW,
          ]}
        >
          <Invoices />
        </PermissionsGuard>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PaymentMethods />
      </TabPanel>
    </>
  );
};

export default SubscriptionAndInvoices;
