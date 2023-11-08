import { useRouter } from 'next/router';
import { useState } from 'react';
import { singleInventoryDetailActionDropdownFunction } from './SingleInventoryDetail.data';

export const useSingleInventoryDetail = () => {
  const router = useRouter();

  // inventory action
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const singleInventoryDetailActionDropdown =
    singleInventoryDetailActionDropdownFunction(setIsDeleteModalOpen, router);

  return {
    singleInventoryDetailActionDropdown,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  };
};
