import { TICKET_APPROVALS_ACTIONS_CONSTANT } from '@/constants/portal-actions';
import { setIsPortalOpen } from '@/redux/slices/airServices/tickets-approvals/slice';
import { useAppSelector, useAppDispatch } from '@/redux/store';

const { ADD_TICKET_APPROVAL } = TICKET_APPROVALS_ACTIONS_CONSTANT ?? {};

export const useHeader = () => {
  const dispatch = useAppDispatch();
  const isPortalOpen = useAppSelector(
    (state) => state?.servicesTicketApprovals?.isPortalOpen,
  );

  const setAction = (actionType: string) => {
    dispatch(
      setIsPortalOpen<any>({
        isOpen: true,
        action: actionType,
      }),
    );
  };

  const openAddRequestApprovals = () => setAction(ADD_TICKET_APPROVAL);

  return {
    isPortalOpen,
    openAddRequestApprovals,
  };
};
