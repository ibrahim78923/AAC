import { useState } from 'react';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  addExpenseColumnsFunction,
  addExpenseDefaultValues,
  addExpenseValidationSchema,
  expenseActionsDropdownFunction,
} from './Expense.data';
import { useSearchParams } from 'next/navigation';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { PAGINATION } from '@/config';
import {
  useGetInventoryExpenseQuery,
  usePostInventoryExpenseMutation,
} from '@/services/airServices/assets/inventory/single-inventory-details/expense';

export const useExpense = () => {
  const [selectedExpenseList, setSelectedExpenseList] = useState([]);
  const [addExpenseModalTitle, setAddExpenseModalTitle] =
    useState('Add New Expense');

  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] =
    useState<boolean>(false);
  const [isDeleteExpenseModalOpen, setIsDeleteExpenseModalOpen] =
    useState<boolean>(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const params = {
    page: page,
    limit: pageLimit,
  };

  const searchParams = useSearchParams();
  const assetId = searchParams.get('inventoryId');
  const { data, isLoading, isSuccess, isFetching } =
    useGetInventoryExpenseQuery(params);
  const expenseData = data?.data?.expenses;
  const metaData = data?.data?.meta;

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
  const [postExpenseTrigger, postExpenseProgress] =
    usePostInventoryExpenseMutation();
  const isLoadingExpense = postExpenseProgress?.isLoading;
  const onAddExpenseSubmit = async (data: any) => {
    try {
      const formData = {
        ...data,
        assetId: assetId,
      };
      const res: any = await postExpenseTrigger(formData);
      enqueueSnackbar(res?.data?.message && 'Expense added successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      addExpenseMethods?.reset();
      setIsAddExpenseModalOpen(false);
    } catch (err: any) {
      enqueueSnackbar(err?.data?.message ?? 'Something went wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const handleActionClick = (ActionType: string) => {
    if (ActionType === 'delete') {
      return setIsDeleteExpenseModalOpen(true);
    }
    if (selectedExpenseList?.length > 1) {
      enqueueSnackbar(`Can't update multiple records`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
      return;
    }
    Object?.entries(selectedExpenseList?.[0])?.map(
      ([key, value]: any) =>
        addExpenseMethods?.setValue(
          key,
          key === 'date'
            ? value
              ? new Date(dayjs(value).format('YYYY-MM-DD'))
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
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };

  const expenseColumns = addExpenseColumnsFunction(
    expenseData,
    selectedExpenseList,
    setSelectedExpenseList,
  );

  const dropdownOptions = expenseActionsDropdownFunction(handleActionClick);

  const addExpenseProps = {
    addExpenseModalTitle,
    isAddExpenseModalOpen,
    setIsAddExpenseModalOpen,
    methods: addExpenseMethods,
    onAddExpenseSubmit,
    handleAddExpenseModal,
    isLoadingExpense,
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
    expenseData,
    isFetching,
    isSuccess,
    isLoading,
    setPageLimit,
    setPage,
    pageLimit,
    metaData,
  };
};
