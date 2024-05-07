import { useRouter } from 'next/router';
import { useState } from 'react';
import { vendorListsColumnsFunction } from './Vendor.data';
import {
  useGetVendorsListQuery,
  useLazyGetExportNewVendorQuery,
} from '@/services/airServices/settings/asset-management/vendor';
import { PAGINATION } from '@/config';
import {
  EXPORT_FILE_TYPE,
  MESSAGE_EXPORT_FILE_TYPE,
} from '@/constants/strings';
import { downloadFile } from '@/utils/file';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useVendor = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isADrawerOpen, setIsADrawerOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const router = useRouter();
  const vendorListsColumns = vendorListsColumnsFunction(router);

  const param = {
    page: page,
    limit: pageLimit,
    search,
    meta: true,
  };
  const {
    data: vendorData,
    isLoading,
    isError,
    isFetching,
    isSuccess,
  } = useGetVendorsListQuery({ param }, { refetchOnMountOrArgChange: true });

  const [lazyGetExportNewVendorTrigger] = useLazyGetExportNewVendorQuery();

  const getNewVendorDataExport = async (type: any) => {
    const getNewVendorExportParam = {
      exportType: type,
      page,
      limit: pageLimit,
      search,
      meta: true,
    };

    const getNewVendorExportParameter = {
      queryParams: getNewVendorExportParam,
    };
    try {
      const response: any = await lazyGetExportNewVendorTrigger(
        getNewVendorExportParameter,
      )?.unwrap();
      downloadFile(response, 'NewVendorLists', EXPORT_FILE_TYPE?.[type]);
      successSnackbar(
        `Vendor exported successfully as ${MESSAGE_EXPORT_FILE_TYPE?.[type]}`,
      );
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    router,
    vendorListsColumns,
    isADrawerOpen,
    setIsADrawerOpen,
    vendorData,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    setPageLimit,
    setPage,
    setSearch,
    getNewVendorDataExport,
    isDrawerOpen,
    setIsDrawerOpen,
  };
};
