import { useState } from 'react';

import { useRouter } from 'next/router';

import { useTheme } from '@mui/material';

import {
  useDeleteDealsMutation,
  useGetDealsActionPreviewQuery,
  useGetDealsLifecycleStageQuery,
  useGetDealsListQuery,
  // useLazyGetDealsListQuery,
  // useGetDealsListQuery,
  useGetDealPipeLineQuery,
  // useGetDealsUserListQuery,
  useGetDealsViewsQuery,
  // useGetUsersListQuery,
} from '@/services/airSales/deals';
import { enqueueSnackbar } from 'notistack';
import { AIR_SALES } from '@/routesConstants/paths';
import { PAGINATION } from '@/config';

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
  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const [checkedGridView, setCheckedGridView] = useState<string[]>([]);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);

  const [filterValues, setFilterValues] = useState({
    dealPiplineId: '',
    name: '',
    dealOwnerId: '',
    dealStageId: '',
    dateStart: null,
    dateEnd: null,
  });

  const params = {
    meta: true,
  };

  const dealsparams: any = {
    page: page,
    limit: pageLimit,
    search: search ? search : undefined,
    dealPiplineId: filterValues?.dealPiplineId
      ? filterValues?.dealPiplineId
      : undefined,
    name: filterValues?.name ? filterValues?.name : undefined,
    dealOwnerId: filterValues?.dealOwnerId
      ? filterValues?.dealOwnerId
      : undefined,
    dealStageId: filterValues?.dealStageId
      ? filterValues?.dealStageId
      : undefined,
    dateStart: filterValues?.dateStart ?? undefined,
    dateEnd: filterValues?.dateEnd ?? undefined,
  };

  const { data: pipelineData } = useGetDealPipeLineQuery(params);

  const { data: DealsLifecycleStageData } = useGetDealsLifecycleStageQuery({});
  // const { data: DealsUserListData } = useGetDealsUserListQuery({});
  const {
    data: getDealsTableList,
    isLoading,
    isSuccess,
  } = useGetDealsListQuery(dealsparams);

  // const [selectedIds, setSelectedIds] = useState<string[]>([]);
  // const [selectedTableIds, setSelectedTableIds] = useState<string[]>([]);
  // const [filterVal, setFilterVal] = useState({});
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
    // dateStart: '2023-10-01', // use in future dynamicaly values
    // dateEnd: '2023-10-31',
  });

  const handleSelectDealById = (checked: boolean, id: string): void => {
    if (checked) {
      setCheckedRows([...checkedRows, id]);
    } else {
      setCheckedRows(checkedRows?.filter((_id: any) => _id !== id));
    }
  };

  const handleSelectAllDeals = (checked: boolean): void => {
    setCheckedRows(
      checked ? getDealsTableList?.data?.deals?.map(({ _id }: any) => _id) : [],
    );
  };

  const handleCheckedGrid = (checked: boolean, id: string): void => {
    if (checked) {
      setCheckedGridView([...checkedGridView, id]);
    } else {
      setCheckedGridView(checkedGridView?.filter((_id: any) => _id !== id));
    }
  };
  const tabsArr = dealViewsData?.data?.map((obj: any) => obj?.name);

  const handleResetFilters = () => {
    setFilterValues({
      dealPiplineId: '',
      name: '',
      dealOwnerId: '',
      dealStageId: '',
      dateStart: null,
      dateEnd: null,
    });
  };
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
    setCheckedRows([]);
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
      await deleteDealsMutation({ ids: checkedRows });
      enqueueSnackbar('Deals deleted successfully', {
        variant: 'success',
      });
      setCheckedRows([]);
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
    useGetDealsActionPreviewQuery,
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
    checkedRows,
    setCheckedRows,
    getDealsTableList,
    filterValues,
    setFilterValues,
    handleResetFilters,
    handleSelectAllDeals,
    handleSelectDealById,
    handleCheckedGrid,
    checkedGridView,
    setPage,
    page,
    setPageLimit,
    pageLimit,
    isLoading,
    isSuccess,
  };
};

export default useDealSaleSite;
