import { useState } from 'react';
import { singleVendorDetailsActionDropdownFunction } from './SingleVendorDetail.data';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useDeleteVendorMutation } from '@/services/airServices/settings/asset-management/vendor';
import { AIR_SERVICES } from '@/constants';

export const useSingleVendorDetails = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isADrawerOpen, setIsADrawerOpen] = useState(false);
  const router = useRouter();
  const update = 'update';
  const { vendorId } = router?.query;
  const [deleteVendor] = useDeleteVendorMutation();
  const singleVendorDetailsActionDropdown =
    singleVendorDetailsActionDropdownFunction(
      setDeleteModalOpen,
      router,
      setIsADrawerOpen,
    );

  const handleDeleteBtn = async () => {
    const updatedData = { queryParams: { id: vendorId } };

    try {
      const res = await deleteVendor(updatedData)?.unwrap();
      setDeleteModalOpen?.(false);
      router?.push(AIR_SERVICES?.VENDOR_SETTINGS);
      enqueueSnackbar(res?.data?.message ?? 'Vendor Deleted Successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Something Went Wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
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
  };
};
