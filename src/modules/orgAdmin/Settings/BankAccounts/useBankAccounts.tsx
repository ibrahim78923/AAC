import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  addAccountsFormDefaultValues,
  addAccountsFormValidationSchema,
} from './AddBankAccounts/AddBankAccounts.data';
import { receiversBankAccountsAPI } from '@/services/orgAdmin/settings/receivers-bank-acconts';

const useBankAccounts = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [isOpenAddAccountDrawer, setIsOpenAddAccountDrawer] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [searchBy, setSearchBy] = useState();
  const [checkedRows, setCheckedRows] = useState();

  const { useGetReceiverBankAccountsQuery } = receiversBankAccountsAPI;
  const receiversParams = {
    page: '',
    limit: '',
    search: '',
  };
  const { data: receiversData } =
    useGetReceiverBankAccountsQuery(receiversParams);
  // console.log(receiversData?.data?.receiverbankaccounts);

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
  };
};

export default useBankAccounts;
