import { filteredEmptyValues } from '@/utils/api';
import {
  DATE_DIFFERENCE,
  restoreReportFilterFormFieldsDynamic,
  restoreReportFiltersDefaultValues,
} from './RestoreReportsFilter.data';
import { RestoreReportsFilterFormFieldsI } from './RestoreReportsFilter.interface';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  emptyFilterRestoreReportsList,
  setFilterRestoreReportsList,
  setIsPortalClose,
} from '@/redux/slices/airOperations/restore-reports/slice';
import { PAGINATION } from '@/config';
import { errorSnackbar } from '@/lib/snackbar';
import { useFormLib } from '@/hooks/useFormLib';

export const useRestoreReportsFilter = () => {
  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    (state) => state?.operationsRestoreReportsLists?.isPortalOpen,
  );

  const filterRestoreReportsList = useAppSelector(
    (state) => state?.operationsRestoreReportsLists?.filterRestoreReportsList,
  );

  const formLibProps = {
    defaultValues: restoreReportFiltersDefaultValues?.(
      filterRestoreReportsList,
    ),
  };

  const { handleSubmit, reset, methods, control } = useFormLib(formLibProps);

  const submit = async (formData: RestoreReportsFilterFormFieldsI) => {
    if (!!formData?.endDate) {
      const dateDifference = formData?.endDate - formData?.startDate;
      if (dateDifference < DATE_DIFFERENCE?.ZERO)
        return errorSnackbar('End Date should be greater than Start Date');
    }
    const filterValues = filteredEmptyValues?.(formData);
    dispatch(
      setFilterRestoreReportsList<any>({
        filterValues: filterValues,
        page: PAGINATION?.CURRENT_PAGE,
      }),
    );
    closeFilterForm?.();
  };

  const resetFilterForm = () => {
    dispatch(emptyFilterRestoreReportsList?.());
    closeFilterForm?.();
  };

  const closeFilterForm = () => {
    reset?.();
    dispatch(setIsPortalClose());
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
    isPortalOpen,
  };
};
