import { useState } from 'react';
import { singleVendorDetailsActionDropdownFunction } from './SingleVendorDetail.data';
import { useRouter } from 'next/router';
import { useDeleteVendorMutation } from '@/services/airServices/settings/asset-management/vendor';
import { AIR_SERVICES } from '@/constants/routes';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

export const useSingleVendorDetails = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isADrawerOpen, setIsADrawerOpen] = useState(false);
  const router = useRouter();
  const update = 'update';
  const { vendorId } = router?.query;
  const [deleteVendorTrigger, deleteVendorStatus] = useDeleteVendorMutation();
  const singleVendorDetailsActionDropdown =
    singleVendorDetailsActionDropdownFunction(
      setDeleteModalOpen,
      setIsADrawerOpen,
    );

  const handleDeleteBtn = async () => {
    const updatedData = { queryParams: { id: vendorId } };

    try {
      await deleteVendorTrigger(updatedData)?.unwrap();
      successSnackbar('Vendor Deleted Successfully!');
      setDeleteModalOpen?.(false);
      router?.push(AIR_SERVICES?.VENDOR_SETTINGS);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      setDeleteModalOpen?.(false);
    }
  };
  return {
    singleVendorDetailsActionDropdown,
    deleteModalOpen,
    setDeleteModalOpen,
    handleDeleteBtn,
    isADrawerOpen,
    setIsADrawerOpen,
    update,
    deleteVendorStatus,
  };
};
