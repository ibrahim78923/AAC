import { useState } from 'react';
import { useRouter } from 'next/router';
import { AIR_SALES } from '@/routesConstants/paths';
import { PAGINATION } from '@/config';
import { useGetInvoiceQuery } from '@/services/airSales/invoices';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

const useListView = () => {
  const router = useRouter();
  // const [selectedRow, setSelectedRow]: any = useState([]);
  // const [isActionsDisabled, setIsActionsDisabled] = useState(true);
  // const [rowId, setRowId] = useState(null);
  const [searchBy, setSearchBy] = useState(null);
  const [filterParams, setFilterParams] = useState({});
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const paginationParams = {
    page: page,
    limit: pageLimit,
  };
  let searchPayLoad;
  if (searchBy) {
    searchPayLoad = { search: searchBy };
  }
  const methodsFilter: any = useForm();
  const { handleSubmit: handleMethodFilter, reset: resetFilters } =
    methodsFilter;
  const { data: InvoiceData, isLoading } = useGetInvoiceQuery({
    params: { ...paginationParams, ...searchPayLoad, ...filterParams },
  });

  // Dropdown Menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(anchorEl);
  const handleActionsMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleActionsMenuClose = () => {
    setAnchorEl(null);
  };

  // Filters
  const [openFilters, setOpenFilters] = useState(false);
  const handleOpenFilters = () => {
    setOpenFilters(true);
  };
  const handleCloseFilters = () => {
    setOpenFilters(false);
  };

  const onSubmitFilters = async (values: any) => {
    const { createdAt, ...others } = values;
    const dateStart = createdAt?.[0]
      ? dayjs(createdAt[0]).format(DATE_FORMAT.API)
      : null;
    const dateEnd = createdAt?.[1]
      ? dayjs(createdAt[1]).format(DATE_FORMAT.API)
      : null;
    setFilterParams((prev) => {
      const updatedParams = {
        ...prev,
        ...others,
      };

      if (dateStart !== null && dateEnd !== null) {
        updatedParams.dateStart = dateStart;
        updatedParams.dateEnd = dateEnd;
      }

      return updatedParams;
    });
    handleCloseFilters();
  };
  const handleFiltersSubmit = handleMethodFilter(onSubmitFilters);

  // Refresh
  const handleRefresh = () => {
    setPageLimit(PAGINATION?.PAGE_LIMIT);
    setPage(PAGINATION?.CURRENT_PAGE);
    setFilterParams({});
    resetFilters();
  };

  const handleIsViewPage = () => {
    handleActionsMenuClose();
    router.push(AIR_SALES?.SALES_VIEW_INVOICES);
  };

  const handleDeleteModal = () => {
    handleActionsMenuClose();
    setIsDeleteModal(true);
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const onSubmit = () => {};

  const methods: any = useForm();
  const { handleSubmit } = methods;

  return {
    anchorEl,
    actionMenuOpen,
    handleActionsMenuClick,
    handleActionsMenuClose,

    searchBy,
    setSearchBy,

    openFilters,
    handleOpenFilters,
    handleCloseFilters,
    methodsFilter,
    handleFiltersSubmit,
    handleRefresh,

    isDeleteModal,
    setIsDeleteModal,

    handleIsViewPage,
    handleDeleteModal,

    InvoiceData,
    isLoading,
    setPage,
    setPageLimit,
    isDrawerOpen,
    setIsDrawerOpen,
    onSubmit,
    handleSubmit,
    methods,
  };
};

export default useListView;
