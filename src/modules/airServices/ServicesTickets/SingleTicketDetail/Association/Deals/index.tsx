import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import useDeals from './useDeals';
import AddDeals from './AddDeals';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import ViewDeal from './ViewDeal';
import { DataRecordCount } from '@/components/DataRecordCount';

export default function Deals({ isDrawerOpen, setIsDrawerOpen }: any) {
  const {
    onClose,
    submitHandler,
    selected,
    setSelected,
    associateDealsColumns,
    modalId,
    onModalClose,
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    postRemoveAssociateTicketsStatus,
    removeTicketsAssociatesDeals,
    setModalId,
  } = useDeals({
    setIsDrawerOpen,
  });

  return (
    <>
      {isDrawerOpen?.deal && (
        <CommonDrawer
          isDrawerOpen={isDrawerOpen?.deal}
          onClose={onClose}
          title={'Add Associate Deals'}
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
          <AddDeals setSelected={setSelected} selected={selected} />
        </CommonDrawer>
      )}

      <PermissionsGuard
        permissions={[AIR_SERVICES_TICKETS_TICKETS_DETAILS?.DEALS_LIST_VIEW]}
      >
        <DataRecordCount
          recordName="Deals"
          isCountLoading={isLoading || isFetching}
          totalCount={data?.length}
        />
        <TanstackTable
          columns={associateDealsColumns}
          data={data}
          isSuccess={isSuccess}
          isError={isError}
          isFetching={isFetching}
          isLoading={isLoading}
        />
      </PermissionsGuard>

      {modalId?.delete && (
        <AlertModals
          open={modalId?.delete}
          message="Are you sure you want to detach this deal?"
          handleClose={() => onModalClose?.()}
          handleSubmitBtn={() => removeTicketsAssociatesDeals?.()}
          type={ALERT_MODALS_TYPE?.DELETE}
          cancelBtnText="Cancel"
          submitBtnText="Detach"
          loading={postRemoveAssociateTicketsStatus?.isLoading}
          disableCancelBtn={postRemoveAssociateTicketsStatus?.isLoading}
        />
      )}

      {modalId?.view && <ViewDeal modalId={modalId} setModalId={setModalId} />}
    </>
  );
}
