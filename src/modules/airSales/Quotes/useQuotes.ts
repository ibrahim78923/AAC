import { useState } from 'react';
import { useRouter } from 'next/router';
import { PAGINATION } from '@/config';
import { useForm } from 'react-hook-form';
import { AIR_SALES } from '@/routesConstants/paths';
import {
  useGetQuotesQuery,
  // useDeleteQuotesMutation,
  // useUpdateQuoteMutation,
} from '@/services/airSales/quotes';

const useQuotes = () => {
  const router = useRouter();

  // Actions Dopdown
  const [actionsEl, setActionsEl] = useState<null | HTMLElement>(null);
  const openActionsDropdown = Boolean(actionsEl);
  const handleActionsDropdown = (event: React.MouseEvent<HTMLElement>) => {
    setActionsEl(event.currentTarget);
  };
  const handleActionsDropdownClose = () => {
    setActionsEl(null);
  };

  const handleEditQuote = (id: any) => {
    router.push({ pathname: AIR_SALES?.UPDATE_QUOTE, query: { data: id } });
    handleActionsDropdownClose();
  };

  const handleViewQuote = () => {
    router.push(AIR_SALES?.VIEW_QUOTE);
    handleActionsDropdownClose();
  };

  // Row Selection
  const [selectedRow, setSelectedRow]: any = useState([]);
  const [isActionsDisabled, setIsActionsDisabled] = useState(true);
  const [rowId, setRowId] = useState(null);

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const defaultParams = {
    page: PAGINATION?.CURRENT_PAGE,
    limit: PAGINATION?.PAGE_LIMIT,
  };
  const [searchValue, setSearchValue] = useState(null);
  const [filterParams, setFilterParams] = useState({
    page: page,
    limit: pageLimit,
  });
  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }
  const methodsFilter: any = useForm();
  const { handleSubmit: handleMethodFilter, reset: resetFilters } =
    methodsFilter;
  const { data: dataGetQuotes, isLoading: loagingGetQuotes } =
    useGetQuotesQuery({
      params: { ...filterParams, ...searchPayLoad },
    });

  // Filters
  const [openFilters, setOpenFilters] = useState(false);
  const handleOpenFilters = () => {
    setOpenFilters(true);
  };
  const handleCloseFilters = () => {
    setOpenFilters(false);
  };

  const onSubmitFilters = async (values: any) => {
    setFilterParams((prev) => {
      return {
        ...prev,
        ...values,
      };
    });
    handleCloseFilters();
  };
  const handleFiltersSubmit = handleMethodFilter(onSubmitFilters);

  // Hadle PAGE CHANGE
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setFilterParams((prev) => {
      return {
        ...prev,
        page: newPage,
      };
    });
  };

  // Refresh
  const handleRefresh = () => {
    setFilterParams(defaultParams);
    resetFilters();
  };

  // Customize Columns Drawer
  const [checkedColumns, setcheckedColumns] = useState<any>(null);
  const [customizedColumns, setCustomizedColumns] = useState(checkedColumns);
  const [openCustomizeColumns, setOpenCustomizeColumns] = useState(false);
  const handleOpenCustomizeColumns = () => {
    setOpenCustomizeColumns(true);
  };
  const handleCloseCustomizeColumns = () => {
    setOpenCustomizeColumns(false);
  };
  const handleToggleColumns = (value: number) => () => {
    const currentIndex = checkedColumns?.indexOf(value);
    const newChecked = [...checkedColumns];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setcheckedColumns(newChecked);
  };
  const handleApplyColumns = () => {
    customizedColumns.filter((column: any) =>
      checkedColumns.includes(column.id),
    );
  };

  // Modal Delete Quote
  const [openDeleteQuote, setOpenDeleteQuote] = useState(false);
  const handleOpenDeleteQuote = () => {
    setOpenDeleteQuote(true);
    handleActionsDropdownClose();
  };
  const handleCloseDeleteQuote = () => {
    setOpenDeleteQuote(false);
  };

  return {
    openFilters,
    handleOpenFilters,
    handleCloseFilters,
    methodsFilter,
    handleMethodFilter,
    handleFiltersSubmit,
    pageLimit,
    setPageLimit,
    setSearchValue,
    page,
    setPage,
    handleRefresh,
    handlePageChange,
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    isActionsDisabled,
    setRowId,
    rowId,
    actionsEl,
    openActionsDropdown,
    handleActionsDropdown,
    handleActionsDropdownClose,
    openCustomizeColumns,
    handleOpenCustomizeColumns,
    handleCloseCustomizeColumns,
    handleToggleColumns,
    checkedColumns,
    setcheckedColumns,
    customizedColumns,
    setCustomizedColumns,
    handleApplyColumns,
    handleEditQuote,
    handleViewQuote,
    openDeleteQuote,
    handleOpenDeleteQuote,
    handleCloseDeleteQuote,
    dataGetQuotes,
    loagingGetQuotes,
  };
};

export default useQuotes;
