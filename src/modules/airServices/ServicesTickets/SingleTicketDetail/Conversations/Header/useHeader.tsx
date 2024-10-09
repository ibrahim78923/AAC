import { useAppDispatch, useAppSelector } from '@/redux/store';
import { addConversationDropdownActionsDynamic } from './Header.data';
import { setIsPortalOpen } from '@/redux/slices/airServices/ticket-conversation/slice';

export const useHeader = () => {
  const dispatch = useAppDispatch();
  const isPortalOpen = useAppSelector(
    (state) => state?.servicesTicketConversation?.isPortalOpen,
  );

  const setAction = (actionType: string) => {
    dispatch(
      setIsPortalOpen<any>({
        isOpen: true,
        action: actionType,
      }),
    );
  };

  const addConversationDropdownActions =
    addConversationDropdownActionsDynamic?.(setAction);

  return {
    addConversationDropdownActions,
    isPortalOpen,
  };
};
