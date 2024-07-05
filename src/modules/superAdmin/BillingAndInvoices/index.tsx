import React, { useEffect, useState } from 'react';
import { Tab, Box } from '@mui/material';
import { TabList, TabPanel, TabContext } from '@mui/lab';
import BillingAndInvoicesTable from './BillingAndInvoicesTable';
import Invoices from './Invoices';
import { useRouter } from 'next/router';

const BillingAndInvoices = () => {
  const [value, setValue] = useState('subscription');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const router = useRouter();

  useEffect(() => {
    if (router?.asPath) {
      if (router?.asPath?.includes('redirect')) {
        setValue('invoices');
      } else {
        setValue('subscription');
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
          <Tab label="Plan Assignment" value="subscription" />
          <Tab label="Invoices" value="invoices" />
        </TabList>
      </Box>
      <Box sx={{ pt: '40px', '& .MuiTabPanel-root': { p: '0' } }}>
        <TabPanel value="subscription">
          <BillingAndInvoicesTable />
        </TabPanel>
        <TabPanel value="invoices">
          <Invoices />
        </TabPanel>
      </Box>
    </TabContext>
  );
};
export default BillingAndInvoices;
