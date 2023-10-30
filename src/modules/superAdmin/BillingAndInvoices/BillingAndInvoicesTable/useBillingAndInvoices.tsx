import { useState } from 'react';
import { columns } from './BillingAndInvoices.data';
import useMenuOptions from './MenuOptions/useMenuOptions';
import { useTheme } from '@mui/material';
import { useGetBilingInvoicesQuery } from '@/services/superAdmin/billing-invoices';
import { isNullOrEmpty } from '@/utils';

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

  const paramsObj: any = {};
  // const paramsObj: ParamsObject = {}
  if (!isNullOrEmpty(searchByClientName))
    paramsObj['search'] = searchByClientName;
  const queryParams = Object.entries(paramsObj)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  const query = `&${queryParams}`;
  const [isGetRowValues, setIsGetRowValues] = useState('');

  const { data: assignPlanTableData } = useGetBilingInvoicesQuery<any>({
    query,
    refetchOnMountOrArgChange: true,
    pagination: `page=1&limit=10`,
  });

  const getRowValues = columns(
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
  };
};

export default useBillingAndInvoices;
