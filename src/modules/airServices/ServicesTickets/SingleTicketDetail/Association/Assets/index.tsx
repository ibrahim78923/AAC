import CommonDrawer from '@/components/CommonDrawer';
import { Typography } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import TanstackTable from '@/components/Table/TanstackTable';
import { TYPE_VALUES } from './Assets.data';
import { ALERT_MODALS_TYPE, TICKET_TYPE } from '@/constants/strings';
import { FormProvider, RHFRadioGroup } from '@/components/ReactHookForm';
import AddAssets from './AddAssets';
import { AlertModals } from '@/components/AlertModals';
import AddPurchaseOrder from './AddPurchaseOrder';
import useAssets from './useAssets';

export default function Assets({
  ticketType,
  isDrawerOpen,
  setIsDrawerOpen,
}: any) {
  const {
    onClose,
    submitHandler,
    selected,
    postTicketsAssociatesAssetsStatus,
    methods,
    type,
    setSelected,
    data,
    associateAssetsColumns,
    isSuccess,
    isLoading,
    isError,
    isFetching,
    setPage,
    setPageLimit,
    deleteModal,
    setDeleteModal,
    deleteTicketsAssociatesAssets,
    deleteTicketsAssociatesAssetsStatus,
  } = useAssets({ setIsDrawerOpen });

  return (
    <>
      {isDrawerOpen?.asset && (
        <CommonDrawer
          isDrawerOpen={isDrawerOpen?.asset}
          onClose={onClose}
          title={'Add Associate Assets'}
          footer
          isOk
          okText={'Associate'}
          submitHandler={submitHandler}
          isDisabled={
            !selected?.length || postTicketsAssociatesAssetsStatus?.isLoading
          }
          isLoading={postTicketsAssociatesAssetsStatus?.isLoading}
        >
          {ticketType === TICKET_TYPE?.SR && (
            <FormProvider methods={methods}>
              <RHFRadioGroup
                name={'type'}
                options={[
                  { value: TYPE_VALUES?.ASSETS, label: 'Assets' },
                  {
                    value: TYPE_VALUES?.PURCHASE_ORDER,
                    label: 'Purchase Order',
                  },
                ]}
              />
            </FormProvider>
          )}

          {type === TYPE_VALUES?.PURCHASE_ORDER ? (
            <AddPurchaseOrder setSelected={setSelected} selected={selected} />
          ) : (
            <AddAssets setSelected={setSelected} selected={selected} />
          )}
        </CommonDrawer>
      )}

      <PermissionsGuard
        permissions={[AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ASSET_LIST_VIEW]}
      >
        <Typography variant={'h5'}>
          <Typography
            variant={'body1'}
            component={'span'}
            bgcolor={'secondary.main'}
            borderRadius={1}
            p={0.4}
            color={'common.white'}
            mr={0.5}
          >
            {data?.data?.tickets?.length < 10
              ? `0${data?.data?.tickets?.length}`
              : data?.data?.tickets?.length}
          </Typography>
          Assets
        </Typography>

        <TanstackTable
          columns={associateAssetsColumns}
          data={
            data?.data?.tickets?.length > 1
              ? data?.data?.tickets
              : !!data?.data?.tickets?.[0]?.associateAssetsDetails?._id
                ? data?.data?.tickets
                : []
          }
          isPagination
          isSuccess={isSuccess}
          isError={isError}
          isFetching={isFetching}
          isLoading={isLoading}
          currentPage={
            data?.data?.tickets?.length > 1
              ? data?.data?.meta?.page
              : !!data?.data?.tickets?.[0]?.associateAssetsDetails?._id
                ? data?.data?.meta?.page
                : 0
          }
          count={
            data?.data?.tickets?.length > 1
              ? data?.data?.meta?.pages
              : !!data?.data?.tickets?.[0]?.associateAssetsDetails?._id
                ? data?.data?.meta?.pages
                : 0
          }
          totalRecords={
            data?.data?.tickets?.length > 1
              ? data?.data?.meta?.total
              : !!data?.data?.tickets?.[0]?.associateAssetsDetails?._id
                ? data?.data?.meta?.total
                : 0
          }
          pageLimit={data?.data?.meta?.limit}
          onPageChange={(page: any) => setPage(page)}
          setPage={setPage}
          setPageLimit={setPageLimit}
        />
      </PermissionsGuard>

      {deleteModal && (
        <AlertModals
          open={deleteModal}
          message="Are you sure you want to detach this asset?"
          handleClose={() => setDeleteModal(false)}
          handleSubmitBtn={() => deleteTicketsAssociatesAssets?.()}
          type={ALERT_MODALS_TYPE?.DELETE}
          cancelBtnText="Cancel"
          submitBtnText="Detach"
          loading={deleteTicketsAssociatesAssetsStatus?.isLoading}
          disableCancelBtn={deleteTicketsAssociatesAssetsStatus?.isLoading}
        />
      )}
    </>
  );
}
