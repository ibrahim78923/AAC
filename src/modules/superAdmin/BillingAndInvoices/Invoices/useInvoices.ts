import { useState } from 'react';
import {
  FilterInvoiceDefaultValues,
  FilterInvoiceValidationSchema,
  columns,
} from './Invoices.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useGetBillingHistoryQuery } from '@/services/superAdmin/billing-invoices';
import { isNullOrEmpty } from '@/utils';

const useInvoices = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openViewInvoice, setOpenViewInvoice] = useState(false);
  const [openPayInvoice, setOpenPayInvoice] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isGetRowValues, setIsGetRowValues] = useState('');
  const [searchByClientName, setSearchByClientName] = useState('');
  const [orginzationId, setOrginzationId] = useState('');
  const [productId, setProductId] = useState('');
  const [PlanTypeId, setPlanTypeId] = useState('');
  const [status, setStatus] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [paymentDate, setPaymentDate] = useState('');

  const paramsObj: any = {};

  if (!isNullOrEmpty(searchByClientName))
    paramsObj['search'] = searchByClientName;
  if (!isNullOrEmpty(productId)) paramsObj['productId'] = productId;
  if (!isNullOrEmpty(PlanTypeId)) paramsObj['planTypeId'] = PlanTypeId;
  if (!isNullOrEmpty(orginzationId))
    paramsObj['organizationId'] = orginzationId;
  if (!isNullOrEmpty(status)) paramsObj['status'] = status;
  if (!isNullOrEmpty(invoiceDate)) paramsObj['billingDate'] = invoiceDate;
  if (!isNullOrEmpty(paymentDate)) paramsObj['dueDate'] = paymentDate;

  const queryParams = Object.entries(paramsObj)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  const query = `&${queryParams}`;

  const { data: allInvoicesTableData } = useGetBillingHistoryQuery<any>({
    query,
    pagination: `page=1&limit=10`,
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
    setOrginzationId(values?.ClientOrganization);
    setProductId(values?.productSuite);
    setPlanTypeId(values?.planType);
    setStatus(values?.status);
    setInvoiceDate(values?.InvoiceDate);
    setPaymentDate(values?.PaymentDate);
    setIsOpenFilter(false);
    reset();
  };

  const handleRefresh = async () => {
    setOrginzationId('');
    setProductId('');
    setPlanTypeId('');
    setStatus('');
    setInvoiceDate('');
    setPaymentDate('');
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
