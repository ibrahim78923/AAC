import { useState } from 'react';

import { Grid, Typography, Button } from '@mui/material';

import Search from '@/components/Search';

import GenerateInvoice from '../GenerateInvoice';

import ViewBillingDetails from '../ViewBillingDetails';

import PlusSharedIcon from '@/assets/icons/shared/plus-shared';

const BillingAndInvoicesTable = () => {
  const [searchByClientName, setSearchByClientName] = useState('');
  const [isViewDetailOpen, setIsViewDeailOpen] = useState<boolean>(false);
  return (
    <>
      <Grid>
        <Grid container>
          <Grid item xs={6} sm={6}>
            <Typography variant="h4">Billing & Invoices</Typography>
          </Grid>
          <Grid item xs={6} sm={6} sx={{ textAlign: 'end' }}>
            <Button
              onClick={() => setIsViewDeailOpen(true)}
              startIcon={<PlusSharedIcon />}
              variant="contained"
            >
              Assign Plan
            </Button>
          </Grid>
        </Grid>
        <Grid container mt={2}>
          <Grid item xs={6} sm={6}>
            <Search
              searchBy={searchByClientName}
              setSearchBy={setSearchByClientName}
              label="Search By Name"
              width="260px"
            />
          </Grid>
        </Grid>
        <GenerateInvoice />
      </Grid>
      <ViewBillingDetails
        isViewDetailOpen={isViewDetailOpen}
        setIsViewDeailOpen={setIsViewDeailOpen}
      />
    </>
  );
};

export default BillingAndInvoicesTable;
