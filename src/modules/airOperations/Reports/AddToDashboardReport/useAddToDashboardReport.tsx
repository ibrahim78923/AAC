import { PAGINATION } from '@/config';
import { ARRAY_INDEX, REPORT_TYPE } from '@/constants/strings';
import {
  useAddReportsToDashboardMutation,
  useLazyGetServicesDashboardDropdownListToAddReportsToDashboardQuery,
} from '@/services/airOperations/reports';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { UseFormReturn, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { ReportsListsComponentPropsI } from '../ReportLists/ReportLists.interface';
import { AddToDashboardFormFieldsI } from './AddToDashboard.interface';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';

export const useAddToDashboardReport = (props: ReportsListsComponentPropsI) => {
  const {
    setIsPortalOpen,
    selectedReportLists,
    setSelectedReportLists,
    setPage,
    totalRecords,
    page,
    getReportListData,
  } = props;

  const router = useRouter();

  const { id } = router?.query;

  const [addReportsToDashboardTrigger, addReportsToDashboardStatus] =
    useAddReportsToDashboardMutation();

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
        id: selectedReportLists?.[ARRAY_INDEX?.ZERO]?._id,
      },
      body: {
        linkDashboard: {
          action: REPORT_TYPE?.ADD_TO_EXISTING,
          existingDashboards: formData?.dashboard?.map(
            (dashboard: AutocompleteAsyncOptionsI) => dashboard?._id,
          ),
        },
      },
    };

    try {
      await addReportsToDashboardTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Report added to dashboard successfully');
      closeModal?.();
      const newPage =
        selectedReportLists?.length === totalRecords
          ? PAGINATION?.CURRENT_PAGE
          : page;
      setPage?.(newPage);
      await getReportListData?.(newPage);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeModal = () => {
    reset();
    setSelectedReportLists?.([]);
    setIsPortalOpen?.({});
  };

  const apiQueryServicesDashboard =
    useLazyGetServicesDashboardDropdownListToAddReportsToDashboardQuery();

  return {
    methods,
    handleSubmit,
    submitAddToDashboardForm,
    closeModal,
    apiQueryServicesDashboard,
    addReportsToDashboardStatus,
    id,
  };
};
