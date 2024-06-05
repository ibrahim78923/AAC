import { useForm } from 'react-hook-form';
import { filteredEmptyValues } from '@/utils/api';
import {
  restoreReportFilterFormFieldsDynamic,
  restoreReportFiltersDefaultValues,
} from './RestoreReportsFilter.data';

export const useRestoreReportsFilter = (props: any) => {
  const { setIsPortalOpen, reportFilters, setReportFilter } = props;
  const methods: any = useForm({
    defaultValues: restoreReportFiltersDefaultValues?.(reportFilters),
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

  const restoreReportFilterFormFields =
    restoreReportFilterFormFieldsDynamic?.();

  return {
    methods,
    handleSubmit,
    submit,
    resetFilterForm,
    closeFilterForm,
    restoreReportFilterFormFields,
  };
};
