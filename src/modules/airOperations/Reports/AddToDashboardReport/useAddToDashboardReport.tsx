import { PAGINATION } from '@/config';
import { ARRAY_INDEX, REPORT_TYPE } from '@/constants/strings';
import {
  useAddReportsToDashboardMutation,
  useLazyGetServicesDashboardDropdownListToAddReportsToDashboardQuery,
} from '@/services/airOperations/reports';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { ReportsListsComponentPropsI } from '../Reports.interface';
import { useRouter } from 'next/router';

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

  const methods = useForm<any>({
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

  const submitAddToDashboardForm = async (formData: any) => {
    const apiDataParameter = {
      queryParams: {
        id: selectedReportLists?.[ARRAY_INDEX?.ZERO]?._id,
      },
      body: {
        linkDashboard: {
          action: REPORT_TYPE?.ADD_TO_EXISTING,
          existingDashboards: formData?.dashboard?.map(
            (dashboard: any) => dashboard?._id,
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
