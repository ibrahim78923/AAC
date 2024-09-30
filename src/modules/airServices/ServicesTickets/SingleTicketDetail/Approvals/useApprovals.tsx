import { useAppDispatch } from '@/redux/store';
import {
  TAB_CHANGED_FILTERED,
  singleTicketDetailApprovalsTabsDynamic,
} from './Approvals.data';
import {
  setApprovalStatus,
  setIsPortalClose,
} from '@/redux/slices/airServices/tickets-approvals/slice';

export const useApprovals = () => {
  const dispatch = useAppDispatch();
  const singleTicketDetailApprovalsTabs =
    singleTicketDetailApprovalsTabsDynamic();

  const handleTabChange = (tabValue: any) => {
    dispatch(setApprovalStatus<any>(TAB_CHANGED_FILTERED?.[tabValue]));
    dispatch(setIsPortalClose?.());
  };
  return {
    handleTabChange,
    singleTicketDetailApprovalsTabs,
  };
};
