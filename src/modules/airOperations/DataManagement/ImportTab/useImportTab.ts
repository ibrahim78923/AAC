import { PAGINATION } from '@/config';
import { useGetImportListQuery } from '@/services/airOperations/data-management/import';
import { useRef, useState } from 'react';
import { importTabColumnsFunction } from './ImportTab.data';
import dayjs from 'dayjs';
import { CALENDAR_FORMAT } from '@/constants';
import { ImportTabI } from './ImportTab.interface';
import { htmlToPdfConvert } from '@/utils/file';

export const useImportTab: () => ImportTabI = () => {
  const [selectedTabList, setSelectedTabList] = useState([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');
  const [filterValues, setFilterValues] = useState<any>({});
  const [isOpenFilterDrawer, setIsOpenFilterDrawer] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const downloadRef = useRef(null);

  const filterBody = {
    product: filterValues?.product,
    user: filterValues?.user && filterValues?.user?._id,
    object: filterValues?.object,
    createdDate:
      filterValues?.createdDate &&
      dayjs(filterValues?.createdDate)?.format(CALENDAR_FORMAT?.YMD),
  };

  const params = {
    page,
    limit: pageLimit,
    search,
    ...filterBody,
  };

  const { data, isFetching, isError, isLoading, isSuccess } =
    useGetImportListQuery(params, { refetchOnMountOrArgChange: true });

  const importTabColumns = importTabColumnsFunction(
    data?.data?.datamanagements,
    selectedTabList,
    setSelectedTabList,
  );

  const handleDownload = async () => {
    if (isLoading || isFetching || isError) return;
    setLoading(true);
    try {
      await htmlToPdfConvert?.(downloadRef, 'Import_List', 10);
    } catch (error) {}
    setLoading(false);
  };

  return {
    page,
    setPage,
    pageLimit,
    setPageLimit,
    setSearch,
    data,
    isFetching,
    isError,
    isLoading,
    isSuccess,
    setIsOpenFilterDrawer,
    isOpenFilterDrawer,
    setFilterValues,
    filterValues,
    importTabColumns,
    handleDownload,
    downloadRef,
    loading,
  };
};
