import React, { useState, useEffect } from 'react';
import { TabList, TabPanel, TabContext } from '@mui/lab';
import { Tab, Box } from '@mui/material';
import PaymentMethods from './PaymentMethods';
import Subscriptions from './Subscriptions';
import Invoices from './Invoices';

function SubscriptionInvoices() {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [value, setValue] = useState('subscription');

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {}, []);

  /* RENDER COMPONENT
  -------------------------------------------------------------------------------------*/
  return (
    <>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            aria-label="subscription & invoices tabs"
          >
            <Tab label="Subscription" value="subscription" />
            <Tab label="Invoices" value="invoices" />
            <Tab label="Payment Methods" value="paymentMethods" />
          </TabList>
        </Box>
        <Box sx={{ pt: '40px', '& .MuiTabPanel-root': { p: '0' } }}>
          <TabPanel value="subscription">
            <Subscriptions />
          </TabPanel>
          <TabPanel value="invoices">
            <Invoices />
          </TabPanel>
          <TabPanel value="paymentMethods">
            <PaymentMethods />
          </TabPanel>
        </Box>
      </TabContext>
    </>
  );
}

export default SubscriptionInvoices;
