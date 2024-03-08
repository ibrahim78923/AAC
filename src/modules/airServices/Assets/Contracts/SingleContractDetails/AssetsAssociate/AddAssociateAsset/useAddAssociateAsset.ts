import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import {
  useLazyGetInventoryListQuery,
  usePutAssetAssociateMutation,
} from '@/services/airServices/assets/contracts/single-contract-details/asset-associates';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { PAGINATION } from '@/config';
import { addAssociateAssetColumns } from './AddAssociateAsset.data';
import { errorSnackbar } from '@/utils/api';

export const useAddAssociateAsset = () => {
  const router = useRouter();
  const theme = useTheme();
  const [activeCheck, setActiveCheck] = useState<any>([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [searchBy, setSearchBy] = useState('');
  const [
    getAssetSoftwareList,
    { data, isLoading, isError, isFetching, isSuccess },
  ] = useLazyGetInventoryListQuery<any>();
  const assetsListData = data?.data?.inventories;
  const meta = data?.data?.meta;
  const queryParams = new URLSearchParams();
  queryParams?.append('page', page + '');
  queryParams?.append('limit', pageLimit + '');
  queryParams?.append('search', searchBy + '');
  const getSoftwareList = async () => {
    await getAssetSoftwareList(queryParams)?.unwrap();
  };
  useEffect(() => {
    getSoftwareList();
  }, [page, pageLimit, searchBy]);
  const [postAssetAssociateTrigger, { isLoading: postLoading }] =
    usePutAssetAssociateMutation();
  const searchParams = useSearchParams();
  const contractId = searchParams?.get('contractId');
  const selectedAsset = activeCheck?.find((item: any) => item);
  const putParams = {
    contractId: contractId,
    body: { associatedAsset: selectedAsset?._id },
  };
  if (activeCheck?.length > 1) {
    errorSnackbar('You can associate only one asset');
  }
  const disableAllocate = activeCheck?.length !== 1;
  const handleAllocateClick = async () => {
    try {
      const response: any =
        await postAssetAssociateTrigger(putParams)?.unwrap();
      enqueueSnackbar(response?.message && 'Asset Associated Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      router?.back();
    } catch (error: any) {
      enqueueSnackbar(error?.message ?? 'Something Went Wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const handleCancelBtn = () => {
    router?.back();
  };
  const tableColumns = addAssociateAssetColumns(
    activeCheck,
    setActiveCheck,
    assetsListData,
  );
  return {
    theme,
    activeCheck,
    setActiveCheck,
    handleAllocateClick,
    handleCancelBtn,
    tableColumns,
    pageLimit,
    setPageLimit,
    page,
    setPage,
    searchBy,
    setSearchBy,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    meta,
    assetsListData,
    postLoading,
    disableAllocate,
  };
};
