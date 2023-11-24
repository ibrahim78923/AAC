import { useRouter } from 'next/router';
import { useState } from 'react';
import { singleProductDetailActionDropdownFunction } from './SingleProductCatalogDetails.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { AIR_SERVICES } from '@/constants';

export const useSingleProductCatalogDetails = () => {
  const router = useRouter();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const singleProductDetailActionDropdown =
    singleProductDetailActionDropdownFunction(setIsDeleteModalOpen, router);

  const handleSubmitDelete = () => {
    setIsDeleteModalOpen?.(false);
    enqueueSnackbar('Product Catalog Deleted Successfully!', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    router?.push(AIR_SERVICES?.PRODUCT_CATALOG);
  };

  return {
    singleProductDetailActionDropdown,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleSubmitDelete,
  };
};
