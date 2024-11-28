import { setIsPortalOpen } from '@/redux/slices/airServices/ticket-conversation/slice';
import { useAppDispatch } from '@/redux/store';
import { useGetTicketConversationList } from '../../../TicketsServicesHooks/useGetTicketConversationList';
import { useEffect } from 'react';

export const useConversationList = () => {
  const dispatch = useAppDispatch();

  const {
    getTicketConversationListData,
    lazyGetServicesTicketsConversationListStatus,
  } = useGetTicketConversationList?.();

  useEffect(() => {
    getTicketConversationListData();
  }, []);

  const setAction = (action: string, data: any) => {
    dispatch(
      setIsPortalOpen<any>({
        isOpen: true,
        action,
        data,
      }),
    );
  };

  const showLoader = lazyGetServicesTicketsConversationListStatus?.isLoading;
  const showMoreLoader =
    lazyGetServicesTicketsConversationListStatus?.isFetching;

  return {
    getTicketConversationListData,
    lazyGetServicesTicketsConversationListStatus,
    setAction,
    showLoader,
    showMoreLoader,
  };
};
