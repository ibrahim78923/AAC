import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { contractsListsColumnsFunction } from './Contracts.data';
import { EXPORT_FILE_TYPE } from '@/constants/strings';
import { downloadFile } from '@/utils/file';
import {
  useLazyGetContractQuery,
  useLazyGetExportContractQuery,
} from '@/services/airServices/assets/contracts';
import { PAGINATION } from '@/config';
import { useTheme } from '@mui/material';
import { buildQueryParams } from '@/utils/api';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { AIR_SERVICES } from '@/constants/routes';

export const useContracts = () => {
  const theme = useTheme();
  const [selectedContractList, setSelectedContractList] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const [contractFilterLists, setContractFilterLists] = useState({});
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<string>('');

  const [lazyGetContractTrigger, lazyGetContractStatus]: any =
    useLazyGetContractQuery();

  const [lazyGetExportContractTrigger] = useLazyGetExportContractQuery();

  const getContractListData = async (pages = page) => {
    const additionalParams = [
      ['page', pages + ''],
      ['limit', pageLimit + ''],
      ['search', search],
    ];
    const getContractParam: any = buildQueryParams(
      additionalParams,
      contractFilterLists,
    );

    const getContractParameter = {
      queryParams: getContractParam,
    };

    try {
      await lazyGetContractTrigger(getContractParameter)?.unwrap();
      setSelectedContractList([]);
    } catch (error: any) {}
  };

  const getContractListDataExport = async (type: any) => {
    const queryParams = {
      exportType: type,
    };
    const getContractExportParameter = {
      queryParams,
    };

    try {
      const response: any = await lazyGetExportContractTrigger(
        getContractExportParameter,
      )?.unwrap();
      downloadFile(response, 'ContractLists', EXPORT_FILE_TYPE?.[type]);
      successSnackbar('File Exported successfully');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  useEffect(() => {
    getContractListData();
  }, [search, page, pageLimit, contractFilterLists]);

  const refetch = () => getContractListData?.(page);

  const handleAddNewContractClick = () => {
    router?.push({
      pathname: AIR_SERVICES?.UPSERT_CONTRACT,
    });
  };
  const contractListsColumns = contractsListsColumnsFunction(
    selectedContractList,
    setSelectedContractList,
    lazyGetContractStatus?.data?.data?.contracts,
    router,
  );
  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearch(data);
  };
  return {
    isDrawerOpen,
    setIsDrawerOpen,
    setIsDeleteModalOpen,
    isDeleteModalOpen,
    handleAddNewContractClick,
    contractListsColumns,
    getContractListDataExport,
    lazyGetContractStatus,
    setPage,
    setPageLimit,
    handleSearch,
    selectedContractList,
    setSelectedContractList,
    getContractListData,
    setContractFilterLists,
    contractFilterLists,
    theme,
    page,
    refetch,
  };
};
