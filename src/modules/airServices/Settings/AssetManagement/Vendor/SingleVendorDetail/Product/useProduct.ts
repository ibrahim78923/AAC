import { useState } from 'react';
import { productColumns } from './Product.data';
import {
  useDeleteProductVendorMutation,
  useGetProductVendorListQuery,
} from '@/services/airServices/settings/asset-management/vendor/single-vendor-details/product';
import { PAGINATION } from '@/config';
import { useRouter } from 'next/router';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useProduct = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [upsertProductModal, setUpsertProductModal] = useState(false);
  const [editData, setEditData] = useState([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [deleteId, setDeleteId] = useState(false);
  const router = useRouter();
  const { vendorId } = router?.query;

  const param = {
    page: page,
    limit: pageLimit,
    vendorId: vendorId,
  };
  const {
    data: productVendorData,
    isLoading,
    isError,
    isFetching,
    isSuccess,
  } = useGetProductVendorListQuery(param, {
    refetchOnMountOrArgChange: true,
    skip: !!!param,
  });

  const productListColumns = productColumns(
    setUpsertProductModal,
    setDeleteModalOpen,
    setEditData,
    setDeleteId,
  );

  const [deleteVendor] = useDeleteProductVendorMutation();
  const handleDeleteBtn = async () => {
    const updatedData = { queryParams: { id: deleteId } };
    try {
      const res = await deleteVendor(updatedData)?.unwrap();
      setDeleteModalOpen(false);
      successSnackbar(res?.message ?? 'Vendor Deleted Successfully');
    } catch (error: any) {
      setDeleteModalOpen(false);
      errorSnackbar();
    }
  };

  return {
    deleteModalOpen,
    setDeleteModalOpen,
    handleDeleteBtn,
    editData,
    setEditData,
    upsertProductModal,
    setUpsertProductModal,
    productListColumns,
    setPage,
    setPageLimit,
    productVendorData,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    setDeleteId,
  };
};
