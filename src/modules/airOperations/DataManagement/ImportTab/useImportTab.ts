import { PAGINATION } from '@/config';
import { useGetImportListQuery } from '@/services/airOperations/data-management/import';
import { useState } from 'react';
import { importTabColumnsFunction } from './ImportTab.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { saveAs } from 'file-saver';
import { parse } from 'json2csv';
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
import { CALENDAR_FORMAT } from '@/constants';

export const useImportTab = () => {
  const [selectedTabList, setSelectedTabList] = useState([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');
  const [filterValues, setFilterValues] = useState<any>({});
  const [isOpenFilterDrawer, setIsOpenFilterDrawer] = useState<boolean>(false);

  const filterBody = {
    product: filterValues?.product,
    user: filterValues?.user,
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

  const listDataExport = async (type: any) => {
    if (!selectedTabList?.length) {
      errorSnackbar('please select record to export.');
      return;
    }
    try {
      if (type === 'CSV') {
        const csv = parse(selectedTabList);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'Import List.csv');
      } else if (type === 'XLS') {
        const worksheet = XLSX?.utils?.json_to_sheet(selectedTabList);
        const workbook = XLSX?.utils?.book_new();
        XLSX?.utils?.book_append_sheet(workbook, worksheet, 'Data');
        const excelBuffer = XLSX?.write(workbook, {
          bookType: 'xlsx',
          type: 'array',
        });
        const blob = new Blob([excelBuffer], {
          type: 'application/octet-stream',
        });
        saveAs(blob, 'Import List.xlsx');
      } else {
        errorSnackbar('Invalid export type.');
        return;
      }
      successSnackbar('File Exported successfully');
    } catch (error: any) {
      errorSnackbar(error?.message || 'An error occurred during file export');
    }
  };

  return {
    page,
    setPage,
    pageLimit,
    setPageLimit,
    search,
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
    listDataExport,
    importTabColumns,
  };
};
