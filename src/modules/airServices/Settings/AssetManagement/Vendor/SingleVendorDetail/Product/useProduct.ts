import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { productColumns } from './Product.data';
import { useGetProductVendorListQuery } from '@/services/airServices/settings/asset-management/vendor/single-vendor-details/product';
import { PAGINATION } from '@/config';
import { useRouter } from 'next/router';

export const useProduct = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [upsertProductModal, setUpsertProductModal] = useState(false);
  const [editData, setEditData] = useState([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
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
  } = useGetProductVendorListQuery({ param });

  const productListColumns = productColumns(
    setUpsertProductModal,
    setDeleteModalOpen,
    setEditData,
  );

  const handleDeleteBtn = () => {
    setDeleteModalOpen(false);
    enqueueSnackbar('Product deleted Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
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
  };
};
