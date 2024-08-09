import { useForm } from 'react-hook-form';
import { filteredEmptyValues, makeDateTime } from '@/utils/api';
import {
  reportFilterFormFieldsDynamic,
  reportFiltersDefaultValues,
} from './FilterReport.data';
import { useLazyGetReportsOwnersDropdownListForReportsQuery } from '@/services/airOperations/reports';
import useAuth from '@/hooks/useAuth';
import { ReportsListsComponentPropsI } from '../Reports.interface';

export const useFilterReport = (props: ReportsListsComponentPropsI) => {
  const { setIsPortalOpen, reportFilters, setReportFilter } = props;
  const auth: any = useAuth();

  const { _id: productId } = auth?.product;

  const methods: any = useForm({
    defaultValues: reportFiltersDefaultValues?.(reportFilters),
  });

  const { handleSubmit, reset } = methods;

  const submit = async (formData: any) => {
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
