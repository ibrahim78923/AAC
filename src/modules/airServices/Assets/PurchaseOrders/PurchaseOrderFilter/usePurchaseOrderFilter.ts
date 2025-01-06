import { purchaseOrderFilterFormDefaultValues } from './PurchaseOrderFilter.data';
import { PAGINATION } from '@/config';
import { useFormLib } from '@/hooks/useFormLib';

export const usePurchaseOrderFilter = (props: any) => {
  const {
    setPage,
    purchaseOrderFilter,
    setPurchaseOrderFilter,
    setIsDrawerOpen,
  } = props;

  const useFormValues = {
    defaultValues: purchaseOrderFilterFormDefaultValues(purchaseOrderFilter),
  };

  const { handleSubmit, reset, methods } = useFormLib(useFormValues);

  const submitPurchaseOrderFilterForm = async (data: any) => {
    const purchaseOrderFilteredFields: any = Object?.entries(data || {})
      ?.filter(
        ([, value]: any) => value !== undefined && value != '' && value != null,
      )
      ?.reduce((acc: any, [key, value]: any) => ({ ...acc, [key]: value }), {});

    if (!Object?.keys(purchaseOrderFilteredFields ?? {})?.length) {
      closePurchaseOrderFilterForm();
      setPurchaseOrderFilter?.(purchaseOrderFilteredFields);
      return;
    }
    setPage?.(PAGINATION?.CURRENT_PAGE);
    setPurchaseOrderFilter?.(purchaseOrderFilteredFields);
    closePurchaseOrderFilterForm();
  };

  const closePurchaseOrderFilterForm = () => {
    reset();
    setIsDrawerOpen?.(false);
  };

  const resetPurchaseOrderFilterForm = async () => {
    if (!!Object?.keys(purchaseOrderFilter)?.length) {
      setPurchaseOrderFilter({});
    }
    reset();
    setIsDrawerOpen?.(false);
  };

  return {
    methods,
    submitPurchaseOrderFilterForm,
    handleSubmit,
    closePurchaseOrderFilterForm,
    resetPurchaseOrderFilterForm,
  };
};
