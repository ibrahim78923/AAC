import { useForm } from 'react-hook-form';
import {
  moveTicketsDefaultValue,
  moveTicketsFormFieldsDynamic,
  moveTicketsValidationSchema,
} from './MoveTickets.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import {
  useLazyGetAgentDropdownQuery,
  useLazyGetDepartmentDropdownQuery,
  usePutTicketsMutation,
} from '@/services/airServices/tickets';
import { yupResolver } from '@hookform/resolvers/yup';
import { TicketActionComponentPropsI } from '../TicketsLists/TicketsLists.interface';
import { ARRAY_INDEX } from '@/constants/strings';
import { PAGINATION } from '@/config';

export const useMoveTickets = (props: TicketActionComponentPropsI) => {
  const {
    setIsPortalOpen,
    setSelectedTicketList,
    selectedTicketList,
    singleTicketDetail,
    setFilterTicketLists,
    getTicketsListData,
    setPage,
  } = props;
  const [putTicketTrigger, putTicketStatus] = usePutTicketsMutation();

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
    moveTicketFormData?.append('id', selectedTicketList?.[ARRAY_INDEX?.ZERO]);
    moveTicketFormData?.append('department', data?.department?._id);
    moveTicketFormData?.append('agent', data?.agent?._id);

    const putTicketParameter = {
      body: moveTicketFormData,
    };

    try {
      await putTicketTrigger(putTicketParameter)?.unwrap();
      successSnackbar('Ticket moved Successfully');
      closeMoveTicketsModal?.();
      setFilterTicketLists?.({});
      setPage?.(PAGINATION?.CURRENT_PAGE);
      await getTicketsListData(PAGINATION?.CURRENT_PAGE, {});
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeMoveTicketsModal = () => {
    reset();
    setSelectedTicketList([]);
    setIsPortalOpen?.({});
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
