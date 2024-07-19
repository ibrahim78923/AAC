import React, { useEffect, useState } from 'react';
import { Tab, Box } from '@mui/material';
import { TabList, TabPanel, TabContext } from '@mui/lab';
import BillingAndInvoicesTable from './BillingAndInvoicesTable';
import Invoices from './Invoices';
import { useRouter } from 'next/router';
import { BILLING_AND_INVOICES_TAB } from '@/constants';

const BillingAndInvoices = () => {
  const [value, setValue] = useState(BILLING_AND_INVOICES_TAB?.SUBSCRIPTION);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const router = useRouter();

  useEffect(() => {
    if (router?.asPath) {
      if (router?.asPath?.includes('redirect')) {
        setValue(BILLING_AND_INVOICES_TAB?.INVOICES);
      } else {
        setValue(BILLING_AND_INVOICES_TAB?.SUBSCRIPTION);
      }
    }
  }, [router?.asPath]);

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList
          onChange={handleChange}
          aria-label="subscription & invoices tabs"
        >
          <Tab
            label="Plan Assignment"
            value={BILLING_AND_INVOICES_TAB?.SUBSCRIPTION}
          />
          <Tab label="Invoices" value={BILLING_AND_INVOICES_TAB?.INVOICES} />
        </TabList>
      </Box>
      <Box sx={{ pt: '40px', '& .MuiTabPanel-root': { p: '0' } }}>
        <TabPanel value={BILLING_AND_INVOICES_TAB?.SUBSCRIPTION}>
          <BillingAndInvoicesTable />
        </TabPanel>
        <TabPanel value={BILLING_AND_INVOICES_TAB?.INVOICES}>
          <Invoices />
        </TabPanel>
      </Box>
    </TabContext>
  );
};
export default BillingAndInvoices;
