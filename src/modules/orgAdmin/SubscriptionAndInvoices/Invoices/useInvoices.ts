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

const useInvoices = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openViewInvoice, setOpenViewInvoice] = useState(false);
  const [openPayInvoice, setOpenPayInvoice] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isGetRowValues, setIsGetRowValues] = useState('');
  const [filterValues, setFilterValues] = useState({});
  const [searchByInvoices, setSearchByInvoices] = useState('');

  const searchParam = { seacrh: searchByInvoices };
  const { data } = useGetInvoicesQuery({
    params: { ...filterValues, ...searchParam },
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
    defaultValues: FilterInvoiceDefaultValues,
  });

  const onSubmit = (value: any) => {
    const { status, productId, planId, billingDate, dueDate } = value;
    const filterPayloadValues = {
      status,
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
    reset();
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
    invoicesTableData: data?.data?.invoices,
    searchByInvoices,
    setSearchByInvoices,
  };
};

export default useInvoices;
