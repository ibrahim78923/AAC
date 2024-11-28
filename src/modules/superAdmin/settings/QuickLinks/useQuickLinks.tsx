import { useState } from 'react';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import {
  useGetQuickLinksQuery,
  useGetGroupQuickLinksQuery,
  useUpdateQuickLinkMutation,
  useDeleteQuickLinkMutation,
  useGetQuickLinksProductsQuery,
} from '@/services/superAdmin/settings/quick-links';
import { DATE_FORMAT } from '@/constants';
import { PAGINATION } from '@/config';
import { FilterValuesI } from './QuickLinks.interface';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

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
      if (productId === 'ORG_ADMIN') {
        updatedParams.type = 'ORG_ADMIN';
      } else if (productId === 'SUPER_ADMIN') {
        updatedParams.type = 'SUPER_ADMIN';
      } else {
        updatedParams.productId = productId;
        updatedParams.type = 'PRODUCT';
      }
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
      successSnackbar('Record has been deleted.');
      setIsActionsDisabled(true);
    } catch (error: any) {
      errorSnackbar('An error occured');
    }
  };

  const { data: getProducts } = useGetQuickLinksProductsQuery({
    params: { status: 'active' },
  });

  const selectProductOptions = () => {
    const staticProducts = [
      { value: 'ORG_ADMIN', label: 'Org Admin' },
      { value: 'SUPER_ADMIN', label: 'Super Admin' },
    ];

    const activeProducts =
      getProducts?.data?.map((product: any) => ({
        value: product?._id,
        label: product?.name,
      })) || [];

    return [...staticProducts, ...activeProducts];
  };

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
      successSnackbar('Quick Link updated successfully');
    } catch (error: any) {
      errorSnackbar('An error occured');
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
