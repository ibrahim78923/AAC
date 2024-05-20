import { PAGINATION } from '@/config';
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
  } = props;

  const assignedTicketsMethod = useForm<any>({
    defaultValues: {
      user: null,
    },
    resolver: yupResolver(
      Yup?.object()?.shape({
        user: Yup?.mixed()?.nullable()?.required('Owner is Required'),
      }),
    ),
  });

  const { handleSubmit, reset } = assignedTicketsMethod;
  const submitAssignedTicketsForm = async () => {
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
    setSelectedReportLists([]);
    setIsPortalOpen?.({});
  };

  const apiQueryAgent = useLazyGetAgentDropdownQuery();

  return {
    assignedTicketsMethod,
    handleSubmit,
    submitAssignedTicketsForm,
    closeModal,
    apiQueryAgent,
  };
};
