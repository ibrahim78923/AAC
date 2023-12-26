import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  VENDOR_LISTS_ACTION_CONSTANTS,
  vendorListsColumnsFunction,
} from './Vendor.data';
import {
  useGetVendorsListQuery,
  useLazyGetExportNewVendorQuery,
} from '@/services/airServices/settings/asset-management/vendor';
import { PAGINATION } from '@/config';
import {
  EXPORT_FILE_TYPE,
  MESSAGE_EXPORT_FILE_TYPE,
  NOTISTACK_VARIANTS,
} from '@/constants/strings';
import { downloadFile } from '@/utils/file';
import { enqueueSnackbar } from 'notistack';
import ImportVendor from './ImportVendor';

export const useVendor = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isADrawerOpen, setIsADrawerOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const router = useRouter();
  const [hasVendorAction, setHasVendorAction] = useState(false);
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
  } = useGetVendorsListQuery({ param });
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
      enqueueSnackbar(
        response?.message ??
          `Vendor exported successfully as ${MESSAGE_EXPORT_FILE_TYPE?.[type]}`,
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
    } catch (error: any) {
      enqueueSnackbar(error?.message ?? `Vendor not exported as ${type}`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const vendorListActionComponent: any = {
    [VENDOR_LISTS_ACTION_CONSTANTS?.IMPORT]: (
      <ImportVendor
        setIsDrawerOpen={setHasVendorAction}
        isDrawerOpen={hasVendorAction}
      />
    ),
  };
  const setVendorListAction = (VendorListActionQuery: any) => {
    router?.push({
      pathname: router?.pathname,
      query: {
        ...router?.query,
        VendorListAction: VendorListActionQuery,
      },
    });
    setTimeout(() => {
      setHasVendorAction?.(true);
    }, 100);
  };
  return {
    router,
    vendorListsColumns,
    isDrawerOpen,
    setIsDrawerOpen,
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
    vendorListActionComponent,
    hasVendorAction,
    setVendorListAction,
  };
};
