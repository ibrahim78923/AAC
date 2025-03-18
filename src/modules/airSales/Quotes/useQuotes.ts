import { useState } from 'react';
import { useRouter } from 'next/router';
import { PAGINATION } from '@/config';
import { useForm } from 'react-hook-form';
import { AIR_SALES } from '@/routesConstants/paths';
import {
  useDeleteQuotesMutation,
  useGetQuotesQuery,
} from '@/services/airSales/quotes';
import { enqueueSnackbar } from 'notistack';
import { MEETINGS_DETAILS_TYPE, NOTISTACK_VARIANTS } from '@/constants/strings';

const useQuotes = () => {
  const router = useRouter();
  const [actionsEl, setActionsEl] = useState<null | HTMLElement>(null);
  const openActionsDropdown = Boolean(actionsEl);
  const handleActionsDropdown = (event: React.MouseEvent<HTMLElement>) => {
    setActionsEl(event?.currentTarget);
  };
  const handleActionsDropdownClose = () => {
    setActionsEl(null);
  };

  const handleEditQuote = (id: string) => {
    router?.push({ pathname: AIR_SALES?.UPDATE_QUOTE, query: { data: id } });
    handleActionsDropdownClose();
  };
  // Row Selection
  const [selectedRow, setSelectedRow] = useState<string[]>([]);
  const [isActionsDisabled, setIsActionsDisabled] = useState(true);
  const [rowId, setRowId] = useState('');

  const handleViewQuote = () => {
    router?.push(`${AIR_SALES?.VIEW_QUOTE}?id=${rowId}`);
    handleActionsDropdownClose();
  };

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [searchValue, setSearchValue] = useState('');
  const [isDownloadQuote, setIsDownloadQuote] = useState(false);
  const [filterParams, setFilterParams] = useState({});
  const paginationParams = {
    page: page,
    limit: pageLimit,
  };

  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }
  const methodsFilter: any = useForm();
  const { handleSubmit: handleMethodFilter, reset: resetFilters } =
    methodsFilter;
  const {
    data: dataGetQuotes,
    isLoading: loagingGetQuotes,
    isFetching: fetchingQuotesList,
  } = useGetQuotesQuery({
    params: { ...filterParams, ...searchPayLoad, ...paginationParams },
  });

  const [DeleteQuotes, { isLoading: loadingDeleteQuote }] =
    useDeleteQuotesMutation();

  // Filters
  const [openFilters, setOpenFilters] = useState(false);

  const handleOpenFilters = () => {
    setOpenFilters(true);
  };
  const handleCloseFilters = () => {
    setOpenFilters(false);
  };

  const onSubmitFilters = async (values: any) => {
    values.status =
      values.status === MEETINGS_DETAILS_TYPE?.ALL ? undefined : values?.status;
    values.createdBy = values?.createdBy?._id;
    setFilterParams((prev) => {
      return {
        ...prev,
        ...values,
      };
    });
    handleCloseFilters();
  };
  const handleFiltersSubmit = handleMethodFilter(onSubmitFilters);

  const handleRefresh = () => {
    setPageLimit(PAGINATION?.PAGE_LIMIT);
    setPage(PAGINATION?.CURRENT_PAGE);
    setFilterParams({});
    resetFilters();
  };

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
      newChecked?.push(value);
    } else {
      newChecked?.splice(currentIndex, 1);
    }
    setcheckedColumns(newChecked);
  };
  const handleApplyColumns = () => {
    customizedColumns.filter((column: any) =>
      checkedColumns.includes(column?.id),
    );
  };
  const [openDeleteQuote, setOpenDeleteQuote] = useState(false);

  const handleOpenDeleteQuote = () => {
    setOpenDeleteQuote(true);
  };
  const handleCloseDeleteQuote = () => {
    setOpenDeleteQuote(false);
  };
  const handleDeleteQoute = async () => {
    try {
      await DeleteQuotes({ ids: selectedRow })?.unwrap();
      enqueueSnackbar('Record has been deleted.', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setSelectedRow([]);
      setIsActionsDisabled(true);
      setOpenDeleteQuote(false);
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  // Modal export
  const [openModalExport, setOpenModalExport] = useState(false);
  const handleOpenModalExport = () => {
    setOpenModalExport(true);
  };
  const handleCloseModalExport = () => {
    setOpenModalExport(false);
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
    handleDeleteQoute,
    dataGetQuotes,
    loagingGetQuotes,
    loadingDeleteQuote,
    fetchingQuotesList,
    handleOpenModalExport,
    handleCloseModalExport,
    openModalExport,
    isDownloadQuote,
    setIsDownloadQuote,
  };
};

export default useQuotes;
