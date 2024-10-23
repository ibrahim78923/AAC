import { PAGINATION } from '@/config';
import { useState } from 'react';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import {
  useGetExportListQuery,
  useLazyExportListQuery,
} from '@/services/airOperations/data-management/export';
import { ExportTabI } from './ExportTab.interface';
import { downloadFile } from '@/utils/file';
import { EXPORT_FILE_TYPE } from '@/constants/strings';
import { otherDateFormat } from '@/lib/date-time';
import { CALENDAR_FORMAT } from '@/constants';

export const useExportTab: () => ExportTabI = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');
  const [filterValues, setFilterValues] = useState<any>({});
  const [isOpenFilterDrawer, setIsOpenFilterDrawer] = useState<boolean>(false);

  const filterBody = {
    product: filterValues?.product,
    userId: filterValues?.user && filterValues?.user?._id,
    object: filterValues?.object,
    createdAt:
      filterValues?.createdDate &&
      otherDateFormat(filterValues?.createdDate, CALENDAR_FORMAT?.YMD),
  };

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearch(data);
  };

  const params = {
    page,
    limit: pageLimit,
    search,
    ...filterBody,
    meta: true,
  };

  const { data, isFetching, isError, isLoading, isSuccess } =
    useGetExportListQuery(params, { refetchOnMountOrArgChange: true });

  const [lazyGetExportListTrigger] = useLazyExportListQuery();

  const listDataExport = async (type: any) => {
    const params = {
      exportType: type,
      meta: false,
    };

    const exportListParameter = {
      queryParams: params,
    };

    try {
      const response: any =
        await lazyGetExportListTrigger(exportListParameter)?.unwrap();
      downloadFile(response, 'Export_Lists', EXPORT_FILE_TYPE?.[type]);
      successSnackbar('File export successfully');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    page,
    setPage,
    pageLimit,
    setPageLimit,
    handleSearch,
    data,
    isFetching,
    isError,
    isLoading,
    isSuccess,
    setIsOpenFilterDrawer,
    isOpenFilterDrawer,
    setFilterValues,
    filterValues,
    listDataExport,
  };
};
