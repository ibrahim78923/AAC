import { useState } from 'react';

import { Grid, Typography, Button, useTheme } from '@mui/material';

import Search from '@/components/Search';
import GenerateInvoice from '../GenerateInvoice';
import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import ViewBillingDetails from '../ViewBillingDetails';
import { columns } from './BillingAndInvoices.data';
import EditForm from '../EditForm';
import MenuItems from './MenuOptions';
import useMenuOptions from './MenuOptions/useMenuOptions';
import Filters from './Filters';

import { BillingAndInvoicesTableData } from '@/mock/modules/superAdmin/BillingAndDetails';

import PlusIcon from '@/assets/icons/shared/plus-shared';
import { FilterSharedIcon } from '@/assets/icons';

const BillingAndInvoicesTable = () => {
  const [searchByClientName, setSearchByClientName] = useState('');
  const [isViewDetailOpen, setIsViewDeailOpen] = useState<boolean>(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isShowGenerateInvoice, setisShowGenerateInvoice] = useState(false);
  const theme = useTheme();
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
              startIcon={<PlusIcon />}
              variant="contained"
              className="medium"
            >
              Assign Plan
            </Button>
          </Grid>
        </Grid>
        <Grid container mt={2}>
          <Grid item xs={12} xl={10} mt={4}>
            <Search
              searchBy={searchByClientName}
              setSearchBy={setSearchByClientName}
              label="Search By Name"
              size="medium"
            />
          </Grid>
          <Grid item xs={12} sm={12} xl={2} mt={4} style={{ display: 'flex' }}>
            <MenuItems
              isViewDetailOpen={isViewDetailOpen}
              setIsViewDeailOpen={setIsViewDeailOpen}
              setIsOpenDrawer={setIsOpenDrawer}
              setIsShowViewBillingDetails={setIsShowViewBillingDetails}
              setisShowGenerateInvoice={setisShowGenerateInvoice}
            />
            <Button
              onClick={() => setIsOpenFilter(true)}
              startIcon={<FilterSharedIcon />}
              sx={{
                border: `1px solid ${theme.palette.custom.dark}`,
                color: theme.palette.custom.main,
                width: '105px',
                marginLeft: '20px',
              }}
            >
              Filters
            </Button>
          </Grid>
          {/* <Grid item xs={12} sm={6}  xl={1}  mt={4}>
         
          </Grid> */}
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
