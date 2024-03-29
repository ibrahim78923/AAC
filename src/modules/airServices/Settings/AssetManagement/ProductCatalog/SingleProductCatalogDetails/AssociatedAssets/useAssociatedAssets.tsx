import { useEffect, useState } from 'react';
import { getAssociatedAssetsColumns } from './AssociatedAssets.data';
import { useRouter } from 'next/router';
import { PAGINATION } from '@/config';
import {
  useDeleteProductCatalogAssociatedAssetMutation,
  useLazyGetProductCatalogAssociatedAssetListQuery,
} from '@/services/airServices/settings/asset-management/product-catalog';
import { buildQueryParams, errorSnackbar, successSnackbar } from '@/utils/api';

export const useAssociatedAssets = () => {
  const router = useRouter();

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const { productCatalogId } = router?.query;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<any>({
    open: false,
    id: '',
  });

  const [addModalOpen, setAddModalOpen] = useState(false);

  const associatedAssetsColumns =
    getAssociatedAssetsColumns(setIsDeleteModalOpen);

  const [
    productCatalogAssociatedAssetListTrigger,
    productCatalogAssociatedAssetListStatus,
  ] = useLazyGetProductCatalogAssociatedAssetListQuery();

  const productCatalogAssociatedAssetListData = async (
    currentPage: any = page,
  ) => {
    const additionalParams = [
      ['page', currentPage + ''],
      ['limit', pageLimit + ''],
      ['productCatalogId', productCatalogId],
    ];
    const productCatalogAssociatedAssetListParam: any =
      buildQueryParams(additionalParams);

    const getProductCatalogAssociatedAssetParameter = {
      queryParams: productCatalogAssociatedAssetListParam,
    };

    try {
      await productCatalogAssociatedAssetListTrigger(
        getProductCatalogAssociatedAssetParameter,
      )?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    productCatalogAssociatedAssetListData?.();
  }, [page, pageLimit]);

  const [deleteAssociateAssetTrigger, deleteAssociateAssetStatus] =
    useDeleteProductCatalogAssociatedAssetMutation();

  const handleSubmitDelete = async () => {
    const updatedData = {
      queryParams: { assetId: isDeleteModalOpen?.id, id: productCatalogId },
    };

    try {
      await deleteAssociateAssetTrigger(updatedData)?.unwrap();
      setIsDeleteModalOpen?.({ open: false, id: '' });
      const newPage =
        productCatalogAssociatedAssetListStatus?.data?.data?.productcatalogs
          ?.length === 1
          ? 1
          : page;
      setPage?.(newPage);
      await productCatalogAssociatedAssetListData?.(newPage);
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
    productCatalogAssociatedAssetListStatus,
    setPage,
    setPageLimit,
    deleteAssociateAssetStatus,
  };
};
