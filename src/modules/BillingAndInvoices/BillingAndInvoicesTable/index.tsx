import Search from '@/components/Search';
import { useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import PlusShared from '@/assets/icons/shared/plus-shared';
import GenerateInvoice from '../GenerateInvoice';
function BillingAndInvoicesTable() {
  const [searchByClientName, setSearchByClientName] = useState('');

  return (
    <Grid>
      <Grid container>
        <Grid item xs={6} sm={6}>
          <Typography variant="h4">Billing & Invoices</Typography>
        </Grid>
        <Grid item xs={6} sm={6} sx={{ textAlign: 'end' }}>
          <Button startIcon={<PlusShared />} variant="contained">
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
  );
}

export default BillingAndInvoicesTable;
