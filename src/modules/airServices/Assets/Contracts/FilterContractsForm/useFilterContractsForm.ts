import { useForm } from 'react-hook-form';
import {
  contractsFilterFormDefaultValues,
  contractsFilterFormFieldsDynamic,
} from './FilterContractsForm.data';
import {
  useLazyGetContractTypeDropdownQuery,
  useLazyGetVendorDropdownQuery,
} from '@/services/airServices/assets/contracts';

export const useFilterContractsForm = (props: any) => {
  const { setIsDrawerOpen, setContractFilterLists, contractFilterLists } =
    props;

  const methods = useForm({
    defaultValues: contractsFilterFormDefaultValues(contractFilterLists),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: any) => {
    const contractFilteredFields: any = Object?.entries(data || {})
      ?.filter(
        ([, value]: any) => value !== undefined && value != '' && value != null,
      )
      ?.reduce((acc: any, [key, value]: any) => ({ ...acc, [key]: value }), {});
    if (!Object?.keys(contractFilteredFields || {})?.length) {
      closeInventoryFilterForm();
      return;
    }
    setContractFilterLists(contractFilteredFields);
    closeInventoryFilterForm();
    setIsDrawerOpen(false);
  };
  const closeInventoryFilterForm = () => {
    // reset();
    setIsDrawerOpen?.(false);
  };

  const resetContractFilterForm = async () => {
    if (!!Object?.keys(contractFilterLists)?.length) {
      setContractFilterLists({});
    }
    reset();
    setIsDrawerOpen?.(false);
  };
  const apiQueryContractType = useLazyGetContractTypeDropdownQuery();
  const apiQueryVendor = useLazyGetVendorDropdownQuery();
  const contractsFilterFormFields = contractsFilterFormFieldsDynamic(
    apiQueryContractType,
    apiQueryVendor,
  );
  return {
    methods,
    handleSubmit,
    onSubmit,
    resetContractFilterForm,
    contractsFilterFormFields,
  };
};
