import { PAGINATION } from '@/config';
import { ARRAY_INDEX, SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { useAddOperationsReportsToMultipleDashboardMutation } from '@/services/airOperations/reports';
import { useRouter } from 'next/router';
import { AddToDashboardFormFieldsI } from './AddToDashboard.interface';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useGetReportLists } from '../ReportHooks/useGetReportLists';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  emptySelectedReportsList,
  setIsPortalClose,
  setPage,
} from '@/redux/slices/airOperations/reports/slice';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { BACKEND_REPORT_ACCESS } from '@/constants/api';
import { useFormLib } from '@/hooks/useFormLib';
import {
  addToDashboardReportFormDefaultValuesDynamic,
  addToDashboardReportFormValidationSchemaDynamic,
} from './AddToDashboard.data';

export const useAddToDashboardReport = () => {
  const router = useRouter();
  const id = router?.query?.id;

  const [addReportsToDashboardTrigger, addReportsToDashboardStatus] =
    useAddOperationsReportsToMultipleDashboardMutation();

  const { getReportsList, page } = useGetReportLists();
  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    (state) => state?.operationsReportsLists?.isPortalOpen,
  );

  const selectedReportsList: any = useAppSelector(
    (state) => state?.operationsReportsLists?.selectedReportsList,
  );

  const totalRecords = useAppSelector(
    (state) => state?.operationsReportsLists?.totalRecords,
  );

  const refetchApi = async () => {
    const newPage =
      selectedReportsList?.length === totalRecords
        ? PAGINATION?.CURRENT_PAGE
        : page;
    dispatch(setPage<any>(newPage));
    await getReportsList?.(newPage);
  };

  const singleSelectedDashboards =
    selectedReportsList?.length === SELECTED_ARRAY_LENGTH?.ONE
      ? selectedReportsList?.[ARRAY_INDEX?.ZERO]?.dashboardDetails
      : undefined;

  const formLibProps = {
    validationSchema: addToDashboardReportFormValidationSchemaDynamic,
    defaultValues: addToDashboardReportFormDefaultValuesDynamic?.(
      singleSelectedDashboards,
    ),
  };

  const { handleSubmit, reset, methods } = useFormLib(formLibProps);

  const submitAddToDashboardForm = async (
    formData: AddToDashboardFormFieldsI,
  ) => {
    const apiDataParameter = {
      queryParams: {
        id: selectedReportsList?.[ARRAY_INDEX?.ZERO]?._id,
      },
      body: {
        linkDashboard: {
          action: BACKEND_REPORT_ACCESS?.ADD_TO_EXISTING,
          existingDashboards: formData?.dashboard
            ?.filter((dashboard: any) => !!dashboard?._id)
            ?.map((dashboard: AutocompleteAsyncOptionsI) => dashboard?._id),
          productId: id,
        },
      },
    };

    try {
      await addReportsToDashboardTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Report added to dashboard successfully');
      closeModal?.();
      await refetchApi?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeModal = () => {
    reset();
    dispatch(emptySelectedReportsList());
    dispatch(setIsPortalClose());
  };

  return {
    methods,
    handleSubmit,
    submitAddToDashboardForm,
    closeModal,
    addReportsToDashboardStatus,
    isPortalOpen,
  };
};
