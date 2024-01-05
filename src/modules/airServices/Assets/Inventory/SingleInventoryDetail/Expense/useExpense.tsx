import { useEffect, useState } from 'react';
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
  useDeleteInventoryExpenseMutation,
  useGetInventoryExpenseQuery,
  usePatchInventoryExpenseMutation,
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
  const EXPENSE_DELETE = 'delete';
  const UPDATE_EXPENSE = 'Add New Expense';
  const searchParams = useSearchParams();
  const assetId = searchParams.get('inventoryId');
  const { data, isLoading, isSuccess, isFetching } =
    useGetInventoryExpenseQuery(params);
  const expenseData = data?.data?.expenses;
  const metaData = data?.data?.meta;

  const addExpenseMethods: any = useForm({
    resolver: yupResolver(addExpenseValidationSchema),
    defaultValues: addExpenseDefaultValues(selectedExpenseList),
  });
  const { reset } = addExpenseMethods;
  useEffect(() => {
    reset(addExpenseDefaultValues(selectedExpenseList));
  }, [selectedExpenseList, reset]);

  const expenseId = selectedExpenseList.map((expense: any) => expense?._id);
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
  const [patchExpenseTrigger] = usePatchInventoryExpenseMutation();
  const isLoadingExpense = postExpenseProgress?.isLoading;
  const onAddExpenseSubmit = async (data: any) => {
    if (addExpenseModalTitle === UPDATE_EXPENSE) {
      try {
        const formData = {
          ...data,
          assetId: assetId,
        };
        const res: any = await postExpenseTrigger(formData);
        enqueueSnackbar(res?.data?.message && 'Expense added successfully!', {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        });
        reset();
        setIsAddExpenseModalOpen(false);
      } catch (err: any) {
        enqueueSnackbar(err?.data?.message ?? 'Something went wrong!', {
          variant: NOTISTACK_VARIANTS?.ERROR,
        });
      }
    } else {
      try {
        const formData = {
          id: expenseId,
          assetId: assetId,
        };
        const res: any = await patchExpenseTrigger(formData);
        enqueueSnackbar(res?.data?.message && 'Expense update successfully!', {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        });
        reset();
        setIsAddExpenseModalOpen(false);
        setSelectedExpenseList([]);
      } catch (err: any) {
        enqueueSnackbar(err?.data?.message ?? 'Something went wrong!', {
          variant: NOTISTACK_VARIANTS?.ERROR,
        });
      }
    }
  };

  const handleActionClick = (ActionType: string) => {
    if (ActionType === EXPENSE_DELETE) {
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
  const [deleteExpense] = useDeleteInventoryExpenseMutation();
  const handleDelete = async () => {
    try {
      const res: any = await deleteExpense({ ids: expenseId });
      enqueueSnackbar(res?.data?.message && 'Record deleted Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setIsDeleteExpenseModalOpen(false);
      setSelectedExpenseList([]);
    } catch (err: any) {
      enqueueSnackbar(err?.data?.message ?? 'Something went wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
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
