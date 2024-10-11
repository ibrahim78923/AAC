import { useState } from 'react';
import {
  FilterInvoiceDefaultValues,
  FilterInvoiceValidationSchema,
  columns,
} from './Invoices.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useGetInvoicesQuery } from '@/services/orgAdmin/subscription-and-invoices';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { OnSubmitFiltersValueI } from './Invoices.interface';
import { PAGINATION } from '@/config';
import { useTheme } from '@emotion/react';

const useInvoices = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openViewInvoice, setOpenViewInvoice] = useState(false);
  const [openPayInvoice, setOpenPayInvoice] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [filterValues, setFilterValues] = useState({});
  const [searchByInvoices, setSearchByInvoices] = useState('');
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const theme = useTheme();
  const handleCheckboxClick = (row: any) => {
    const index = selectedRows.findIndex(
      (selectedRow: any) => selectedRow?._id === row?._id,
    );
    if (index === -1) {
      setSelectedRows([...selectedRows, row]);
    } else {
      const updatedRows = selectedRows?.filter(
        (selectedRow: any) => selectedRow?._id !== row?._id,
      );
      setSelectedRows(updatedRows);
    }
  };

  const paginationParams = {
    page: page,
    limit: pageLimit,
  };

  const searchParam = { search: searchByInvoices };
  const { data, isLoading } = useGetInvoicesQuery({
    params: { ...filterValues, ...searchParam, ...paginationParams },
  });

  const handleActionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenViewInvoice = () => {
    setOpenViewInvoice(true);
    handleClose();
  };
  const handleCloseViewInvoice = () => {
    setOpenViewInvoice(false);
  };

  const handleOpenPayInvoice = () => {
    setOpenPayInvoice(true);
    handleClose();
  };
  const handleClosePayInvoice = () => {
    setOpenPayInvoice(false);
  };
  const handleCloseFilter = () => {
    setIsOpenFilter(false);
    reset();
  };

  const handleRefresh = () => {
    setPageLimit(PAGINATION?.PAGE_LIMIT);
    setPage(PAGINATION?.CURRENT_PAGE);
    setFilterValues({});
    reset();
  };

  const FilterInvoiceFilters = useForm({
    resolver: yupResolver(FilterInvoiceValidationSchema),
    defaultValues: FilterInvoiceDefaultValues,
  });

  const onSubmit = (value: OnSubmitFiltersValueI) => {
    const { status, productId, planId, billingDate, dueDate } = value;
    const filterPayloadValues = {
      ...(status && {
        status: status,
      }),
      productId,
      planId,
      ...(billingDate && {
        billingDate: dayjs(value?.billingDate)?.format(DATE_FORMAT?.API),
      }),
      ...(dueDate && {
        dueDate: dayjs(value?.dueDate)?.format(DATE_FORMAT?.API),
      }),
    };

    setFilterValues(filterPayloadValues);
    setIsOpenFilter(false);
  };

  const { handleSubmit, reset } = FilterInvoiceFilters;

  const getRowValues = columns(selectedRows, handleCheckboxClick);

  return {
    anchorEl,
    open,
    handleClose,
    handleActionsClick,
    openViewInvoice,
    handleOpenViewInvoice,
    handleCloseViewInvoice,
    openPayInvoice,
    handleOpenPayInvoice,
    handleClosePayInvoice,
    setIsOpenFilter,
    isOpenFilter,
    handleCloseFilter,
    onSubmit,
    FilterInvoiceFilters,
    handleSubmit,
    getRowValues,

    invoicesTableData: data?.data?.invoices,
    searchByInvoices,
    setSearchByInvoices,
    data,
    selectedRows,
    isLoading,
    setPageLimit,
    setPage,
    handleRefresh,
    theme,
  };
};

export default useInvoices;
