import { useForm } from 'react-hook-form';
import { filteredEmptyValues } from '@/utils/api';
import {
  reportFilterFormFieldsDynamic,
  reportFiltersDefaultValues,
} from './FilterReport.data';
import { useLazyGetReportsOwnersDropdownListForReportsQuery } from '@/services/airOperations/reports';
import useAuth from '@/hooks/useAuth';

export const useFilterReport = (props: any) => {
  const { setIsPortalOpen, reportFilters, setReportFilter } = props;
  const auth = useAuth();

  const { _id: productId } = auth?.product;

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
    setIsPortalOpen?.({});
  };

  const reportOwnerApiQuery =
    useLazyGetReportsOwnersDropdownListForReportsQuery?.();

  const reportFilterFormFields = reportFilterFormFieldsDynamic?.(
    reportOwnerApiQuery,
    productId,
  );

  return {
    methods,
    handleSubmit,
    submit,
    resetFilterForm,
    closeFilterForm,
    reportFilterFormFields,
  };
};
