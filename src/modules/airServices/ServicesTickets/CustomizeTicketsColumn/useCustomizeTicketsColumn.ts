import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  setIsPortalClose,
  setTicketsListsActiveColumn,
} from '@/redux/slices/airServices/tickets/slice';
import { ticketsListsColumnDynamic } from '../TicketsLists/TicketsTableView/TicketsTableView.data';
import {
  servicesTicketsIsPortalOpenSelector,
  servicesTicketsListsActiveColumnSelector,
} from '@/redux/slices/airServices/tickets/selectors';

export const useCustomizeTicketColumn = () => {
  const dispatch = useAppDispatch();
  const ticketsListsActiveColumn = useAppSelector(
    servicesTicketsListsActiveColumnSelector,
  );

  const isPortalOpen = useAppSelector(servicesTicketsIsPortalOpenSelector);

  const [customizeColumn, setCustomizeColumn]: any = useState<any>(
    ticketsListsActiveColumn,
  );

  const checkboxHandler = (e: any, col: any) => {
    e?.target?.checked
      ? setCustomizeColumn([...customizeColumn, col?.id])
      : setCustomizeColumn(
          customizeColumn?.filter((item: any) => item !== col?.id),
        );
  };

  const submit = () => {
    dispatch(setTicketsListsActiveColumn(customizeColumn));
    onClose?.();
  };

  const onClose = () => {
    dispatch(setIsPortalClose());
  };

  const ticketsListsColumnPersist = ticketsListsColumnDynamic();

  return {
    submit,
    onClose,
    checkboxHandler,
    customizeColumn,
    ticketsListsColumnPersist,
    isPortalOpen,
  };
};
