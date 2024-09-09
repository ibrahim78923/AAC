import { printData } from './PrintTicket.data';
import { useRouter } from 'next/router';
import {
  emptySelectedTicketLists,
  setIsPortalClose,
} from '@/redux/slices/airServices/tickets/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { ARRAY_INDEX } from '@/constants/strings';

export const usePrintTicket = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const selectedTicketLists = useAppSelector(
    (state) => state?.servicesTickets?.selectedTicketLists,
  );

  const isPortalOpen = useAppSelector(
    (state) => state?.servicesTickets?.isPortalOpen,
  );

  const singleTicketDetail = selectedTicketLists?.[ARRAY_INDEX?.ZERO];

  const onSubmit = () => {
    window?.print();
    onClose();
  };

  const onClose = () => {
    dispatch(emptySelectedTicketLists());
    dispatch(setIsPortalClose());
  };

  const printDataField = printData(singleTicketDetail);

  return {
    onSubmit,
    onClose,
    printDataField,
    router,
    isPortalOpen,
    singleTicketDetail,
  };
};
