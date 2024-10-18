import {
  useDeleteDealsMutation,
  useGetCustomizeColumnQuery,
  useGetDealsLifecycleStageQuery,
  useGetDealsListQuery,
  useLazyGetDealPipeLineListQuery,
} from '@/services/airSales/deals';
import { useState } from 'react';
import { AllDealColumns } from './TableColumns/AllDealColumns';
import { PAGINATION } from '@/config';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { AIR_SALES } from '@/routesConstants/paths';
import { useGetSalesProductlineItemQuery } from '@/services/airSales/quotes';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

const useDealTab = (dealViewsData?: any) => {
  const router = useRouter();
  const [isFilterDrawer, setIsFilterDrawer] = useState(false);
  const [isAddTabOpen, setIsAddTabOpen] = useState(false);
  const [isDealCustomize, setIsDealCustomize] = useState(false);
  const [isExportRecord, setIsExportRecord] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isShareDine, setIsShareDine] = useState(false);
  const [isAssign, setIsAssign] = useState(false);
  const [viewColumns, setViewColumns] = useState([
    'createdBy',
    'name',
    'closeDate',
    'amount',
    'dealStage',
    'dealPipeline',
  ]);

  const [value, setValue] = useState(0);
  const [filters, setFilters] = useState<any>({});

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [searchDeal, setSearchDeal] = useState('');

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [listView, setListView] = useState<string>('listView');

  const [deleteDealsMutation, { isLoading: deleteDealLoading }] =
    useDeleteDealsMutation();

  const dealListparams = {
    page: page,
    limit: pageLimit,
    search: searchDeal ? searchDeal : undefined,
    dealPipelineId: filters?.dealPipelineId
      ? filters?.dealPipelineId?._id
      : undefined,
    name: filters?.dealName ? filters?.dealName : undefined,
    ownerId: filters?.dealOwner ? filters?.dealOwner?._id : undefined,
    dealStageId: filters?.dealStage ? filters?.dealStage : undefined,
    dateStart: filters.dateStart
      ? dayjs(filters?.dateStart)?.format(DATE_FORMAT?.API)
      : undefined,
    dateEnd: filters?.dateEnd
      ? dayjs(filters?.dateEnd)?.format(DATE_FORMAT?.API)
      : undefined,
  };

  const {
    data: getDealsTableList,
    isLoading,
    isSuccess,
  } = useGetDealsListQuery(dealListparams);

  const { data: dealCustomzieCol, isLoading: customizeLoading } =
    useGetCustomizeColumnQuery({
      type: 'deals',
    });

  const activeColumns = dealCustomzieCol?.data?.columns?.filter(
    (column: { active: boolean }) => column?.active,
  );

  const { data: DealsLifecycleStageData } = useGetDealsLifecycleStageQuery({});
  const pipelineListDropdown = useLazyGetDealPipeLineListQuery();

  const dealListApiUrl = dealViewsData?.map((obj: any) => {
    let dealPipelineId;
    let dealOwner;
    let dealStage;
    let dateStart;
    let dateEnd;

    if (obj?.apiUrl?.match(/dateStart=([^&]*)/)) {
      dateStart = obj?.apiUrl?.match(/dateStart=([^&]*)/)[1];
    }
    if (obj?.apiUrl?.match(/dateEnd=([^&]*)/)) {
      dateEnd = obj?.apiUrl?.match(/dateEnd=([^&]*)/)[1];
    }
    if (obj?.apiUrl?.match(/dealPiplineId=([^&]*)/)) {
      dealPipelineId = { _id: obj?.apiUrl?.match(/dealPiplineId=([^&]*)/)[1] };
    }
    if (obj?.apiUrl?.match(/dealOwnerId=([^&]*)/)) {
      dealOwner = { _id: obj?.apiUrl?.match(/dealOwnerId=([^&]*)/)[1] };
    }
    if (obj?.apiUrl?.match(/dealStageId=([^&]*)/)) {
      dealStage = obj?.apiUrl?.match(/dealStageId=([^&]*)/)[1];
    }
    return {
      name: obj?.name,
      ...(dateStart && { dateStart }),
      ...(dateEnd && { dateEnd }),
      ...(dealPipelineId && { dealPipelineId }),
      ...(dealOwner && { dealOwner }),
      ...(dealStage && { dealStage }),
    };
  });
  const { data: salesProduct } = useGetSalesProductlineItemQuery({});

  const tabsArray = [{ name: 'All Deals', dateStart: '', dateEnd: '' }]?.concat(
    dealListApiUrl,
  );
  const handleFilter = () => {
    setIsFilterDrawer(!isFilterDrawer);
  };
  const handleAddTab = () => {
    setIsAddTabOpen(!isAddTabOpen);
  };
  const handleChange = (tab: any, index: number) => {
    tab;
    setValue(index);
  };
  const allDealsParams: any = {
    page: page,
    limit: pageLimit,
  };
  const handleTabChange = (tab: any) => {
    const tabName = tab?.name;
    delete tab?.name;
    if (tabName === 'All Deals') {
      setFilters(allDealsParams);
    } else {
      setFilters({
        ...tab,
        dealOwner: tab?.dealOwner,
        dealPipelineId: tab?.dealPipelineId,
        dealStage: tab?.dealStage,
        dateStart: tab?.dateStart,
        dateEnd: tab?.dateEnd,
      });
    }
  };
  const handleResetFilters = () => {
    setFilters({});
  };

  const handleListViewClick = (val: string) => {
    setListView(val);
    setSelectedRows([]);
  };
  const handleSMD = () => {
    setIsShareDine(!isShareDine);
  };
  const handleExportRecord = () => {
    setIsExportRecord(!isExportRecord);
  };
  const handleAssignModal = () => {
    setIsAssign(!isAssign);
  };
  const handleDeleteModal = () => {
    setIsDelete(!isDelete);
  };
  const handleDealCustomize = () => setIsDealCustomize(!isDealCustomize);

  const handleActions = (value: string | any) => {
    switch (value) {
      case 'Preview':
        handleSMD();
        break;
      case 'Re-assign':
        handleAssignModal();
        break;
      case 'Delete':
        handleDeleteModal();
        break;
      case 'Export':
        handleExportRecord();
        break;
      case 'View Details':
        router.push({
          pathname: AIR_SALES?.VIEW_DETAILS,
          query: { id: selectedRows },
        });
        break;
      default:
        break;
    }
  };
  const allDealsData = getDealsTableList?.data?.deals;
  const handleSelectAllCheckbox = (checked: any) => {
    setSelectedRows(
      checked ? allDealsData?.map((obj: { _id: string }) => obj?._id) : [],
    );
  };
  const handleSelectSingleCheckBox = (checked: boolean, id: string) => {
    if (checked) setSelectedRows([...selectedRows, id]);
    else setSelectedRows(selectedRows?.filter((row) => row !== id));
  };

  const allDealsColumns = AllDealColumns({
    handleSelectAllCheckbox,
    handleSelectSingleCheckBox,
    isAllSelected:
      allDealsData?.length !== 0 &&
      allDealsData?.length === selectedRows?.length,
    selectedRows,
    activeColumns,
  });

  const dealTableData = {
    columns: allDealsColumns,
    data: allDealsData,
    totalRecords: getDealsTableList?.data?.meta?.total,
    pageLimit: getDealsTableList?.data?.meta?.limit,
    currentPage: getDealsTableList?.data?.meta?.page,
    onPageChange: (val: any) => setPage(val),
    setPage: setPage,
    setPageLimit: setPageLimit,
    count: getDealsTableList?.data?.meta?.pages,
    isPagination: true,
    isLoading,
    isSuccess,
  };

  const handleDeleteDeals = async () => {
    try {
      await deleteDealsMutation({ ids: selectedRows });
      enqueueSnackbar('Deals deleted successfully', {
        variant: 'success',
      });
      setSelectedRows([]);
      handleDeleteModal();
    } catch (error) {
      enqueueSnackbar('Error while deleting deals', {
        variant: 'error',
      });
    }
  };
  return {
    listView,
    tabsArray,
    value,
    handleChange,
    searchDeal,
    setSearchDeal,
    handleTabChange,
    allDealsData,
    dealTableData,
    selectedRows,
    setSelectedRows,
    handleDeleteDeals,
    handleListViewClick,
    handleResetFilters,
    handleFilter,
    setFilters,
    isFilterDrawer,
    handleAddTab,
    isAddTabOpen,
    handleSMD,
    isShareDine,
    handleActions,
    isAssign,
    pipelineListDropdown,
    handleAssignModal,
    isDelete,
    handleDeleteModal,
    isExportRecord,
    handleExportRecord,
    isDealCustomize,
    handleDealCustomize,
    setViewColumns,
    viewColumns,
    DealsLifecycleStageData,
    dealCustomzieCol,
    activeColumns,
    salesProduct,
    deleteDealLoading,
    customizeLoading,
    isLoading,
    filters,
    page,
    pageLimit,
  };
};

export default useDealTab;
