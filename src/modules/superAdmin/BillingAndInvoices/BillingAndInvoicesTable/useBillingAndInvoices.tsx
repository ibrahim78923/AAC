import { useState } from 'react';
import { Columns, validationSchema } from './BillingAndInvoices.data';
import useMenuOptions from './MenuOptions/useMenuOptions';
import { useTheme } from '@mui/material';
import { useGetBilingInvoicesQuery } from '@/services/superAdmin/billing-invoices';
import { isNullOrEmpty } from '@/utils';

import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';

const useBillingAndInvoices = (defaultValues: any) => {
  const [searchByClientName, setSearchByClientName] = useState('');
  const [orginzationId, setOrginzationId] = useState('');
  const [productId, setProductId] = useState('');
  const [PlanTypeId, setPlanTypeId] = useState('');
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

  const paramsObj: any = {};

  if (!isNullOrEmpty(searchByClientName))
    paramsObj['search'] = searchByClientName;
  if (!isNullOrEmpty(productId)) paramsObj['productId'] = productId;
  if (!isNullOrEmpty(PlanTypeId)) paramsObj['planTypeId'] = PlanTypeId;
  if (!isNullOrEmpty(orginzationId))
    paramsObj['organizationId'] = orginzationId;
  const queryParams = Object.entries(paramsObj)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  const query = `&${queryParams}`;

  const { data: assignPlanTableData } = useGetBilingInvoicesQuery<any>({
    query,
    refetchOnMountOrArgChange: true,
    pagination: `page=1&limit=10`,
  });

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),

    defaultValues: defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (values: any) => {
    setOrginzationId(values?.ClientOrganization);
    setProductId(values?.productSuite);
    setPlanTypeId(values?.planType);
    reset();
    setIsOpenFilter(false);
  };

  const handleRefresh = async () => {
    setOrginzationId('');
    setProductId('');
    setPlanTypeId('');
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
  };
};

export default useBillingAndInvoices;
