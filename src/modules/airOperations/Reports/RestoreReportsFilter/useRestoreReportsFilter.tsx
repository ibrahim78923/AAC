import { useForm, UseFormReturn, useWatch } from 'react-hook-form';
import { errorSnackbar, filteredEmptyValues } from '@/utils/api';
import {
  DATE_DIFFERENCE,
  restoreReportFilterFormFieldsDynamic,
  restoreReportFiltersDefaultValues,
} from './RestoreReportsFilter.data';
import { RestoreReportsListsComponentPropsI } from '../RestoreReportsLists/RestoreReportsLists.interface';
import { RestoreReportsFilterFormFieldsI } from './RestoreReportsFilter.interface';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';

export const useRestoreReportsFilter = (
  props: RestoreReportsListsComponentPropsI,
) => {
  const { setIsPortalOpen, reportFilters, setReportFilter } = props;

  const methods: UseFormReturn<RestoreReportsFilterFormFieldsI> = useForm({
    defaultValues: restoreReportFiltersDefaultValues?.(reportFilters),
  });

  const { handleSubmit, reset, control } = methods;

  const submit = async (formData: RestoreReportsFilterFormFieldsI) => {
    if (!!formData?.endDate) {
      const dateDifference = formData?.endDate - formData?.startDate;
      if (dateDifference < DATE_DIFFERENCE?.ZERO)
        return errorSnackbar('End Date should be greater than Start Date');
    }
    const filterValues = filteredEmptyValues?.(formData);
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

  const startDateWatch = useWatch({
    control,
    name: 'startDate',
    defaultValue: null,
  });

  const restoreReportFilterFormFields: ReactHookFormFieldsI[] =
    restoreReportFilterFormFieldsDynamic?.(startDateWatch);

  return {
    methods,
    handleSubmit,
    submit,
    resetFilterForm,
    closeFilterForm,
    restoreReportFilterFormFields,
  };
};
