import { useState } from 'react';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import {
  useGetQuickLinksQuery,
  useGetGroupQuickLinksQuery,
  // useGetQuickLinkByIdQuery,
  // usePostQuickLinkMutation,
  // useUpdateQuickLinkMutation,
  useDeleteQuickLinkMutation,
} from '@/services/superAdmin/settings/quick-links';
import { DATE_FORMAT } from '@/constants';
import { PAGINATION } from '@/config';
import { useGetProductsQuery } from '@/services/superAdmin/plan-mangement';

const useFaqs = () => {
  const [selectedRow, setSelectedRow]: any = useState([]);
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
        type: 'SUPER_ADMIN',
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

  const { data: dataGetGroupQuickLinks, isLoading: loagingGroupLinks } =
    useGetGroupQuickLinksQuery({});

  // const [switchChecked, setSwitchChecked] = useState(false);
  // const handleSwitchChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   link: any,
  // ) => {
  //   const newCheckedValue = event.target.checked;
  //   console.log(`event.target.name ${event.target.name}`);
  // };

  // const getQuickLinksData = () => {
  //   getActiveProducts.map((product:any) => (
  //     {
  //       _id: product?._id,
  //       productName:
  //     }
  //   ))
  // }

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
    dataGetGroupQuickLinks,
    loagingGroupLinks,
    // handleSwitchChange,
  };
};

export default useFaqs;
