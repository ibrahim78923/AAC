import { useState } from 'react';
import { getAssociatedAssetsColumns } from './AssociatedAssets.data';
import { useRouter } from 'next/router';
import { PAGINATION } from '@/config';
import {
  useDeleteProductCatalogAssociatedAssetMutation,
  useGetProductCatalogAssociatedAssetListQuery,
} from '@/services/airServices/settings/asset-management/product-catalog';
import { errorSnackbar, successSnackbar } from '@/utils/api';

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
      {
        refetchOnMountOrArgChange: true,
        skip: !!!productCatalogId,
      },
    );

  const [deleteAssociateAssetTrigger, deleteAssociateAssetStatus] =
    useDeleteProductCatalogAssociatedAssetMutation();

  const handleSubmitDelete = async () => {
    const updatedData = {
      queryParams: { assetId: isDeleteModalOpen?.id, id: productCatalogId },
    };

    try {
      await deleteAssociateAssetTrigger(updatedData)?.unwrap();
      setIsDeleteModalOpen?.({ open: false, id: '' });
      successSnackbar('Asset Deleted Successfully!');
    } catch (error: any) {
      setIsDeleteModalOpen?.({ open: false, id: '' });
      errorSnackbar(error?.data?.message);
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
    deleteAssociateAssetStatus,
  };
};
