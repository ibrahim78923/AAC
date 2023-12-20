import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { getVendorsColumns } from './Vendors.data';
import {
  useDeleteProductCatalogVendorMutation,
  useGetProductCatalogVendorListQuery,
} from '@/services/airServices/settings/asset-management/product-catalog';
import { useRouter } from 'next/router';
import { PAGINATION } from '@/config';

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
    id: '',
  });

  const getProductCatalogVendorParameter = {
    queryParams: { productId: productCatalogId, page: page, limit: limit },
  };

  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetProductCatalogVendorListQuery(getProductCatalogVendorParameter);

  const vendorsColumns = getVendorsColumns(
    setIsDeleteModalOpen,
    setIsUpsertModalOpen,
  );

  const [deleteVendor] = useDeleteProductCatalogVendorMutation();

  const handleSubmitDelete = async () => {
    const updatedData = { queryParams: { id: isDeleteModalOpen?.id } };

    try {
      const res = await deleteVendor(updatedData)?.unwrap();
      setIsDeleteModalOpen?.({ open: false, id: '' });
      enqueueSnackbar(res?.message ?? 'Vendor Deleted Successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      setIsDeleteModalOpen?.({ open: false, id: '' });
      enqueueSnackbar(error?.data?.message ?? 'Something Went Wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
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
  };
};
