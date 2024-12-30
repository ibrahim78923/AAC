import {
  contractsFilterFormDefaultValues,
  contractsFilterFormFieldsDynamic,
} from './FilterContractsForm.data';
import { PAGINATION } from '@/config';
import { useFormLib } from '@/hooks/useFormLib';

export const useFilterContractsForm = (props: any) => {
  const {
    setIsDrawerOpen,
    setContractFilterLists,
    contractFilterLists,
    setPage,
  } = props;

  const useFormValues = {
    defaultValues: contractsFilterFormDefaultValues(contractFilterLists),
  };

  const { handleSubmit, reset, methods } = useFormLib(useFormValues);

  const onSubmit = async (data: any) => {
    const contractFilteredFields: any = Object?.entries(data || {})
      ?.filter(
        ([, value]: any) =>
          value !== undefined &&
          value != '' &&
          value != null &&
          value?._id !== 'All',
      )
      ?.reduce((acc: any, [key, value]: any) => ({ ...acc, [key]: value }), {});
    if (!Object?.keys(contractFilteredFields || {})?.length) {
      setContractFilterLists(contractFilteredFields);
      closeInventoryFilterForm();
      return;
    }
    setPage?.(PAGINATION?.CURRENT_PAGE);
    setContractFilterLists?.(contractFilteredFields);
    closeInventoryFilterForm();
    setIsDrawerOpen?.(false);
  };
  const closeInventoryFilterForm = () => {
    reset();
    setIsDrawerOpen?.(false);
  };

  const resetContractFilterForm = async () => {
    if (!!Object?.keys(contractFilterLists)?.length) {
      setContractFilterLists?.({});
    }
    reset();
    setIsDrawerOpen?.(false);
  };
  const contractsFilterFormFields = contractsFilterFormFieldsDynamic();
  return {
    methods,
    handleSubmit,
    onSubmit,
    resetContractFilterForm,
    contractsFilterFormFields,
  };
};
