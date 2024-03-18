import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import {
  useGetAssociatesAssetsQuery,
  usePostTicketsAssociatesAssetsMutation,
} from '@/services/airServices/tickets/single-ticket-details/associates-assets';
import { drawerTableColumns } from './AddAssociationsDrawer.data';
import { useRouter } from 'next/router';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useAssociationsDrawer = (props: any) => {
  const { setDrawerOpen } = props;
  const router = useRouter();
  const theme = useTheme();
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');

  const [selectedAssetToAssociateList, setSelectedAssetToAssociateList] =
    useState([]);

  const { ticketId } = router?.query;
  const [
    postTicketsAssociatesAssetsTrigger,
    postTicketsAssociatesAssetsStatus,
  ] = usePostTicketsAssociatesAssetsMutation();

  const getAssociatesAssetsParameter = {
    queryParams: {
      page,
      limit: pageLimit,
      search,
    },
  };
  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetAssociatesAssetsQuery(getAssociatesAssetsParameter, {
      refetchOnMountOrArgChange: true,
    });
  const associateAssetsColumns = drawerTableColumns(
    selectedAssetToAssociateList,
    setSelectedAssetToAssociateList,
    data?.data?.inventories,
    theme,
  );

  useEffect(() => {
    setSelectedAssetToAssociateList([]);
  }, [page, pageLimit, search]);

  const submitAssetAssociationList = async () => {
    if (!!!selectedAssetToAssociateList?.length) {
      errorSnackbar('Please select at least one asset');
      return;
    }

    const body = {
      id: ticketId,
      assetIds: selectedAssetToAssociateList,
    };
    const postTicketsAssociatesAssetsParameter = {
      body,
    };
    try {
      await postTicketsAssociatesAssetsTrigger(
        postTicketsAssociatesAssetsParameter,
      )?.unwrap();
      successSnackbar('Associate assets successfully');
      closeAssetsAssociate?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeAssetsAssociate = () => {
    setSelectedAssetToAssociateList([]);
    setDrawerOpen(false);
  };

  return {
    selectedAssetToAssociateList,
    setSelectedAssetToAssociateList,
    theme,
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    setPageLimit,
    setPage,
    associateAssetsColumns,
    submitAssetAssociationList,
    closeAssetsAssociate,
    postTicketsAssociatesAssetsStatus,
    search,
    setSearch,
  };
};
