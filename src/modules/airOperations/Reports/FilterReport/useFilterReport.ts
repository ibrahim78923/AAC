import { filteredEmptyValues } from '@/utils/api';
import {
  reportFilterFormFieldsDynamic,
  reportFiltersDefaultValues,
} from './FilterReport.data';
import { FilterReportFormFieldsI } from './FilterReport.interface';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  emptyFilterReportsList,
  setFilterReportsList,
  setIsPortalClose,
} from '@/redux/slices/airOperations/reports/slice';
import { PAGINATION } from '@/config';
import { isoDateString } from '@/lib/date-time';
import { useFormLib } from '@/hooks/useFormLib';

export const useFilterReport = () => {
  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    (state) => state?.operationsReportsLists?.isPortalOpen,
  );

  const filterReportsList = useAppSelector(
    (state) => state?.operationsReportsLists?.filterReportsList,
  );

  const formLibProps = {
    defaultValues: reportFiltersDefaultValues?.(filterReportsList),
  };

  const { handleSubmit, reset, methods } = useFormLib(formLibProps);

  const submit = async (formData: FilterReportFormFieldsI) => {
    const startDate = formData?.createdDate?.startDate
      ? isoDateString(formData?.createdDate?.startDate)
      : undefined;
    const endDate = formData?.createdDate?.endDate
      ? isoDateString(formData?.createdDate?.endDate)
      : undefined;

    const data = {
      ...formData,
      startDate,
      endDate,
    };

    const filterValues = filteredEmptyValues?.(data);
    delete filterValues?.createdDate;

    dispatch(
      setFilterReportsList<any>({
        filterValues: filterValues,
        page: PAGINATION?.CURRENT_PAGE,
      }),
    );
    closeFilterForm?.();
  };

  const resetFilterForm = () => {
    dispatch(emptyFilterReportsList?.());
    closeFilterForm?.();
  };

  const closeFilterForm = () => {
    reset?.();
    dispatch(setIsPortalClose());
  };

  const reportFilterFormFields: ReactHookFormFieldsI[] =
    reportFilterFormFieldsDynamic?.();

  return {
    methods,
    handleSubmit,
    submit,
    resetFilterForm,
    closeFilterForm,
    reportFilterFormFields,
    isPortalOpen,
  };
};
