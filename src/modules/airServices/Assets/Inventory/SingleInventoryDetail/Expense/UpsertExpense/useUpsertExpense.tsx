import { useFormLib } from '@/hooks/useFormLib';
import {
  upsertExpenseFormDefaultValuesDynamic,
  upsertExpenseFormValidationSchema,
} from './UpsertExpense.data';
import { isoDateString } from '@/lib/date-time';
import {
  usePatchAirServicesAssetsInventoryExpenseMutation,
  usePostAirServicesAssetsInventoryExpenseMutation,
} from '@/services/airServices/assets/inventory/single-inventory-details/expense';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useRouter } from 'next/router';
import { EXPENSE_PORTAL_ACTIONS } from '../Expense.data';
import { ARRAY_INDEX } from '@/constants/strings';

export const useUpsertExpense = (props: any) => {
  const {
    setIsPortalOpen,
    selectedExpenseList,
    setSelectedExpenseList,
    isPortalOpen,
  } = props;

  const router = useRouter();

  const assetId = router?.query?.inventoryId;

  const editData =
    isPortalOpen?.action === EXPENSE_PORTAL_ACTIONS?.EDIT_EXPENSE
      ? selectedExpenseList?.[ARRAY_INDEX?.ZERO]
      : {};

  const formLibProps = {
    validationSchema: upsertExpenseFormValidationSchema,
    defaultValues: upsertExpenseFormDefaultValuesDynamic(editData),
  };

  const { handleSubmit, reset, methods, setValue } = useFormLib(formLibProps);

  const [postExpenseTrigger, postExpenseStatus] =
    usePostAirServicesAssetsInventoryExpenseMutation();

  const [patchExpenseTrigger, patchExpenseStatus] =
    usePatchAirServicesAssetsInventoryExpenseMutation();

  const closeModal = () => {
    reset();
    setIsPortalOpen?.({});
    setSelectedExpenseList?.([]);
  };

  const upsertExpenseSubmit = async (data: any) => {
    const formData = {
      ...data,
      date: isoDateString(data?.date),
      assetId: assetId,
    };

    if (isPortalOpen?.action === EXPENSE_PORTAL_ACTIONS?.EDIT_EXPENSE) {
      await updateExpenseSubmit(formData);
      return;
    }
    try {
      await postExpenseTrigger(formData)?.unwrap();
      successSnackbar('Expense added successfully');
      closeModal();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const updateExpenseSubmit = async (formData: any) => {
    const data = {
      cost: formData?.cost,
      type: formData?.type,
      date: isoDateString(formData?.date),
      id: editData?._id,
      assetId: assetId,
    };
    try {
      await patchExpenseTrigger(data)?.unwrap();
      successSnackbar('Expense update successfully');
      closeModal();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const apiCallInProgress =
    postExpenseStatus?.isLoading || patchExpenseStatus?.isLoading;

  return {
    handleSubmit,
    reset,
    methods,
    setValue,
    apiCallInProgress,
    upsertExpenseSubmit,
    closeModal,
  };
};
