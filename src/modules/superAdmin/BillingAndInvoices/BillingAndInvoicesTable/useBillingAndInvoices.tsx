import { useState } from 'react';
import { Columns, validationSchema } from './BillingAndInvoices.data';
import useMenuOptions from './MenuOptions/useMenuOptions';
import { useTheme } from '@mui/material';
import { useGetBilingInvoicesQuery } from '@/services/superAdmin/billing-invoices';

import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import { PAGINATION } from '@/config';

const useBillingAndInvoices = () => {
  const [searchByClientName, setSearchByClientName] = useState('');
  const [isViewDetailOpen, setIsViewDeailOpen] = useState<boolean>(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isShowGenerateInvoice, setisShowGenerateInvoice] = useState(false);
  const theme = useTheme();
  const { isShowViewBillingDetails, setIsShowViewBillingDetails } =
    useMenuOptions();
  const [isChecked, setIsChecked] = useState(false);
  const [isGetRowValues, setIsGetRowValues] = useState('');
  const [filterValues, setFilterValues] = useState({});
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const searchObject = { search: searchByClientName };

  const { data: assignPlanTableData } = useGetBilingInvoicesQuery<any>({
    params: { ...filterValues, ...searchObject, page: page, limit: pageLimit },
  });

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {},
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (values: any) => {
    setFilterValues(values);
    reset();
    setIsOpenFilter(false);
  };

  const handleRefresh = async () => {
    setFilterValues('');
  };

  const getRowValues = Columns(
    setIsGetRowValues,
    setIsChecked,
    isChecked,
    isGetRowValues,
  );

  return {
    getRowValues,
    setIsGetRowValues,
    isGetRowValues,
    setIsChecked,
    isChecked,
    searchByClientName,
    setSearchByClientName,
    isViewDetailOpen,
    setIsViewDeailOpen,
    isOpenDrawer,
    setIsOpenDrawer,
    isOpenFilter,
    setIsOpenFilter,
    isShowGenerateInvoice,
    setisShowGenerateInvoice,
    theme,
    isShowViewBillingDetails,
    setIsShowViewBillingDetails,
    setIsEditModal,
    isEditModal,
    assignPlanTableData,
    handleSubmit,
    onSubmit,
    methods,
    handleRefresh,
    setPage,
    setPageLimit,
  };
};

export default useBillingAndInvoices;
