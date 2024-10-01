import { Grid, Typography, Button, Box, Tooltip } from '@mui/material';

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
import { FilterSharedIcon, RefreshTasksIcon } from '@/assets/icons';
import { dataArray } from './BillingAndInvoices.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SUPER_ADMIN_BILLING_INVOICES_PERMISSIONS } from '@/constants/permission-keys';
import { AlertModals } from '@/components/AlertModals';
import { enqueueSnackbar } from 'notistack';
import { usePatchUnassignPlanMutation } from '@/services/superAdmin/billing-invoices';
import { DataItemOptionI } from './billingandinvoices.interface';

const BillingAndInvoicesTable = () => {
  const {
    getRowValues,
    isChecked,
    setIsChecked,
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
    isLoading,
    isFetching,
    setIsGetRowValues,
    isGetRowValues,
    handleSubmit,
    onSubmit,
    methods,
    handleRefresh,
    setPage,
    setPageLimit,
    isUnassignPlan,
    setIsUnassignPlan,
  } = useBillingAndInvoices();

  const [updateAssignPlan, { isLoading: loadingUpdateAssignPlan }] =
    usePatchUnassignPlanMutation();

  const handleCloseModalDelete = () => {
    setIsUnassignPlan(false);
  };

  const handleDeleteSubmit = async () => {
    try {
      await updateAssignPlan({
        organizationPlanId: isGetRowValues?.row?.original?._id,
      })?.unwrap();
      handleCloseModalDelete();
      setIsGetRowValues('');
      enqueueSnackbar('plan unassign successfully', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  return (
    <Grid sx={styles?.invoicesTableWrapper}>
      <PermissionsGuard
        permissions={[
          SUPER_ADMIN_BILLING_INVOICES_PERMISSIONS?.BILLING_INVOICES_LIST,
        ]}
      >
        <Grid sx={{ padding: '15px 15px 0 15px' }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4">Plan Assignment</Typography>
            </Grid>
            <PermissionsGuard
              permissions={[
                SUPER_ADMIN_BILLING_INVOICES_PERMISSIONS?.ASSIGN_PLAN,
              ]}
            >
              <Grid item xs={12} sm={6} sx={{ textAlign: 'end' }}>
                <Button
                  onClick={() => {
                    setIsOpenDrawer(true);
                    setIsEditModal(false);
                    setIsGetRowValues([]);
                    setIsChecked(false);
                  }}
                  variant="contained"
                  className="small"
                  sx={{ width: { xs: '100%', sm: 'auto' } }}
                >
                  Assign Plan
                </Button>
              </Grid>
            </PermissionsGuard>
          </Grid>

          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <Grid item xs={12} md={6} xl={6} mt={2}>
              <PermissionsGuard
                permissions={[
                  SUPER_ADMIN_BILLING_INVOICES_PERMISSIONS?.BILLING_SEARCH_AND_FILTER,
                ]}
              >
                <Search
                  setSearchBy={setSearchByClientName}
                  label="Search by company"
                  size="small"
                />
              </PermissionsGuard>
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
                  setIsUnassignPlan={setIsUnassignPlan}
                  planStatus={isGetRowValues?.row?.original?.status}
                />

                <Tooltip title={'Refresh Filter'}>
                  <Button
                    variant="outlined"
                    color="inherit"
                    className="small"
                    onClick={handleRefresh}
                    sx={{ marginLeft: '10px' }}
                  >
                    <RefreshTasksIcon />
                  </Button>
                </Tooltip>
                <PermissionsGuard
                  permissions={[
                    SUPER_ADMIN_BILLING_INVOICES_PERMISSIONS?.BILLING_SEARCH_AND_FILTER,
                  ]}
                >
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
                </PermissionsGuard>
              </Box>
            </Grid>
          </Grid>
          {isShowGenerateInvoice && <GenerateInvoice />}
        </Grid>
      </PermissionsGuard>
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
          data={assignPlanTableData?.data?.organizationplans}
          totalRecords={assignPlanTableData?.data?.meta?.total}
          onPageChange={(page: number) => setPage(page)}
          setPage={setPage}
          setPageLimit={setPageLimit}
          count={assignPlanTableData?.data?.meta?.pages}
          isPagination
          isLoading={isLoading || isFetching}
          currentPage={assignPlanTableData?.data?.meta?.page}
          pageLimit={assignPlanTableData?.data?.meta?.limit}
        />
      </Grid>
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
        isLoading={isLoading || isFetching}
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={4}>
              {dataArray()?.map((item: any, index: number) => (
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={item?.componentProps?.name}
                  sx={{
                    paddingTop:
                      index === 0 ? '40px !important' : '17px !important',
                  }}
                >
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: DataItemOptionI) => (
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

      <AlertModals
        message={'Are you sure you want to Unassign the plan?'}
        type={'Unassigned plan'}
        open={isUnassignPlan}
        handleClose={handleCloseModalDelete}
        handleSubmitBtn={handleDeleteSubmit}
        loading={loadingUpdateAssignPlan}
      />
    </Grid>
  );
};

export default BillingAndInvoicesTable;
