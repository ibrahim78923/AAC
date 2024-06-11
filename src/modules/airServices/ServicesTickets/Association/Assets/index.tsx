import CommonDrawer from '@/components/CommonDrawer';
import { drawerInitialState } from '../Association.data';
import { Typography, useTheme } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import TanstackTable from '@/components/Table/TanstackTable';
import { TYPE_VALUES, getAssociateAssetsColumns } from './Assets.data';
import { useRouter } from 'next/router';
import {
  useDeleteTicketsAssociatesAssetsMutation,
  useLazyGetTicketsAssociatesAssetsQuery,
  usePostTicketsAssociatesAssetsMutation,
} from '@/services/airServices/tickets/single-ticket-details/association';
import { PAGINATION } from '@/config';
import { useEffect, useState } from 'react';
import { buildQueryParams, errorSnackbar, successSnackbar } from '@/utils/api';
import { ALERT_MODALS_TYPE, TICKET_TYPE } from '@/constants/strings';
import { FormProvider, RHFRadioGroup } from '@/components/ReactHookForm';
import { useForm, useWatch } from 'react-hook-form';
import AddAssets from './AddAssets';
import { AlertModals } from '@/components/AlertModals';

export default function Assets({
  ticketType,
  isDrawerOpen,
  setIsDrawerOpen,
}: any) {
  const theme: any = useTheme();
  const router = useRouter();

  const [selected, setSelected] = useState([]);

  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedAsset, setSelectedAsset] = useState('');

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const { ticketId } = router?.query;

  const setAssetId = (id: any) => {
    setSelectedAsset(id);
    setDeleteModal(true);
  };

  const associateAssetsColumns = getAssociateAssetsColumns({
    theme,
    router,
    setAssetId,
  });

  const [
    lazyGetTicketsAssociatesAssetsTrigger,
    { data, isLoading, isFetching, isError, isSuccess },
  ] = useLazyGetTicketsAssociatesAssetsQuery<any>();

  const getTicketsAssociatesAssetsListData = async (
    currentPage: any = page,
  ) => {
    const additionalParams = [
      ['page', currentPage + ''],
      ['limit', pageLimit + ''],
      ['ticketId', ticketId],
    ];

    const getTicketsAssociatesAssetsParam: any =
      buildQueryParams(additionalParams);

    const getTicketsAssociatesAssetsParameter = {
      queryParams: getTicketsAssociatesAssetsParam,
    };

    try {
      await lazyGetTicketsAssociatesAssetsTrigger(
        getTicketsAssociatesAssetsParameter,
      )?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    getTicketsAssociatesAssetsListData();
  }, [page, pageLimit]);

  const methods = useForm({
    defaultValues: { type: TYPE_VALUES?.ASSETS },
  });
  const { control } = methods;

  const type = useWatch({
    control,
    name: 'type',
    defaultValue: TYPE_VALUES?.ASSETS,
  });

  useEffect(() => {
    setSelected([]);
  }, [type]);

  const onClose = () => {
    setIsDrawerOpen(drawerInitialState);
    setSelected([]);
  };

  const [
    postTicketsAssociatesAssetsTrigger,
    postTicketsAssociatesAssetsStatus,
  ] = usePostTicketsAssociatesAssetsMutation();

  const [
    deleteTicketsAssociatesAssetsTrigger,
    deleteTicketsAssociatesAssetsStatus,
  ] = useDeleteTicketsAssociatesAssetsMutation();

  const deleteTicketsAssociatesAssets = async () => {
    const deleteTicketsAssociatesAssetsParameter = {
      queryParams: {
        id: ticketId,
        assetId: selectedAsset,
      },
    };
    try {
      await deleteTicketsAssociatesAssetsTrigger(
        deleteTicketsAssociatesAssetsParameter,
      )?.unwrap();
      successSnackbar('Assets detach successfully');
      setDeleteModal?.(false);
      const newPage = data?.data?.tickets?.length === 1 ? 1 : page;
      setPage?.(newPage);
      await getTicketsAssociatesAssetsListData?.(newPage);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      setDeleteModal?.(false);
    }
  };

  const submitHandler = async () => {
    if (type === TYPE_VALUES?.PURCHASE_ORDER) {
      return;
    } else {
      const body = {
        id: ticketId,
        assetIds: selected,
      };
      const postTicketsAssociatesAssetsParameter = {
        body,
      };
      try {
        await postTicketsAssociatesAssetsTrigger(
          postTicketsAssociatesAssetsParameter,
        )?.unwrap();
        successSnackbar('Asset(s) Associated Successfully');
        onClose?.();
      } catch (error: any) {
        errorSnackbar(error?.data?.message);
      }
    }
  };

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
            <>PURCHASE_ORDER</>
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
