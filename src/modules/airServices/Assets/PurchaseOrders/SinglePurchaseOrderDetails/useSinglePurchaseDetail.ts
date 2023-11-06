import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  singlePurchaseDetailActionDropdownFunction,
  singlePurchaseDetailStatusDropdownFunction,
} from './SinglePurchaseDetail.data';

export const useSinglePurchaseDetail = () => {
  const router = useRouter();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isADrawerOpen, setIsADrawerOpen] = useState<boolean>(false);

  const singlePurchaseDetailActionDropdown =
    singlePurchaseDetailActionDropdownFunction(setIsDeleteModalOpen, router);
  const singlePurchaseDetailStatusDropdown =
    singlePurchaseDetailStatusDropdownFunction();
  return {
    singlePurchaseDetailActionDropdown,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isDrawerOpen,
    setIsDrawerOpen,
    isADrawerOpen,
    setIsADrawerOpen,
    singlePurchaseDetailStatusDropdown,
  };
};
