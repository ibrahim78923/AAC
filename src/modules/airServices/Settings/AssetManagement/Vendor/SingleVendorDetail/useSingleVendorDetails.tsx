import { useState } from 'react';
import { singleVendorDetailsActionDropdownFunction } from './SingleVendorDetail.data';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useDeleteVendorMutation } from '@/services/airServices/settings/asset-management/vendor';

export const useSingleVendorDetails = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isADrawerOpen, setIsADrawerOpen] = useState(false);
  const router = useRouter();

  const { vendorId } = router?.query;
  const [deleteVendor] = useDeleteVendorMutation();
  const singleVendorDetailsActionDropdown =
    singleVendorDetailsActionDropdownFunction(
      setDeleteModalOpen,
      router,
      setIsADrawerOpen,
    );
  // const handleDeleteBtn = () => {
  //   setDeleteModalOpen(false);
  //   enqueueSnackbar('Vendor deleted Successfully', {
  //     variant: NOTISTACK_VARIANTS?.SUCCESS,
  //   });
  // };
  const handleDeleteBtn = async () => {
    const updatedData = { queryParams: { id: vendorId } };
    try {
      const res = await deleteVendor(updatedData)?.unwrap();
      setDeleteModalOpen?.(false);
      enqueueSnackbar(res?.message ?? 'Product Catalog Deleted Successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      // router?.push(AIR_SERVICES?.PRODUCT_CATALOG);
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
    // handleSubmitDelete,
  };
};
