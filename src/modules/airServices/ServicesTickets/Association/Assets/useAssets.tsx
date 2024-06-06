import { drawerInitialState } from '../Association.data';
import { useTheme } from '@mui/material';
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
import { useForm, useWatch } from 'react-hook-form';

export default function useAssets({ setIsDrawerOpen }: any) {
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
      successSnackbar('Asset Detached Successfully!');
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
        successSnackbar('Asset(s) Associated Successfully!');
        onClose?.();
      } catch (error: any) {
        errorSnackbar(error?.data?.message);
      }
    }
  };

  return {
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
  };
}
