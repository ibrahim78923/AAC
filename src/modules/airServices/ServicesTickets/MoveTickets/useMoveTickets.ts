import { useForm } from 'react-hook-form';
import {
  moveTicketsDefaultValue,
  moveTicketsFormFieldsDynamic,
  moveTicketsValidationSchema,
} from './MoveTickets.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import {
  useLazyGetAirServicesAllAgentsUsersDropdownListQuery,
  useLazyGetDepartmentDropdownQuery,
  usePutTicketsMutation,
} from '@/services/airServices/tickets';
import { yupResolver } from '@hookform/resolvers/yup';
import { ARRAY_INDEX } from '@/constants/strings';
import { useGetTicketList } from '../TicketsServicesHooks/useGetTicketList';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  emptySelectedTicketLists,
  setIsPortalClose,
  setPage,
} from '@/redux/slices/airServices/tickets/slice';
import { PAGINATION } from '@/config';

export const useMoveTickets = () => {
  const dispatch = useAppDispatch();

  const { getTicketsListData, page } = useGetTicketList();

  const totalRecords = useAppSelector(
    (state) => state?.servicesTickets?.totalRecords,
  );

  const selectedTicketLists = useAppSelector(
    (state) => state?.servicesTickets?.selectedTicketLists,
  );

  const isPortalOpen = useAppSelector(
    (state) => state?.servicesTickets?.isPortalOpen,
  );

  const singleTicketDetail = selectedTicketLists?.[ARRAY_INDEX?.ZERO];

  const [putTicketTrigger, putTicketStatus] = usePutTicketsMutation();

  const moveTicketsFormMethod = useForm<any>({
    defaultValues: moveTicketsDefaultValue,
    resolver: yupResolver(moveTicketsValidationSchema),
  });

  const { handleSubmit, reset } = moveTicketsFormMethod;

  const refetchApi = async () => {
    const newPage =
      selectedTicketLists?.length === totalRecords
        ? PAGINATION?.CURRENT_PAGE
        : page;
    dispatch(setPage?.(newPage));
    await getTicketsListData?.(newPage);
  };

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
    moveTicketFormData?.append('id', singleTicketDetail?._id);
    moveTicketFormData?.append('department', data?.department?._id);
    moveTicketFormData?.append('agent', data?.agent?._id);

    const putTicketParameter = {
      body: moveTicketFormData,
    };

    try {
      await putTicketTrigger(putTicketParameter)?.unwrap();
      successSnackbar('Ticket moved Successfully');
      closeMoveTicketsModal?.();
      await refetchApi();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeMoveTicketsModal = () => {
    reset();
    dispatch(emptySelectedTicketLists());
    dispatch(setIsPortalClose());
  };

  const apiQueryAgent = useLazyGetAirServicesAllAgentsUsersDropdownListQuery();
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
    isPortalOpen,
  };
};
