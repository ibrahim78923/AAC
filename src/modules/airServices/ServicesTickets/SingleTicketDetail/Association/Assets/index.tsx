import CommonDrawer from '@/components/CommonDrawer';
import { CircularProgress, Typography } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import TanstackTable from '@/components/Table/TanstackTable';
import { TYPE_VALUES } from './Assets.data';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { FormProvider, RHFRadioGroup } from '@/components/ReactHookForm';
import AddAssets from './AddAssets';
import { AlertModals } from '@/components/AlertModals';
import AddPurchaseOrder from './AddPurchaseOrder';
import useAssets from './useAssets';
import { RecordCountChip } from '@/components/Chip/RecordCountChip';
import { TICKET_TYPE } from '@/constants/services';

export default function Assets({
  ticketType,
  isDrawerOpen,
  setIsDrawerOpen,
}: any) {
  const {
    onClose,
    submitHandler,
    selected,
    methods,
    type,
    setSelected,
    associateAssetsColumns,
    associateOrderColumns,
    dataAssets,
    isLoadingAssets,
    isFetchingAssets,
    isErrorAssets,
    isSuccessAssets,
    dataOrder,
    isLoadingOrder,
    isFetchingOrder,
    isErrorOrder,
    isSuccessOrder,
    deleteModal,
    setDeleteModal,
    removeTicketsAssociatesAssets,
    removeTicketsAssociatesOrder,
    postRemoveAssociateTicketsStatus,
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
            !selected?.length || postRemoveAssociateTicketsStatus?.isLoading
          }
          isLoading={postRemoveAssociateTicketsStatus?.isLoading}
          disabledCancelBtn={postRemoveAssociateTicketsStatus?.isLoading}
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

          {type === TYPE_VALUES?.ASSETS ? (
            <AddAssets setSelected={setSelected} selected={selected} />
          ) : (
            <AddPurchaseOrder setSelected={setSelected} selected={selected} />
          )}
        </CommonDrawer>
      )}

      <PermissionsGuard
        permissions={[AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ASSET_LIST_VIEW]}
      >
        <RecordCountChip
          recordName="Assets Inventory"
          isCountLoading={isLoadingAssets || isFetchingAssets}
          totalCount={dataAssets?.length}
        />
        <TanstackTable
          columns={associateAssetsColumns}
          data={dataAssets}
          isSuccess={isSuccessAssets}
          isError={isErrorAssets}
          isFetching={isFetchingAssets}
          isLoading={isLoadingAssets}
        />

        {ticketType === TICKET_TYPE?.SR && (
          <>
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
                {isLoadingOrder || isFetchingOrder ? (
                  <CircularProgress size={18} />
                ) : dataOrder?.length < 10 ? (
                  `0${dataOrder?.length}`
                ) : (
                  dataOrder?.length
                )}
              </Typography>
              Assets Purchase Order
            </Typography>

            <TanstackTable
              columns={associateOrderColumns}
              data={dataOrder}
              isSuccess={isSuccessOrder}
              isError={isErrorOrder}
              isFetching={isFetchingOrder}
              isLoading={isLoadingOrder}
            />
          </>
        )}
      </PermissionsGuard>

      {deleteModal?.asset && (
        <AlertModals
          open={deleteModal?.asset}
          message="Are you sure you want to detach this asset?"
          handleClose={() =>
            setDeleteModal({
              asset: false,
              order: false,
            })
          }
          handleSubmitBtn={() => removeTicketsAssociatesAssets?.()}
          type={ALERT_MODALS_TYPE?.DELETE}
          cancelBtnText="Cancel"
          submitBtnText="Detach"
          loading={postRemoveAssociateTicketsStatus?.isLoading}
          disableCancelBtn={postRemoveAssociateTicketsStatus?.isLoading}
        />
      )}

      {deleteModal?.order && (
        <AlertModals
          open={deleteModal?.order}
          message="Are you sure you want to detach this asset?"
          handleClose={() =>
            setDeleteModal({
              asset: false,
              order: false,
            })
          }
          handleSubmitBtn={() => removeTicketsAssociatesOrder?.()}
          type={ALERT_MODALS_TYPE?.DELETE}
          cancelBtnText="Cancel"
          submitBtnText="Detach"
          loading={postRemoveAssociateTicketsStatus?.isLoading}
          disableCancelBtn={postRemoveAssociateTicketsStatus?.isLoading}
        />
      )}
    </>
  );
}
