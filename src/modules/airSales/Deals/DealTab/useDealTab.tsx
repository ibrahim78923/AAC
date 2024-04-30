import {
  useDeleteDealsMutation,
  useGetCustomizeColumnQuery,
  useGetDealsLifecycleStageQuery,
  useGetDealsListQuery,
  useGetDealPipeLineQuery,
  useGetDealsViewsQuery,
} from '@/services/airSales/deals';
import { useState } from 'react';
import { AllDealColumns } from './TableColumns/AllDealColumns';
import { PAGINATION } from '@/config';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { AIR_SALES } from '@/routesConstants/paths';
import { useGetSalesProductlineItemQuery } from '@/services/airSales/quotes';

interface Filters {
  page: number;
  limit: number;
  search?: string;
  dealPipelineId?: string;
  name?: string;
  ownerId?: string;
  dealStageId?: string;
  dateStart?: string;
  dateEnd?: string;
}

const useDealTab = () => {
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

  const filterValues = {
    page: PAGINATION?.CURRENT_PAGE,
    limit: PAGINATION?.PAGE_LIMIT,
  };

  const [value, setValue] = useState(0);
  const [filters, setFilters] = useState<Filters>(filterValues);

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [listView, setListView] = useState<string>('listView');

  const [deleteDealsMutation, { isLoading: deleteDealLoading }] =
    useDeleteDealsMutation();

  const { data: dealViewsData } = useGetDealsViewsQuery({});
  const {
    data: getDealsTableList,
    isLoading,
    isSuccess,
  } = useGetDealsListQuery(filters);

  const params = {
    meta: true,
  };
  const { data: dealCustomzieCol, isLoading: customizeLoading } =
    useGetCustomizeColumnQuery({
      type: 'deals',
    });

  const activeColumns = dealCustomzieCol?.data?.columns?.filter(
    (column: { active: boolean }) => column?.active,
  );

  const { data: DealsLifecycleStageData } = useGetDealsLifecycleStageQuery({});
  const { data: pipelineData } = useGetDealPipeLineQuery(params);

  const dealListApiUrl = dealViewsData?.data?.map((obj: any) => {
    const dateStart = obj?.apiUrl?.match(/dateStart=([^&]*)/);
    const dateEnd = obj?.apiUrl?.match(/dateEnd=([^&]*)/);
    let dealPipelineId;
    let dealOwnerId;
    let dealStageId;

    if (obj?.apiUrl?.match(/dealPipelineId=([^&]*)/)) {
      dealPipelineId = obj?.apiUrl?.match(/dealPipelineId=([^&]*)/)[1];
    }
    if (obj?.apiUrl?.match(/dealOwnerId=([^&]*)/)) {
      dealOwnerId = obj?.apiUrl?.match(/dealOwnerId=([^&]*)/)[1];
    }
    if (obj?.apiUrl?.match(/dealStageId=([^&]*)/)) {
      dealStageId = obj?.apiUrl?.match(/dealStageId=([^&]*)/)[1];
    }
    return {
      ...(dateStart && { dateStart }),
      ...(dateEnd && { dateEnd }),
      name: obj?.name,
      ...(dealPipelineId && { dealPipelineId }),
      ...(dealOwnerId && { dealOwnerId }),
      ...(dealStageId && { dealStageId }),
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
  const handleSearch = (value: string) => {
    if (value) setFilters({ ...filters, search: value });
    else setFilters(filterValues);
  };
  const handleTabChange = (tab: any) => {
    const tabName = tab?.name;
    const ownerId = tab?.dealOwnerId;
    delete tab?.name;
    delete tab?.dealOwnerId;
    if (tabName === 'All Deals') {
      setFilters(filterValues);
    } else {
      setFilters({
        ...tab,
        ownerId,
      });
    }
  };
  const onPageChange = (page: number) => {
    setFilters({ ...filters, page });
  };
  const onPageLimitChange = (limit: number) => {
    setFilters({ ...filters, limit });
  };

  const handeApplyFilter = (values: any) => {
    const filteredObj = Object?.fromEntries(
      Object?.entries(values)?.filter(
        (value) => value[1] !== '' && value[1] !== null,
      ),
    );
    setFilters({ ...filters, ...filteredObj });
  };

  const handleResetFilters = () => {
    setFilters(filterValues);
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
    onPageChange,
    setPage: onPageChange,
    setPageLimit: onPageLimitChange,
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
    handleTabChange,
    allDealsData,
    dealTableData,
    handleSearch,
    selectedRows,
    setFilters,
    setSelectedRows,
    handleDeleteDeals,
    handeApplyFilter,
    handleListViewClick,
    handleResetFilters,
    handleFilter,
    isFilterDrawer,
    handleAddTab,
    isAddTabOpen,
    handleSMD,
    isShareDine,
    handleActions,
    isAssign,
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
    pipelineData,
    dealCustomzieCol,
    activeColumns,
    salesProduct,
    deleteDealLoading,
    customizeLoading,
  };
};

export default useDealTab;
