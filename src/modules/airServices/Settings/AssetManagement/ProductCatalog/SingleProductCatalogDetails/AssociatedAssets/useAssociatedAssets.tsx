import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { getAssociatedAssetsColumns } from './AssociatedAssets.data';
import { useRouter } from 'next/router';
import { PAGINATION } from '@/config';
import {
  useDeleteProductCatalogAssociatedAssetMutation,
  useGetProductCatalogAssociatedAssetListQuery,
} from '@/services/airServices/settings/asset-management/product-catalog';

export const useAssociatedAssets = () => {
  const router = useRouter();

  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);

  const { productCatalogId } = router?.query;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<any>({
    open: false,
    id: '',
  });

  const [addModalOpen, setAddModalOpen] = useState(false);

  const associatedAssetsColumns =
    getAssociatedAssetsColumns(setIsDeleteModalOpen);

  const getProductCatalogAssociatedAssetParameter = {
    queryParams: {
      productCatalogId: productCatalogId,
      page: page,
      limit: limit,
    },
  };

  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetProductCatalogAssociatedAssetListQuery(
      getProductCatalogAssociatedAssetParameter,
    );

  const [deleteVendor] = useDeleteProductCatalogAssociatedAssetMutation();

  const handleSubmitDelete = async () => {
    const updatedData = {
      queryParams: { assetId: isDeleteModalOpen?.id, id: productCatalogId },
    };

    try {
      const res = await deleteVendor(updatedData)?.unwrap();
      setIsDeleteModalOpen?.({ open: false, id: '' });
      enqueueSnackbar(res?.message ?? 'Asset Deleted Successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      setIsDeleteModalOpen?.({ open: false, id: '' });
      enqueueSnackbar(error?.data?.message?.[0] ?? 'Something Went Wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    associatedAssetsColumns,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleSubmitDelete,
    setAddModalOpen,
    addModalOpen,
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    setPage,
    setLimit,
  };
};
