import {
  emptySelectedTicketTasksLists,
  setTicketsTasksListsTotalRecords,
} from '@/redux/slices/airServices/tickets-tasks/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useLazyGetTaskByIdQuery } from '@/services/airServices/tickets/single-ticket-details/tasks';
import { useRouter } from 'next/router';

export const useGetTicketTasksList = () => {
  const router = useRouter();
  const ticketId = router?.query?.ticketId;

  const page = useAppSelector((state) => state?.servicesTicketTasks?.page);

  const pageLimit = useAppSelector(
    (state) => state?.servicesTicketTasks?.pageLimit,
  );

  const dispatch = useAppDispatch();

  const [lazyGetTicketsTasksTrigger, lazyGetTicketsTasksStatus] =
    useLazyGetTaskByIdQuery();

  const getTicketTasksListData = async (currentPage = page) => {
    const queryParams = {
      page: currentPage,
      limit: pageLimit,
      meta: 'true',
      ticketId,
    };

    const getChildTicketsParameter = {
      queryParams,
    };

    try {
      const response = await lazyGetTicketsTasksTrigger(
        getChildTicketsParameter,
      )?.unwrap();
      const totalNoOfRecords = response?.data?.tasks?.length;
      dispatch(setTicketsTasksListsTotalRecords<any>(totalNoOfRecords));
      dispatch(emptySelectedTicketTasksLists());
    } catch (error: any) {
      dispatch(emptySelectedTicketTasksLists());
    }
  };

  return {
    getTicketTasksListData,
    lazyGetTicketsTasksStatus,
    page,
    pageLimit,
  };
};
