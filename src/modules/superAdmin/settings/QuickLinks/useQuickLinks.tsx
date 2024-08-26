import { useState } from 'react';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import {
  useGetQuickLinksQuery,
  useGetGroupQuickLinksQuery,
  useUpdateQuickLinkMutation,
  useDeleteQuickLinkMutation,
} from '@/services/superAdmin/settings/quick-links';
import { DATE_FORMAT } from '@/constants';
import { PAGINATION } from '@/config';
import { useGetProductsQuery } from '@/services/superAdmin/plan-mangement';
import { FilterValuesI } from './QuickLinks.interface';

const useQuickLinks = () => {
  const [selectedRow, setSelectedRow] = useState<string[]>([]);
  const [isActionsDisabled, setIsActionsDisabled] = useState(true);
  const [rowId, setRowId] = useState(null);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [searchValue, setSearchValue] = useState(null);
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
  const { data: dataGetQuickLinks, isLoading: loagingGetQuickLinks } =
    useGetQuickLinksQuery({
      params: {
        isActive: 'TRUE',
        ...filterParams,
        ...searchPayLoad,
        ...paginationParams,
      },
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

  const onSubmitFilters = async (values: FilterValuesI) => {
    const { createdAt, productId } = values;

    const formattedDates = createdAt?.map((date: any) =>
      date ? dayjs(date).format(DATE_FORMAT?.API) : null,
    );
    const [dateStart, dateEnd] = formattedDates ?? [null, null];

    const updatedParams: any = {};

    if (dateStart !== null && dateEnd !== null) {
      updatedParams.dateStart = dateStart;
      updatedParams.dateEnd = dateEnd;
    }

    if (productId) {
      updatedParams.productId = productId;
      updatedParams.type = 'PRODUCT';
    }

    setFilterParams((prev) => ({
      ...prev,
      ...updatedParams,
    }));

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

  // Delete QuickLink
  const [isLinkDeleteModal, setIsLinkDeleteModal] = useState(false);
  const [deleteQuickLink, { isLoading: loadingDelete }] =
    useDeleteQuickLinkMutation();
  const handleOpenModalDelete = () => {
    handleActionsMenuClose();
    setIsLinkDeleteModal(true);
  };
  const handleCloseModalDelete = () => {
    setIsLinkDeleteModal(false);
  };

  const handleDeleteQuickLink = async () => {
    const items = await selectedRow?.join(',');
    try {
      await deleteQuickLink(items)?.unwrap();
      handleCloseModalDelete();
      setSelectedRow([]);
      enqueueSnackbar('Record has been deleted.', {
        variant: 'success',
      });
      setIsActionsDisabled(true);
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  const { data: getActiveProducts } = useGetProductsQuery({});
  const selectProductOptions = getActiveProducts?.data?.map((product: any) => ({
    value: product?._id,
    label: product?.name,
  }));

  const {
    data: dataGetGroupQuickLinks,
    isLoading: loagingGroupLinks,
    isSuccess,
  } = useGetGroupQuickLinksQuery({});
  const mergedProducts: any[] = isSuccess
    ? [
        ...dataGetGroupQuickLinks?.data?.productsData,
        ...dataGetGroupQuickLinks?.data?.nonProductData,
      ]
    : [];

  const [updateFaq, { isLoading: loadingUpdateQuickLink }] =
    useUpdateQuickLinkMutation();
  const handleSwitchChange = async (id: string, isActive: boolean) => {
    const payload = {
      isActive: !isActive,
    };

    try {
      await updateFaq({ id: id, body: payload })?.unwrap();
      enqueueSnackbar('Quick Link updated successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  function convertFormat(str: string) {
    if (str?.includes('_')) {
      return str
        .split('_')
        .map(
          (word) => word?.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(' ');
    } else {
      return str;
    }
  }

  return {
    anchorEl,
    actionMenuOpen,
    handleActionsMenuClick,
    handleActionsMenuClose,
    setSearchValue,
    openFilters,
    handleOpenFilters,
    handleCloseFilters,
    loagingGetQuickLinks,
    dataGetQuickLinks,
    searchValue,
    methodsFilter,
    handleFiltersSubmit,
    handleRefresh,

    loadingDelete,
    handleDeleteQuickLink,
    isLinkDeleteModal,
    handleOpenModalDelete,
    handleCloseModalDelete,

    setPageLimit,
    setPage,
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    isActionsDisabled,
    setRowId,
    rowId,

    selectProductOptions,
    mergedProducts,
    loagingGroupLinks,
    handleSwitchChange,
    loadingUpdateQuickLink,
    convertFormat,
  };
};

export default useQuickLinks;
