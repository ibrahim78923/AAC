import { useForm } from 'react-hook-form';
import {
  moveTicketsDefaultValue,
  moveTicketsFormFieldsDynamic,
  moveTicketsValidationSchema,
} from './MoveTickets.data';
import { useRouter } from 'next/router';
import usePath from '@/hooks/usePath';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import {
  useLazyGetAgentDropdownQuery,
  useLazyGetDepartmentDropdownQuery,
  usePutTicketsMutation,
} from '@/services/airServices/tickets';
import { yupResolver } from '@hookform/resolvers/yup';

export const useMoveTickets = (props: any) => {
  const router = useRouter();
  const { makePath } = usePath();
  const [putTicketTrigger, putTicketStatus] = usePutTicketsMutation();
  const {
    setIsMoveTicketsModalOpen,
    setSelectedTicketList,
    selectedTicketList,
    singleTicketDetail,
    setFilterTicketLists,
    getTicketsListData,
    setPage,
  } = props;

  const moveTicketsFormMethod = useForm<any>({
    defaultValues: moveTicketsDefaultValue,
    resolver: yupResolver(moveTicketsValidationSchema),
  });

  const { handleSubmit, reset } = moveTicketsFormMethod;

  const submitMoveTicketsForm = async (data: any) => {
    const moveTicketFormData = new FormData();
    moveTicketFormData?.append(
      'isChildTicket',
      singleTicketDetail?.isChildTicket,
    );
    moveTicketFormData?.append('requester', singleTicketDetail?.requester);
    moveTicketFormData?.append('ticketType', singleTicketDetail?.ticketType);
    moveTicketFormData?.append('moduleType', singleTicketDetail?.moduleType);
    moveTicketFormData?.append('status', singleTicketDetail?.status);
    moveTicketFormData?.append('id', selectedTicketList?.[0]);
    moveTicketFormData?.append('department', data?.department?._id);
    moveTicketFormData?.append('agent', data?.agent?._id);

    const putTicketParameter = {
      body: moveTicketFormData,
    };

    try {
      await putTicketTrigger(putTicketParameter)?.unwrap();
      successSnackbar('Ticket moved Successfully');
      getTicketsListData(1, {});
      setFilterTicketLists?.({});
      setPage?.(1);
      closeMoveTicketsModal?.();
      reset();
    } catch (error) {
      errorSnackbar();
    }
  };

  const closeMoveTicketsModal = () => {
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['ticketAction'],
      }),
    );
    reset();
    setSelectedTicketList([]);
    setIsMoveTicketsModalOpen?.(false);
  };
  const apiQueryAgent = useLazyGetAgentDropdownQuery();
  const apiQueryDepartment = useLazyGetDepartmentDropdownQuery();
  const moveTicketsFormFields = moveTicketsFormFieldsDynamic(
    apiQueryDepartment,
    apiQueryAgent,
  );
  return {
    moveTicketsFormMethod,
    closeMoveTicketsModal,
    handleSubmit,
    submitMoveTicketsForm,
    moveTicketsFormFields,
    putTicketStatus,
  };
};
