import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import {
  useGetAssociatesAssetsQuery,
  usePostTicketsAssociatesAssetsMutation,
} from '@/services/airServices/tickets/single-ticket-details/associates-assets';
import { drawerTableColumns } from './AddAssociationsDrawer.data';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

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
      enqueueSnackbar('Please select at least one asset', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
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
      const response = await postTicketsAssociatesAssetsTrigger(
        postTicketsAssociatesAssetsParameter,
      )?.unwrap();
      enqueueSnackbar(response?.message ?? 'Asset associated successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      closeAssetsAssociate?.();
    } catch (error: any) {
      enqueueSnackbar(error?.response?.message ?? 'Asset not associated', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
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
