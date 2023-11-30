import { useState } from 'react';
import { FilterInvoiceValidationSchema, columns } from './Invoices.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useGetBillingHistoryQuery } from '@/services/superAdmin/billing-invoices';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { PAGINATION } from '@/config';

const useInvoices = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openViewInvoice, setOpenViewInvoice] = useState(false);
  const [openPayInvoice, setOpenPayInvoice] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isGetRowValues, setIsGetRowValues] = useState('');
  const [searchByClientName, setSearchByClientName] = useState('');
  const [filterValues, setFilterValues] = useState({});
  const searchObject = { search: searchByClientName };
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const { data: allInvoicesTableData } = useGetBillingHistoryQuery<any>({
    pagination: `page=1&limit=10`,
    params: { ...filterValues, ...searchObject, page: page, limit: pageLimit },
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

  const FilterInvoiceFilters = useForm({
    resolver: yupResolver(FilterInvoiceValidationSchema),
    defaultValues: {},
  });

  const onSubmit = (values: any) => {
    const { organizationId, productId, planTypeId, status } = values;

    const filterPayloadValues = {
      organizationId,
      productId,
      planTypeId,
      status,
      ...(values.billingDate && {
        billingDate: dayjs(values?.billingDate)?.format(DATE_FORMAT?.API),
      }),
      ...(values.dueDate && {
        dueDate: dayjs(values?.dueDate)?.format(DATE_FORMAT?.API),
      }),
    };

    setFilterValues(filterPayloadValues);
    setIsOpenFilter(false);
    reset();
  };

  const handleRefresh = async () => {
    setFilterValues('');
  };

  const { handleSubmit, reset } = FilterInvoiceFilters;

  const getRowValues = columns(
    setIsGetRowValues,
    setIsChecked,
    isChecked,
    isGetRowValues,
  );

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
    setIsGetRowValues,
    setIsChecked,
    isChecked,
    allInvoicesTableData,
    isGetRowValues,
    searchByClientName,
    setSearchByClientName,
    handleRefresh,
    setPage,
    setPageLimit,
  };
};

export default useInvoices;
