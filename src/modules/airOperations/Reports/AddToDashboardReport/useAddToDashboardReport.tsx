import { PAGINATION } from '@/config';
import { ARRAY_INDEX, REPORT_TYPE } from '@/constants/strings';
import { useAddOperationsReportsToMultipleDashboardMutation } from '@/services/airOperations/reports';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { UseFormReturn, useForm } from 'react-hook-form';
import * as Yup from 'yup';
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

  const selectedReportsList = useAppSelector(
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

  const methods: UseFormReturn<AddToDashboardFormFieldsI> = useForm({
    defaultValues: {
      dashboard: [],
    },
    resolver: yupResolver(
      Yup?.object()?.shape({
        dashboard: Yup?.array()?.min(1, 'Dashboard is Required'),
      }),
    ),
  });

  const { handleSubmit, reset } = methods;

  const submitAddToDashboardForm = async (
    formData: AddToDashboardFormFieldsI,
  ) => {
    const apiDataParameter = {
      queryParams: {
        id: selectedReportsList?.[ARRAY_INDEX?.ZERO]?._id,
      },
      body: {
        linkDashboard: {
          action: REPORT_TYPE?.ADD_TO_EXISTING,
          existingDashboards: formData?.dashboard?.map(
            (dashboard: AutocompleteAsyncOptionsI) => dashboard?._id,
          ),
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
