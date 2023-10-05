import { useState } from 'react';

import { Grid, Typography, Button } from '@mui/material';

import Search from '@/components/Search';

import GenerateInvoice from '../GenerateInvoice';

import ViewBillingDetails from '../ViewBillingDetails';

import PlusSharedIcon from '@/assets/icons/shared/plus-shared';
import { columns } from './BillingAndInvoices.data';
import { BillingAndInvoicesTableData } from '@/mock/modules/BillingAndDetails';
import TanstackTable from '@/components/Tabel/TanstackTable';
import EditForm from '../EditForm';

const BillingAndInvoicesTable = () => {
  const [searchByClientName, setSearchByClientName] = useState('');
  const [isViewDetailOpen, setIsViewDeailOpen] = useState<boolean>(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
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
          <Grid item xs={6} sm={6} mt={4}>
            <Search
              searchBy={searchByClientName}
              setSearchBy={setSearchByClientName}
              label="Search By Name"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={6} mt={4}>
            <Button
              onClick={() => setIsOpenDrawer(true)}
              startIcon={<PlusSharedIcon />}
              variant="contained"
            >
              Filters
            </Button>
          </Grid>
        </Grid>
        <GenerateInvoice />
      </Grid>
      <ViewBillingDetails
        isViewDetailOpen={isViewDetailOpen}
        setIsViewDeailOpen={setIsViewDeailOpen}
      />
      <TanstackTable columns={columns} data={BillingAndInvoicesTableData} />
      {isOpenDrawer && <EditForm isOpenDrawer={isOpenDrawer} />}
    </>
  );
};

export default BillingAndInvoicesTable;
