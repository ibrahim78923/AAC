import { PAGINATION } from '@/config';
import { useGetImportListQuery } from '@/services/airOperations/data-management/import';
import { useState } from 'react';
import { importTabColumnsFunction } from './ImportTab.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { saveAs } from 'file-saver';
import { parse } from 'json2csv';
import * as XLSX from 'xlsx';

export const useImportTab = () => {
  const [selectedTabList, setSelectedTabList] = useState([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');
  const [filterValues, setFilterValues] = useState({});
  const [isOpenFilterDrawer, setIsOpenFilterDrawer] = useState<boolean>(false);

  const params = {
    page,
    limit: pageLimit,
    search,
    ...filterValues,
  };
  const { data, isFetching, isError, isLoading, isSuccess } =
    useGetImportListQuery(params, { refetchOnMountOrArgChange: true });

  const importTabColumns = importTabColumnsFunction(
    data?.data?.datamanagements,
    selectedTabList,
    setSelectedTabList,
  );

  const listDataExport = async (type: any) => {
    const dataManagements = data?.data?.datamanagements;

    if (!dataManagements || !type) {
      errorSnackbar('No data available to export or invalid export type.');
      return;
    }
    try {
      if (type === 'CSV') {
        const csv = parse(dataManagements);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'Import List.csv');
      } else if (type === 'XLS') {
        const worksheet = XLSX?.utils?.json_to_sheet(dataManagements);
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
