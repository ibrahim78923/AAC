import { useState } from 'react';

import { useRouter } from 'next/router';

import { useTheme } from '@mui/material';

import {
  useDeleteDealsMutation,
  useGetDealsActionPreviewQuery,
  useGetDealsLifecycleStageQuery,
  // useLazyGetDealsListQuery,
  // useGetDealsListQuery,
  useGetDealsSalesProductQuery,
  useGetDealsUserListQuery,
  useGetDealsViewsQuery,
} from '@/services/airSales/deals';
import { enqueueSnackbar } from 'notistack';
import { AIR_SALES } from '@/routesConstants/paths';

const useDealSaleSite = () => {
  const router = useRouter();
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState(0);
  const [actions, setActions] = useState('actions');
  const [isOpen, setIsOpen] = useState(false);
  const [isDealCustomize, setIsDealCustomize] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [isShareDine, setIsShareDine] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isAssign, setIsAssign] = useState(false);
  const [exportRecord, setExportRecord] = useState(false);
  const [listView, SetListView] = useState('listView');

  const params = {
    page: 1,
    limit: 10,
    search: '',
  };
  const { data: pipelineData } = useGetDealsSalesProductQuery(params);
  const { data: DealsLifecycleStageData } = useGetDealsLifecycleStageQuery({});
  const { data: DealsUserListData } = useGetDealsUserListQuery({});
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedTableIds, setSelectedTableIds] = useState<string[]>([]);
  const [filterVal, setFilterVal] = useState({});
  const [viewColumns, setViewColumns] = useState([
    'createdBy',
    'name',
    'closeDate',
    'amount',
    'dealStage',
    'dealPipeline',
  ]);
  const [tabData, setTabData] = useState<any>('');
  const { data: dealViewsData } = useGetDealsViewsQuery({
    dateStart: '2023-10-01',
    dateEnd: '2023-10-31',
  });

  const tabsArr = dealViewsData?.data?.map((obj: any) => obj?.name);

  // const dealListApiUrl = dealViewsData?.data?.map((obj: any) => obj?.apiUrl);

  // useEffect(() => {
  //   if (dealListApiUrl) {
  //     const startDateMatch = dealListApiUrl[2].match(/dateStart=([^&]*)/);
  //     const endDateMatch = dealListApiUrl[2].match(/dateEnd=([^&]*)/);
  //     const dateStart = startDateMatch ? startDateMatch[1] : null;
  //     const dateEnd = endDateMatch ? endDateMatch[1] : null;
  //   }
  // }, []);

  const getTabValue = (tabVal: any) => {
    setTabData(tabsArr ? tabsArr[tabVal] : '');
  };
  const [deleteDealsMutation] = useDeleteDealsMutation();

  const handleListViewClick = (val: string) => {
    SetListView(val);
    setSelectedIds([]);
  };
  const HandleDeleteModal = () => {
    setIsDelete(!isDelete);
  };
  const handleAssignModal = () => {
    setIsAssign(!isAssign);
  };

  const handleChange = () => {
    setIsOpen(!isOpen);
  };
  const handleDealCustomize = () => setIsDealCustomize(!isDealCustomize);

  const handleSMD = () => {
    setIsShareDine(!isShareDine);
  };
  const handleFilter = () => {
    setIsFilter(!isFilter);
  };
  const handleExportRecord = () => {
    setExportRecord(!exportRecord);
  };

  const handleCheckboxChange = (event: any, id: string) => {
    const { checked } = event?.target;
    checked
      ? setSelectedIds([...selectedIds, id])
      : setSelectedIds(selectedIds?.filter((ids) => ids !== id));
  };
  const handleTableCheckboxChange = (event: any, id: string) => {
    const { checked } = event?.target;
    checked
      ? setSelectedTableIds([...selectedTableIds, id])
      : setSelectedTableIds(selectedTableIds?.filter((ids) => ids !== id));
  };

  const handleActions = (value: string | any) => {
    switch (value) {
      case 'Preview':
        handleSMD();
        break;
      case 'Re-assign':
        handleAssignModal();
        break;
      case 'Delete':
        HandleDeleteModal();
        break;
      case 'Export':
        handleExportRecord();
        break;
      case 'View Details':
        router.push({ pathname: AIR_SALES?.VIEW_DETAILS });
        break;
      default:
        break;
    }
  };

  const handleDeleteDeals = async () => {
    try {
      await deleteDealsMutation({ ids: selectedTableIds.join(',') }).unwrap();
      enqueueSnackbar('Deals deleted successfully', {
        variant: 'success',
      });
      setSelectedTableIds([]);
      HandleDeleteModal();
    } catch (error) {
      enqueueSnackbar('Error while deleting deals', {
        variant: 'error',
      });
    }
  };

  return {
    search,
    setSearch,
    actions,
    setActions,
    theme,
    isOpen,
    isDealCustomize,
    isFilter,
    isShareDine,
    handleChange,
    handleDealCustomize,
    handleSMD,
    handleFilter,
    handleActions,
    HandleDeleteModal,
    handleAssignModal,
    isDelete,
    isAssign,
    exportRecord,
    handleExportRecord,
    listView,
    handleListViewClick,
    pipelineData,
    DealsLifecycleStageData,
    DealsUserListData,
    handleCheckboxChange,
    selectedIds,
    handleTableCheckboxChange,
    selectedTableIds,
    useGetDealsActionPreviewQuery,
    filterVal,
    setFilterVal,
    setIsFilter,
    dealViewsData,
    handleDeleteDeals,
    viewColumns,
    setViewColumns,
    setTabData,
    tabData,
    tabsArr,
    getTabValue,
    tab,
    setTab,
  };
};

export default useDealSaleSite;
