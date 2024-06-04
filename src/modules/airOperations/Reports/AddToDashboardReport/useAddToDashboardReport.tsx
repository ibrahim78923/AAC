import { PAGINATION } from '@/config';
import { useLazyGetAgentDropdownQuery } from '@/services/airServices/tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export const useAddToDashboardReport = (props: any) => {
  const {
    setIsPortalOpen,
    setSelectedReportLists,
    setPage,
    getReportListData,
    setReportFilter,
  } = props;

  const methods = useForm<any>({
    defaultValues: {
      dashboard: [],
    },
    resolver: yupResolver(
      Yup?.object()?.shape({
        dashboard: Yup?.mixed()?.nullable()?.required('Dashboard is Required'),
      }),
    ),
  });

  const { handleSubmit, reset } = methods;
  const submitAddToDashboardForm = async () => {
    try {
      successSnackbar('Ticket assigned Successfully');
      reset();
      await getReportListData?.(PAGINATION?.CURRENT_PAGE, {});
      setReportFilter?.({});
      setPage?.(PAGINATION?.CURRENT_PAGE);
      closeModal?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeModal = () => {
    reset();
    setSelectedReportLists?.([]);
    setIsPortalOpen?.({});
  };

  const apiQueryDashboard = useLazyGetAgentDropdownQuery();

  return {
    methods,
    handleSubmit,
    submitAddToDashboardForm,
    closeModal,
    apiQueryDashboard,
  };
};
