import { useRouter } from 'next/router';
import { useState } from 'react';
import { singleProductDetailActionDropdownFunction } from './SingleProductCatalogDetails.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { AIR_SERVICES } from '@/constants';
import { useDeleteProductCatalogMutation } from '@/services/airServices/settings/asset-management/product-catalog';

export const useSingleProductCatalogDetails = () => {
  const router = useRouter();

  const { productCatalogId } = router?.query;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const singleProductDetailActionDropdown =
    singleProductDetailActionDropdownFunction(setIsDeleteModalOpen, router);

  const [deleteCatalog] = useDeleteProductCatalogMutation();

  const handleSubmitDelete = async () => {
    const updatedData = { queryParams: { id: productCatalogId } };
    try {
      const res = await deleteCatalog(updatedData)?.unwrap();
      setIsDeleteModalOpen?.(false);
      router?.push(AIR_SERVICES?.PRODUCT_CATALOG);
      enqueueSnackbar(res?.message ?? 'Product Catalog Deleted Successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message?.[0] ?? 'Something Went Wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
      setIsDeleteModalOpen?.(false);
    }
  };

  return {
    singleProductDetailActionDropdown,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleSubmitDelete,
  };
};
