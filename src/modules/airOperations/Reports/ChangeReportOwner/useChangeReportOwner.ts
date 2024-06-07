import { PAGINATION } from '@/config';
import { useChangeReportOwnerMutation } from '@/services/airOperations/reports';
import { useLazyGetAgentDropdownQuery } from '@/services/airServices/tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export const useChangeReportOwner = (props: any) => {
  const {
    setIsPortalOpen,
    setSelectedReportLists,
    setPage,
    getReportListData,
    setReportFilter,
    selectedReportLists,
  } = props;

  const [changeReportOwnerTrigger, changeReportOwnerStatus] =
    useChangeReportOwnerMutation();

  const methods = useForm<any>({
    defaultValues: {
      user: null,
    },
    resolver: yupResolver(
      Yup?.object()?.shape({
        user: Yup?.mixed()?.nullable()?.required('Owner name is Required'),
      }),
    ),
  });

  const { handleSubmit, reset } = methods;

  const submitChangeOwner = async (formData: any) => {
    const apiSearchParams = new URLSearchParams();

    selectedReportLists?.forEach(
      (reportId: any) => apiSearchParams?.append('ids', reportId),
    );

    const apiDataParameter = {
      queryParams: apiSearchParams,
      body: {
        name: formData?.user,
      },
    };

    try {
      await changeReportOwnerTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Report Owner changed Successfully');
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
    setSelectedReportLists([]);
    setIsPortalOpen?.({});
  };

  const apiQueryAgent = useLazyGetAgentDropdownQuery();

  return {
    methods,
    handleSubmit,
    submitChangeOwner,
    closeModal,
    apiQueryAgent,
    changeReportOwnerStatus,
  };
};
