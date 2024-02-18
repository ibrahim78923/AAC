import { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import { PAGINATION } from '@/config';
import {
  useDeleteTicketsAssociatesAssetsMutation,
  useGetTicketsAssociatesAssetsQuery,
} from '@/services/airServices/tickets/single-ticket-details/associates-assets';
import { useRouter } from 'next/router';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useAssociatesLists: any = (props: any) => {
  const { setTotalAssets } = props;
  const theme = useTheme();
  const router = useRouter();
  const [deleteModal, setDeleteModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState<any>(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [selectedAsset, setSelectedAsset] = useState('');
  const [deleteTicketsAssociatesAssetsTrigger] =
    useDeleteTicketsAssociatesAssetsMutation();
  const { ticketId } = router?.query;

  const getTicketsAssociatesAssetsParameter = {
    queryParams: {
      page,
      limit: pageLimit,
      ticketId,
    },
  };

  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetTicketsAssociatesAssetsQuery(getTicketsAssociatesAssetsParameter, {
      refetchOnMountOrArgChange: true,
    });
  const setAssetId = (id: any) => {
    setSelectedAsset(id);
    setDeleteModal(true);
  };

  useEffect(() => {
    setTotalAssets(
      data?.data?.tickets?.length > 1
        ? data?.data?.meta?.total
        : !!data?.data?.tickets?.[0]?.associateAssetsDetails?._id
          ? data?.data?.meta?.total
          : 0,
    );
    return () => setTotalAssets('');
  }, [data]);

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
    } catch (error: any) {
      errorSnackbar();
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
  };
};
