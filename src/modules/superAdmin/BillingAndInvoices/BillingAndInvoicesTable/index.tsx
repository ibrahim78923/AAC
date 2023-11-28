import { Grid, Typography, Button, Box } from '@mui/material';

import Search from '@/components/Search';
import GenerateInvoice from '../GenerateInvoice';
import TanstackTable from '@/components/Table/TanstackTable';
import ViewBillingDetails from '../ViewBillingDetails';
import EditForm from '../EditForm';
import MenuItems from './MenuOptions';

import useBillingAndInvoices from './useBillingAndInvoices';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { styles } from '../Invoices/Invoices.style';
import { FilterSharedIcon } from '@/assets/icons';
import { dataArray } from './BillingAndInvoices.data';
import { v4 as uuidv4 } from 'uuid';
import { RefreshIcon } from '@/assets/icons';

const BillingAndInvoicesTable = () => {
  const {
    getRowValues,
    isChecked,
    setIsChecked,
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
    assignPlanTableData,
    setIsGetRowValues,
    isGetRowValues,
    handleSubmit,
    onSubmit,
    methods,
    handleRefresh,
    setPage,
    setPageLimit,
  } = useBillingAndInvoices();

  return (
    <Grid sx={styles?.invoicesTableWrapper}>
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
              disabled={isChecked}
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
                sx={{
                  border: '1px solid #D1D5DB',
                  marginLeft: '10px',
                  height: '36px',
                }}
                onClick={handleRefresh}
              >
                <RefreshIcon />
              </Button>

              <Button
                onClick={() => setIsOpenFilter(true)}
                startIcon={<FilterSharedIcon />}
                sx={{
                  border: `1px solid ${theme?.palette?.custom?.dark}`,
                  color: theme?.palette?.custom?.main,
                  width: '105px',
                  marginLeft: '10px',
                  height: '36px',
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
          isGetRowValues={isGetRowValues?.row?.original}
        />
      )}
      <Grid item xs={12} sm={12} mt={1}>
        <TanstackTable
          columns={getRowValues}
          data={assignPlanTableData?.data}
          totalRecords={assignPlanTableData?.data?.meta?.total}
          onPageChange={(page: any) => setPage(page)}
          setPage={setPage}
          setPageLimit={setPageLimit}
          count={assignPlanTableData?.data?.meta?.pages}
          isPagination
        />
      </Grid>
      {/* <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} /> */}
      {isOpenDrawer && (
        <EditForm
          isOpenDrawer={isOpenDrawer}
          onClose={setIsOpenDrawer}
          isEditModal={isEditModal}
          isGetRowValues={isGetRowValues}
          setIsGetRowValues={setIsGetRowValues}
          setIsChecked={setIsChecked}
        />
      )}

      <CommonDrawer
        isDrawerOpen={isOpenFilter}
        onClose={() => setIsOpenFilter(false)}
        title={'Filter'}
        okText={'Apply'}
        isOk
        cancelText={'Cancel'}
        footer
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={4}>
              {dataArray()?.map((item: any, index: any) => (
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={uuidv4()}
                  sx={{
                    paddingTop:
                      index === 0 ? '40px !important' : '17px !important',
                  }}
                >
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </Grid>
  );
};

export default BillingAndInvoicesTable;
