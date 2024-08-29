import { useState } from 'react';
import { TicketActionComponentPropsI } from '../TicketsLists/TicketsLists.interface';

export const useCustomizeTicketColumn = (
  props: TicketActionComponentPropsI,
) => {
  const {
    ticketsListsColumnPersist,
    setIsPortalOpen,
    setTicketsListsActiveColumn,
    ticketsListsActiveColumn,
  } = props;

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
    setTicketsListsActiveColumn(customizeColumn);
    onClose?.();
  };

  const onClose = () => {
    setIsPortalOpen?.({});
  };

  return {
    submit,
    onClose,
    checkboxHandler,
    customizeColumn,
    ticketsListsColumnPersist,
  };
};
