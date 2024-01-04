import { AIR_SERVICES } from '@/constants';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { data, contractsListsColumnsFunction } from './Contracts.data';
import { EXPORT_FILE_TYPE, NOTISTACK_VARIANTS } from '@/constants/strings';
import { downloadFile } from '@/utils/file';
import {
  useLazyGetContractQuery,
  useLazyGetExportContractQuery,
} from '@/services/airServices/assets/contracts';
import { PAGINATION } from '@/config';

export const useContracts = () => {
  const [selectedContractList, setSelectedContractList] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const [contractFilterLists, setContractFilterLists] = useState({});
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState('');
  const getContractParam = new URLSearchParams();

  Object?.entries(contractFilterLists || {})?.forEach(
    ([key, value]: any) => getContractParam?.append(key, value),
  );
  getContractParam?.append('page', page + '');
  getContractParam?.append('limit', pageLimit + '');
  getContractParam?.append('search', search);
  const getContractParameter = {
    queryParams: getContractParam,
  };

  const [lazyGetContractTrigger, lazyGetContractStatus] =
    useLazyGetContractQuery();

  const [lazyGetExportContractTrigger] = useLazyGetExportContractQuery();

  const getContractListData = async () => {
    try {
      await lazyGetContractTrigger(getContractParameter)?.unwrap();
      setSelectedContractList([]);
    } catch (error: any) {}
  };

  const getContractListDataExport = async (type: any) => {
    const exportContractParams = new URLSearchParams();

    exportContractParams?.append('exportType', type);

    const getContractExportParameter = {
      queryParams: exportContractParams,
    };

    try {
      const response: any = await lazyGetExportContractTrigger(
        getContractExportParameter,
      )?.unwrap();
      downloadFile(response, 'ContractLists', EXPORT_FILE_TYPE?.[type]);
      enqueueSnackbar(
        response?.data?.message ?? ' Contract Exported successfully',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? ' Contract not exported', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  // useEffect(() => {
  //   getContractListData();
  // }, [search, page, pageLimit, contractFilterLists]);

  const handleAddNewContractClick = () => {
    router?.push({
      pathname: AIR_SERVICES?.UPSERT_CONTRACT,
    });
  };
  const contractListsColumns = contractsListsColumnsFunction(
    selectedContractList,
    setSelectedContractList,
    data,
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
  };
};
