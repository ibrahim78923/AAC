import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { CircularProgress, Typography } from '@mui/material';
import useDeals from './useDeals';
import AddDeals from './AddDeals';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import ViewDeal from './ViewDeal';

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
        >
          <AddDeals setSelected={setSelected} selected={selected} />
        </CommonDrawer>
      )}

      <PermissionsGuard
        permissions={[AIR_SERVICES_TICKETS_TICKETS_DETAILS?.DEALS_LIST_VIEW]}
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
            {isLoading || isFetching ? (
              <CircularProgress size={18} />
            ) : data?.length < 10 ? (
              `0${data?.length}`
            ) : (
              data?.length
            )}
          </Typography>
          Deals
        </Typography>

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
