import { PAGINATION } from '@/config';
import {
  ARRAY_INDEX,
  GENERIC_REPORT_MODULES,
  REPORT_TYPE,
} from '@/constants/strings';
import {
  useAddReportsToDashboardMutation,
  useLazyGetMarketingDashboardDropdownListToAddReportsToDashboardQuery,
  useLazyGetSalesDashboardDropdownListToAddReportsToDashboardQuery,
  useLazyGetServicesDashboardDropdownListToAddReportsToDashboardQuery,
} from '@/services/airOperations/reports';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { ReportsListsComponentPropsI } from '../Reports.interface';

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
  const apiQuerySalesDashboard =
    useLazyGetSalesDashboardDropdownListToAddReportsToDashboardQuery();
  const apiQueryMarketingDashboard =
    useLazyGetMarketingDashboardDropdownListToAddReportsToDashboardQuery();

  const API_QUERY_DASHBOARD = {
    [GENERIC_REPORT_MODULES?.SERVICES]: apiQueryServicesDashboard,
    [GENERIC_REPORT_MODULES?.SALES]: apiQuerySalesDashboard,
    [GENERIC_REPORT_MODULES?.MARKETING]: apiQueryMarketingDashboard,
  };

  return {
    methods,
    handleSubmit,
    submitAddToDashboardForm,
    closeModal,
    API_QUERY_DASHBOARD,
    apiQueryServicesDashboard,
    addReportsToDashboardStatus,
  };
};
