import { useState } from 'react';
import { singleVendorDetailsActionDropdownFunction } from './SingleVendorDetail.data';
import { useRouter } from 'next/router';

export const useSingleVendorDetails = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const router = useRouter();

  const singleVendorDetailsActionDropdown =
    singleVendorDetailsActionDropdownFunction(setDeleteModalOpen, router);
  return {
    singleVendorDetailsActionDropdown,
    deleteModalOpen,
    setDeleteModalOpen,
  };
};
