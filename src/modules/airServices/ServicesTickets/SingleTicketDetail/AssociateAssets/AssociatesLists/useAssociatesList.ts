import { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import { PAGINATION } from '@/config';
import {
  useDeleteTicketsAssociatesAssetsMutation,
  useLazyGetTicketsAssociatesAssetsQuery,
} from '@/services/airServices/tickets/single-ticket-details/associates-assets';
import { useRouter } from 'next/router';
import { buildQueryParams, errorSnackbar, successSnackbar } from '@/utils/api';

export const useAssociatesLists: any = () => {
  const theme = useTheme();
  const router = useRouter();
  const [deleteModal, setDeleteModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState<any>(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [selectedAsset, setSelectedAsset] = useState('');
  const [
    deleteTicketsAssociatesAssetsTrigger,
    deleteTicketsAssociatesAssetsStatus,
  ] = useDeleteTicketsAssociatesAssetsMutation();
  const { ticketId } = router?.query;
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

  const setAssetId = (id: any) => {
    setSelectedAsset(id);
    setDeleteModal(true);
  };

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
  return {
    theme,
    deleteModal,
    setDeleteModal,
    openDrawer,
    setOpenDrawer,
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    setPage,
    setPageLimit,
    deleteTicketsAssociatesAssets,
    setAssetId,
    router,
    deleteTicketsAssociatesAssetsStatus,
  };
};
