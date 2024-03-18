import { useState } from 'react';
import { getVendorsColumns } from './Vendors.data';
import {
  useDeleteProductCatalogVendorMutation,
  useGetProductCatalogVendorListQuery,
} from '@/services/airServices/settings/asset-management/product-catalog';
import { useRouter } from 'next/router';
import { PAGINATION } from '@/config';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useVendors = () => {
  const router = useRouter();

  const { productCatalogId } = router?.query;

  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<any>({
    open: false,
    id: '',
  });

  const [isUpsertModalOpen, setIsUpsertModalOpen] = useState<any>({
    open: false,
    data: null,
  });

  const getProductCatalogVendorParameter = {
    queryParams: { productId: productCatalogId, page: page, limit: limit },
  };

  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetProductCatalogVendorListQuery(getProductCatalogVendorParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!productCatalogId,
    });

  const vendorsColumns = getVendorsColumns(
    setIsDeleteModalOpen,
    setIsUpsertModalOpen,
  );

  const [deleteVendorTrigger, deleteVendorStatus] =
    useDeleteProductCatalogVendorMutation();

  const handleSubmitDelete = async () => {
    const updatedData = { queryParams: { id: isDeleteModalOpen?.id } };

    try {
      await deleteVendorTrigger(updatedData)?.unwrap();
      setIsDeleteModalOpen?.({ open: false, id: '' });
      successSnackbar('Vendor Deleted Successfully!');
    } catch (error: any) {
      setIsDeleteModalOpen?.({ open: false, id: '' });
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    vendorsColumns,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleSubmitDelete,
    setIsUpsertModalOpen,
    isUpsertModalOpen,
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    setPage,
    setLimit,
    deleteVendorStatus,
  };
};
