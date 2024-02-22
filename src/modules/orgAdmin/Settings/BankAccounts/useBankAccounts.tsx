import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  addAccountsFormDefaultValues,
  addAccountsFormValidationSchema,
} from './AddBankAccounts/AddBankAccounts.data';
import { receiversBankAccountsAPI } from '@/services/orgAdmin/settings/receivers-bank-acconts';
import { PAGINATION } from '@/config';

const useBankAccounts = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [isOpenAddAccountDrawer, setIsOpenAddAccountDrawer] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [searchBy, setSearchBy] = useState();
  const [checkedRows, setCheckedRows] = useState();
  const [filterValues, setFilterValues] = useState({
    search: '',
  });
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);

  const {
    useGetReceiverBankAccountsQuery,
    // useDeleteReceiverBankAccountMutation,
  } = receiversBankAccountsAPI;

  const receiversParams = {
    page: page,
    limit: pageLimit,
    search: filterValues?.search ?? undefined,
  };

  const {
    data: receiversData,
    isLoading,
    isSuccess,
  } = useGetReceiverBankAccountsQuery(receiversParams);
  // console.log(receiversData?.data?.receiverbankaccounts);

  // const [deleteReceiverBankAccount] = useDeleteReceiverBankAccountMutation();

  const handleClick = (event: any) => {
    setSelectedValue(event?.currentTarget);
  };

  const handleClose = () => {
    setSelectedValue(null);
  };

  const methods: any = useForm({
    resolver: yupResolver(addAccountsFormValidationSchema),
    defaultValues: addAccountsFormDefaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = () => {};

  return {
    selectedValue,
    setSelectedValue,
    handleClick,
    handleClose,
    isOpenAddAccountDrawer,
    setIsOpenAddAccountDrawer,
    methods,
    handleSubmit,
    onSubmit,
    isDeleteModal,
    setIsDeleteModal,
    searchBy,
    setSearchBy,
    receiversData,
    checkedRows,
    setCheckedRows,
    filterValues,
    setFilterValues,
    isLoading,
    isSuccess,
    setPageLimit,
    setPage,
  };
};

export default useBankAccounts;
