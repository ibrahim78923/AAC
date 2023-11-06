import { useRouter } from 'next/router';
import { useState } from 'react';
import { singlePurchaseDetailActionDropdownFunction } from './SinglePurchaseDetail.data';

export const useSinglePurchaseDetail = () => {
  const router = useRouter();

  // Purchase action
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isADrawerOpen, setIsADrawerOpen] = useState<boolean>(false);

  const singlePurchaseDetailActionDropdown =
    singlePurchaseDetailActionDropdownFunction(setIsDeleteModalOpen, router);

  return {
    singlePurchaseDetailActionDropdown,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isDrawerOpen,
    setIsDrawerOpen,
    isADrawerOpen,
    setIsADrawerOpen,
  };
};
