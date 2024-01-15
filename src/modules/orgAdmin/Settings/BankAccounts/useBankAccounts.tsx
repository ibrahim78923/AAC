import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  addAccountsFormDefaultValues,
  addAccountsFormValidationSchema,
} from './AddBankAccounts/AddBankAccounts.data';

const useBankAccounts = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [isOpenAddAccountDrawer, setIsOpenAddAccountDrawer] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [searchBy, setSearchBy] = useState();

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
  };
};

export default useBankAccounts;
