import { useEffect, useState } from 'react';
import { getVendorsColumns } from './Vendors.data';
import {
  useDeleteProductCatalogVendorMutation,
  useLazyGetProductCatalogVendorListQuery,
} from '@/services/airServices/settings/asset-management/product-catalog';
import { useRouter } from 'next/router';
import { PAGINATION } from '@/config';
import { buildQueryParams, errorSnackbar, successSnackbar } from '@/utils/api';

export const useVendors = () => {
  const router = useRouter();

  const { productCatalogId } = router?.query;

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<any>({
    open: false,
    id: '',
  });

  const [isUpsertModalOpen, setIsUpsertModalOpen] = useState<any>({
    open: false,
    data: null,
  });

  const [productCatalogVendorListTrigger, productCatalogVendorListStatus] =
    useLazyGetProductCatalogVendorListQuery();

  const productCatalogVendorListData = async (currentPage: any = page) => {
    const additionalParams = [
      ['page', currentPage + ''],
      ['limit', pageLimit + ''],
      ['productId', productCatalogId],
    ];
    const productCatalogVendorListParam: any =
      buildQueryParams(additionalParams);

    const getProductCatalogVendorParameter = {
      queryParams: productCatalogVendorListParam,
    };

    try {
      await productCatalogVendorListTrigger(
        getProductCatalogVendorParameter,
      )?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    productCatalogVendorListData?.();
  }, [page, pageLimit]);

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
      const newPage =
        productCatalogVendorListStatus?.data?.data?.vendorproductcatalogs
          ?.length === 1
          ? 1
          : page;
      setPage?.(newPage);
      await productCatalogVendorListData?.(newPage);
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
    productCatalogVendorListStatus,
    setPage,
    setPageLimit,
    deleteVendorStatus,
  };
};
