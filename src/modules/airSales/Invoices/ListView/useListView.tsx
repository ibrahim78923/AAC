import { useState } from 'react';
import { useRouter } from 'next/router';
import { AIR_SALES } from '@/routesConstants/paths';
import { PAGINATION } from '@/config';
import {
  useDeleteInvoiceMutation,
  useGetInvoiceQuery,
  useUpdateInvoiceMutation,
  useLazyGetEmployeeListInvoiceQuery,
} from '@/services/airSales/invoices';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import useAuth from '@/hooks/useAuth';
import { enqueueSnackbar } from 'notistack';

const useListView = () => {
  const router = useRouter();
  const { user }: any = useAuth();
  const orgId = user?.organization?._id;
  const employeeList = useLazyGetEmployeeListInvoiceQuery();

  const [selectedRow, setSelectedRow]: any = useState([]);
  const [isActionsDisabled, setIsActionsDisabled] = useState(true);
  const [rowId, setRowId] = useState(null);
  const [searchBy, setSearchBy] = useState(null);
  const [filterParams, setFilterParams] = useState({});
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
  const {
    data: InvoiceData,
    isLoading,
    isFetching,
  } = useGetInvoiceQuery({
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
    const { creationDate, createdBy, ...others } = values;
    setFilterParams(() => {
      const updatedParams = { ...others };
      if (creationDate != null) {
        updatedParams.creationDate = dayjs(creationDate).format(
          DATE_FORMAT.API,
        );
      }
      if (createdBy != null) {
        updatedParams.createdBy = createdBy?._id;
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
    router.push(`${AIR_SALES?.SALES_INVOICES}/${rowId}`);
  };

  // Delete Invoices
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteInvoice, { isLoading: loadingDelete }] =
    useDeleteInvoiceMutation();
  const handleOpenModalDelete = () => {
    handleActionsMenuClose();
    setIsDeleteModal(true);
  };
  const handleCloseModalDelete = () => {
    setIsDeleteModal(false);
  };

  const handleDeleteInvoice = async () => {
    const ids = await selectedRow;
    try {
      await deleteInvoice(ids)?.unwrap();
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

  // Update Status
  const [updateInvoice, { isLoading: loadingUpdateInvoice }] =
    useUpdateInvoiceMutation();
  const handleUpdateStatus = async (status: string, id: any) => {
    const payLoad = {
      status: status,
    };
    try {
      await updateInvoice({ id: id, body: payLoad })?.unwrap();
      enqueueSnackbar(
        `This invoice is ${
          status === 'PAID'
            ? 'Paid'
            : status === 'DRAFT'
              ? 'Draft'
              : 'Published'
        } now`,
        {
          variant: 'success',
        },
      );
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  return {
    anchorEl,
    actionMenuOpen,
    handleActionsMenuClick,
    handleActionsMenuClose,

    setSearchBy,
    openFilters,
    handleOpenFilters,
    handleCloseFilters,
    methodsFilter,
    handleFiltersSubmit,
    handleRefresh,

    InvoiceData,
    isLoading,
    isFetching,
    setPage,
    setPageLimit,
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    isActionsDisabled,
    setRowId,
    rowId,

    isDeleteModal,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDeleteInvoice,
    loadingDelete,

    employeeList,
    orgId,
    handleIsViewPage,
    handleUpdateStatus,
    loadingUpdateInvoice,
  };
};

export default useListView;
