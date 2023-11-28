import { useState } from 'react';
import {
  FilterInvoiceDefaultValues,
  FilterInvoiceValidationSchema,
  columns,
} from './Invoices.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useGetBillingHistoryQuery } from '@/services/superAdmin/billing-invoices';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

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

  const { data: allInvoicesTableData } = useGetBillingHistoryQuery<any>({
    pagination: `page=1&limit=10`,
    params: filterValues,
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

  const onSubmit = (values: any) => {
    if (values?.ClientOrganization !== '') {
      setFilterValues((prev) => {
        return {
          ...prev,
          organizationId: values?.ClientOrganization,
        };
      });
    }
    if (values?.products !== '') {
      setFilterValues((prev) => {
        return {
          ...prev,
          productId: values?.products,
        };
      });
    }

    if (values?.planType !== '') {
      setFilterValues((prev) => {
        return {
          ...prev,
          planTypeId: values?.planType,
        };
      });
    }

    if (values?.status !== '') {
      setFilterValues((prev) => {
        return {
          ...prev,
          status: values?.status,
        };
      });
    }
    if (values?.InvoiceDate != null && values?.InvoiceDate !== '') {
      setFilterValues((prev) => {
        return {
          ...prev,
          billingDate: dayjs(values?.InvoiceDate)?.format(DATE_FORMAT?.API),
        };
      });
    }
    if (values?.PaymentDate != null && values?.PaymentDate !== '') {
      setFilterValues((prev) => {
        return {
          ...prev,
          dueDate: dayjs(values?.PaymentDate)?.format(DATE_FORMAT?.API),
        };
      });
    }

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
  };
};

export default useInvoices;
