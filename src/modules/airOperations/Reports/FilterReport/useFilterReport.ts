import { useForm, UseFormReturn } from 'react-hook-form';
import { filteredEmptyValues, makeDateTime } from '@/utils/api';
import {
  reportFilterFormFieldsDynamic,
  reportFiltersDefaultValues,
} from './FilterReport.data';
import { useLazyGetReportsOwnersDropdownListForReportsQuery } from '@/services/airOperations/reports';
import { FilterReportFormFieldsI } from './FilterReport.interface';
import { ReportsListsComponentPropsI } from '../ReportLists/ReportLists.interface';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';

export const useFilterReport = (props: ReportsListsComponentPropsI) => {
  const { setIsPortalOpen, reportFilters, setReportFilter } = props;

  const methods: UseFormReturn<FilterReportFormFieldsI> = useForm({
    defaultValues: reportFiltersDefaultValues?.(reportFilters),
  });

  const { handleSubmit, reset } = methods;

  const submit = async (formData: FilterReportFormFieldsI) => {
    const startDate = formData?.createdDate?.startDate
      ? makeDateTime(formData?.createdDate?.startDate, new Date())
      : undefined;
    const endDate = formData?.createdDate?.endDate
      ? makeDateTime(formData?.createdDate?.endDate, new Date())
      : undefined;

    const data = {
      ...formData,
      startDate,
      endDate,
    };

    const filterValues = filteredEmptyValues?.(data);
    delete filterValues?.createdDate;

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

  const reportFilterFormFields: ReactHookFormFieldsI[] =
    reportFilterFormFieldsDynamic?.(reportOwnerApiQuery);

  return {
    methods,
    handleSubmit,
    submit,
    resetFilterForm,
    closeFilterForm,
    reportFilterFormFields,
  };
};
