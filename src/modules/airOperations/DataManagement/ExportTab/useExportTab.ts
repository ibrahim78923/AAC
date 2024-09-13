import { PAGINATION } from '@/config';
import { useState } from 'react';
import { exportTabColumnsFunction } from './ExportTab.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { saveAs } from 'file-saver';
import { parse } from 'json2csv';
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
import { CALENDAR_FORMAT } from '@/constants';
import { useGetExportListQuery } from '@/services/airOperations/data-management/export';
import { ExportTabI } from './ExportTab.interface';

export const useExportTab: () => ExportTabI = () => {
  const [selectedTabList, setSelectedTabList] = useState([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');
  const [filterValues, setFilterValues] = useState<any>({});
  const [isOpenFilterDrawer, setIsOpenFilterDrawer] = useState<boolean>(false);

  const filterBody = {
    product: filterValues?.product,
    user: filterValues?.user && filterValues?.user?._id,
    object: filterValues?.object,
    createdAt:
      filterValues?.createdDate &&
      dayjs(filterValues?.createdDate)?.format(CALENDAR_FORMAT?.YMD),
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

  const exportList = data?.data?.exportedfilelogs;

  const exportTabColumns = exportTabColumnsFunction(
    exportList,
    selectedTabList,
    setSelectedTabList,
  );

  const listDataExport = async (type: any) => {
    try {
      if (type === 'CSV') {
        const csv = parse(exportList);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'Export_List.csv');
      } else if (type === 'XLS') {
        const worksheet = XLSX?.utils?.json_to_sheet(exportList);
        const workbook = XLSX?.utils?.book_new();
        XLSX?.utils?.book_append_sheet(workbook, worksheet, 'Data');
        const excelBuffer = XLSX?.write(workbook, {
          bookType: 'xlsx',
          type: 'array',
        });
        const blob = new Blob([excelBuffer], {
          type: 'application/octet-stream',
        });
        saveAs(blob, 'Export_List.xlsx');
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
    exportTabColumns,
  };
};
