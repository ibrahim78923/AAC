import { useState } from 'react';

import { Grid, Typography, Button } from '@mui/material';

import { BillingAndInvoicesTableData } from '@/mock/modules/BillingAndDetails';

import Search from '@/components/Search';
import GenerateInvoice from '../GenerateInvoice';
import TanstackTable from '@/components/Tabel/TanstackTable';
import ViewBillingDetails from '../ViewBillingDetails';
import { columns } from './BillingAndInvoices.data';
import EditForm from '../EditForm';
import MenuItems from './MenuOptions';
import useMenuOptions from './MenuOptions/useMenuOptions';
import Filters from './Filters';
import CustomPagination from '@/components/CustomPagination';

import PlusSharedIcon from '@/assets/icons/shared/plus-shared';
import { FilterSharedIcon } from '@/assets/icons';

const BillingAndInvoicesTable = () => {
  const [searchByClientName, setSearchByClientName] = useState('');
  const [isViewDetailOpen, setIsViewDeailOpen] = useState<boolean>(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isShowGenerateInvoice, setisShowGenerateInvoice] = useState(false);
  const { isShowViewBillingDetails, setIsShowViewBillingDetails } =
    useMenuOptions();

  return (
    <>
      <Grid>
        <Grid container>
          <Grid item xs={6} sm={6}>
            <Typography variant="h4">Billing & Invoices</Typography>
          </Grid>
          <Grid item xs={6} sm={6} sx={{ textAlign: 'end' }}>
            <Button
              onClick={() => setIsOpenDrawer(true)}
              startIcon={<PlusSharedIcon />}
              variant="contained"
            >
              Assign Plan
            </Button>
          </Grid>
        </Grid>
        <Grid container mt={2}>
          <Grid item xs={10} sm={10} mt={4}>
            <Search
              searchBy={searchByClientName}
              setSearchBy={setSearchByClientName}
              label="Search By Name"
              size="medium"
            />
          </Grid>
          <Grid item xs={1} sm={1} mt={4}>
            <MenuItems
              isViewDetailOpen={isViewDetailOpen}
              setIsViewDeailOpen={setIsViewDeailOpen}
              setIsOpenDrawer={setIsOpenDrawer}
              setIsShowViewBillingDetails={setIsShowViewBillingDetails}
              setisShowGenerateInvoice={setisShowGenerateInvoice}
            />
          </Grid>
          <Grid item xs={1} sm={1} mt={4}>
            <Button
              onClick={() => setIsOpenFilter(true)}
              startIcon={<FilterSharedIcon />}
              sx={{ border: '1px solid #D1D5DB', color: '#6B7280' }}
            >
              Filters
            </Button>
          </Grid>
        </Grid>
        {isShowGenerateInvoice && <GenerateInvoice />}
      </Grid>
      {isShowViewBillingDetails && (
        <ViewBillingDetails
          isOpenDrawer={isShowViewBillingDetails}
          onClose={setIsShowViewBillingDetails}
        />
      )}
      <Grid item xs={12} sm={12} mt={3}>
        <TanstackTable columns={columns} data={BillingAndInvoicesTableData} />
      </Grid>
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
      {isOpenDrawer && (
        <EditForm isOpenDrawer={isOpenDrawer} onClose={setIsOpenDrawer} />
      )}
      {isOpenFilter && (
        <Filters isOpenDrawer={isOpenFilter} onClose={setIsOpenFilter} />
      )}
    </>
  );
};

export default BillingAndInvoicesTable;
