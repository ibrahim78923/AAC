import { Grid, Typography, Button, Box } from '@mui/material';

import Search from '@/components/Search';
import TanstackTable from '@/components/Tabel/TanstackTable';
import CustomPagination from '@/components/CustomPagination';

import GenerateInvoice from '../GenerateInvoice';
import ViewBillingDetails from '../ViewBillingDetails';
import EditForm from '../EditForm';
import MenuItems from './MenuOptions';
import Filters from './Filters';

import { BillingAndInvoicesTableData } from '@/mock/modules/superAdmin/BillingAndDetails';

import { FilterSharedIcon } from '@/assets/icons';
import useBillingAndInvoices from './useBillingAndInvoices';
import { styles } from '../Invoices/Invoices.style';

const BillingAndInvoicesTable = () => {
  const {
    getRowValues,
    isChecked,
    searchByClientName,
    setSearchByClientName,
    isViewDetailOpen,
    setIsViewDeailOpen,
    isOpenDrawer,
    setIsOpenDrawer,
    isOpenFilter,
    setIsOpenFilter,
    isShowGenerateInvoice,
    setisShowGenerateInvoice,
    theme,
    isShowViewBillingDetails,
    setIsShowViewBillingDetails,
    setIsEditModal,
    isEditModal,
  } = useBillingAndInvoices();

  return (
    <Grid sx={styles.invoicesTableWrapper}>
      <Grid sx={{ padding: '15px 15px 0 15px' }}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4">Plan Assignment</Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ textAlign: 'end' }}>
            <Button
              onClick={() => {
                setIsOpenDrawer(true);
                setIsEditModal(false);
              }}
              variant="contained"
              className="small"
            >
              Assign Plan
            </Button>
          </Grid>
        </Grid>

        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Grid item xs={12} md={6} xl={6} mt={2}>
            <Search
              searchBy={searchByClientName}
              setSearchBy={setSearchByClientName}
              label="Search Here"
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={6} xl={6} mt={2}>
            <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
              <MenuItems
                isViewDetailOpen={isViewDetailOpen}
                setIsViewDeailOpen={setIsViewDeailOpen}
                setIsOpenDrawer={setIsOpenDrawer}
                setIsShowViewBillingDetails={setIsShowViewBillingDetails}
                setisShowGenerateInvoice={setisShowGenerateInvoice}
                isChecked={isChecked}
                setIsEditModal={setIsEditModal}
              />
              <Button
                onClick={() => setIsOpenFilter(true)}
                startIcon={<FilterSharedIcon />}
                sx={{
                  border: `1px solid ${theme.palette.custom.dark}`,
                  color: theme.palette.custom.main,
                  width: '105px',
                  marginLeft: '10px',
                  '@media (max-width:400px)': {
                    width: '100% !important',
                    marginTop: '10px',
                    marginLeft: '0px !important',
                  },
                }}
              >
                Filters
              </Button>
            </Box>
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
      <Grid item xs={12} sm={12} mt={1}>
        <TanstackTable
          columns={getRowValues}
          data={BillingAndInvoicesTableData}
        />
      </Grid>
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
      {isOpenDrawer && (
        <EditForm
          isOpenDrawer={isOpenDrawer}
          onClose={setIsOpenDrawer}
          isEditModal={isEditModal}
        />
      )}
      {isOpenFilter && (
        <Filters isOpenDrawer={isOpenFilter} onClose={setIsOpenFilter} />
      )}
    </Grid>
  );
};

export default BillingAndInvoicesTable;
