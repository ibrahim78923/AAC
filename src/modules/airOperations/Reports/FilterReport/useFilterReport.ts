import { useForm } from 'react-hook-form';
import { filteredEmptyValues } from '@/utils/api';
import { useLazyGetShopDropdownForLoyaltyTransactionQuery } from '@/services/airLoyaltyProgram/loyalty/transactions';
import {
  reportFilterFormFieldsDynamic,
  reportFiltersDefaultValues,
} from './FilterReport.data';

export const useFilterReport = (props: any) => {
  const { setIsDrawerOpen, reportFilters, setReportFilter } = props;
  const methods: any = useForm({
    defaultValues: reportFiltersDefaultValues?.(reportFilters),
  });
  const { handleSubmit, reset } = methods;

  const submit = async (data: any) => {
    const filterValues = filteredEmptyValues?.(data);
    setReportFilter?.(filterValues);
    closeFilterForm?.();
  };

  const resetFilterForm = () => {
    setReportFilter?.({});
    closeFilterForm?.();
  };

  const closeFilterForm = () => {
    reset?.();
    setIsDrawerOpen?.({});
  };
  const shopApiQuery = useLazyGetShopDropdownForLoyaltyTransactionQuery?.();
  const reportFilterFormFields = reportFilterFormFieldsDynamic?.(shopApiQuery);

  return {
    methods,
    handleSubmit,
    submit,
    resetFilterForm,
    closeFilterForm,
    reportFilterFormFields,
  };
};
