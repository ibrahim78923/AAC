import { useState } from 'react';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  addExpenseColumnsFunction,
  addExpenseDefaultValues,
  addExpenseValidationSchema,
  data,
  expenseActionsDropdownFunction,
} from './Expense.data';

import { useRouter } from 'next/router';
import { usePostExpenseInfoDataMutation } from '@/services/airServices/assets/inventory/single-inventory-details/expense';

export const useExpense = () => {
  const [postExpenseInfoDataTrigger, postExpenseInfoResponse] =
    usePostExpenseInfoDataMutation();

  const router = useRouter();
  const [selectedExpenseList, setSelectedExpenseList] = useState([]);
  const [addExpenseModalTitle, setAddExpenseModalTitle] =
    useState('Add New Expense');

  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] =
    useState<boolean>(false);
  const [isDeleteExpenseModalOpen, setIsDeleteExpenseModalOpen] =
    useState<boolean>(false);

  const addExpenseMethods: any = useForm({
    resolver: yupResolver(addExpenseValidationSchema),
    defaultValues: addExpenseDefaultValues,
  });
  const handleAddExpenseModal = (isOpen?: boolean) => {
    if (isOpen) {
      setAddExpenseModalTitle('Add New Expense');
      return setIsAddExpenseModalOpen(true);
    }
    setIsAddExpenseModalOpen(false);
    addExpenseMethods?.reset();
  };
  const onAddExpenseSubmit = async (data: any) => {
    const queryParams = {
      assetsId: router?.query?.inventoryId,
    };
    const apiDataParameter = {
      body: data,
      queryParams,
    };
    try {
      await postExpenseInfoDataTrigger(apiDataParameter)?.unwrap();
    } catch (error: any) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', { variant: 'error' });
    }
    addExpenseMethods?.reset();
    setIsAddExpenseModalOpen(false);
  };

  const handleActionClick = (ActionType: string) => {
    // open delete modal on selected action type
    if (ActionType === 'delete') {
      return setIsDeleteExpenseModalOpen(true);
    }
    // restriction check for multiple update
    if (selectedExpenseList?.length > 1) {
      enqueueSnackbar(`Can't update multiple records`, {
        variant: 'error',
      });
      return;
    }
    // set selected record values in expense modal
    Object?.entries(selectedExpenseList?.[0])?.map(
      ([key, value]: any) =>
        addExpenseMethods?.setValue(
          key,
          key === 'date'
            ? value
              ? new Date(dayjs(value)?.format('YYYY-MM-DD'))
              : '---'
            : value,
        ),
    );
    setAddExpenseModalTitle('Update Expense');
    setIsAddExpenseModalOpen(true);
  };
  const handleDelete = () => {
    setIsDeleteExpenseModalOpen(false);
    setSelectedExpenseList([]);
    enqueueSnackbar('Record deleted Successfully', {
      variant: 'success',
    });
  };

  const expenseColumns = addExpenseColumnsFunction(
    data,
    selectedExpenseList,
    setSelectedExpenseList,
  );

  // expense action dropdown options
  const dropdownOptions = expenseActionsDropdownFunction(handleActionClick);

  const addExpenseProps = {
    addExpenseModalTitle,
    isAddExpenseModalOpen,
    setIsAddExpenseModalOpen,
    methods: addExpenseMethods,
    onAddExpenseSubmit,
    handleAddExpenseModal,
  };

  const actionProps = {
    deleteExpenseProps: {
      isDeleteExpenseModalOpen,
      setIsDeleteExpenseModalOpen,
      handleDelete,
    },
    updateExpenseProps: {
      isDisabled: selectedExpenseList?.length <= 0,
    },
  };

  return {
    selectedExpenseList,
    setSelectedExpenseList,
    isAddExpenseModalOpen,
    setIsAddExpenseModalOpen,
    isDeleteExpenseModalOpen,
    setIsDeleteExpenseModalOpen,
    addExpenseMethods,
    onAddExpenseSubmit,
    handleAddExpenseModal,
    expenseColumns,
    handleDelete,
    handleActionClick,
    dropdownOptions,
    addExpenseProps,
    actionProps,
    postExpenseInfoResponse,
  };
};
