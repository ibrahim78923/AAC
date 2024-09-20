import { AIR_SERVICES } from '@/constants';
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
import { buildQueryParams, errorSnackbar, successSnackbar } from '@/utils/api';

export const useContracts = () => {
  const theme = useTheme();
  const [selectedContractList, setSelectedContractList] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const [contractFilterLists, setContractFilterLists] = useState({});
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState('');

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
    setSearch,
    selectedContractList,
    setSelectedContractList,
    getContractListData,
    setContractFilterLists,
    contractFilterLists,
    theme,
    page,
  };
};
