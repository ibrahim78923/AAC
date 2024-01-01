import { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import { enqueueSnackbar } from 'notistack';
import { PAGINATION } from '@/config';
import {
  useDeleteTicketsAssociatesAssetsMutation,
  useGetTicketsAssociatesAssetsQuery,
} from '@/services/airServices/tickets/single-ticket-details/associates-assets';
import { useRouter } from 'next/router';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

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
  }, [data]);
  //TODO: we will use it in integration
  const deleteTicketsAssociatesAssets = async () => {
    const deleteTicketsAssociatesAssetsParameter = {
      queryParams: {
        id: ticketId,
        assetId: selectedAsset,
      },
    };
    try {
      const response: any = await deleteTicketsAssociatesAssetsTrigger(
        deleteTicketsAssociatesAssetsParameter,
      )?.unwrap();
      enqueueSnackbar(response?.message ?? 'Assets detach successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setDeleteModal?.(false);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.error ?? 'Assets not detach', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
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
  };
};
