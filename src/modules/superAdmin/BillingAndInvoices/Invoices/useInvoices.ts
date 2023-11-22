import { useState } from 'react';
import {
  FilterInvoiceDefaultValues,
  FilterInvoiceValidationSchema,
  columns,
} from './Invoices.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useGetBillingHistoryQuery } from '@/services/superAdmin/billing-invoices';

const useInvoices = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openViewInvoice, setOpenViewInvoice] = useState(false);
  const [openPayInvoice, setOpenPayInvoice] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isGetRowValues, setIsGetRowValues] = useState('');

  const { data: allInvoicesTableData } = useGetBillingHistoryQuery<any>({
    refetchOnMountOrArgChange: true,
    pagination: `page=1&limit=10`,
    organizationPlanId: '655c599e31965468dc7e9af8',
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

  const onSubmit = () => {
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
    allInvoicesTableData,
    isGetRowValues,
  };
};

export default useInvoices;
