import { useRouter } from 'next/router';
import { useState } from 'react';
import { singleProductDetailActionDropdownFunction } from './SingleProductCatalogDetails.data';
import { AIR_SERVICES } from '@/constants';
import { useDeleteProductCatalogMutation } from '@/services/airServices/settings/asset-management/product-catalog';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useSingleProductCatalogDetails = () => {
  const router = useRouter();

  const { productCatalogId } = router?.query;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const singleProductDetailActionDropdown =
    singleProductDetailActionDropdownFunction(setIsDeleteModalOpen, router);

  const [deleteProductCatalogTrigger, deleteProductCatalogStatus] =
    useDeleteProductCatalogMutation();

  const handleSubmitDelete = async () => {
    const updatedData = { queryParams: { id: productCatalogId } };
    try {
      await deleteProductCatalogTrigger(updatedData)?.unwrap();
      setIsDeleteModalOpen?.(false);
      router?.push(AIR_SERVICES?.PRODUCT_CATALOG);
      successSnackbar('Product Catalog Deleted Successfully!');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      setIsDeleteModalOpen?.(false);
    }
  };

  return {
    singleProductDetailActionDropdown,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleSubmitDelete,
    deleteProductCatalogStatus,
  };
};
