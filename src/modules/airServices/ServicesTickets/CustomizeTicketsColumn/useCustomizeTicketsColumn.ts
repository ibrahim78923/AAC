import usePath from '@/hooks/usePath';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { TicketActionComponentPropsI } from '../TicketsLists/TicketsLists.interface';

export const useCustomizeTicketColumn = (
  props: TicketActionComponentPropsI,
) => {
  const {
    ticketsListsColumnPersist,
    setIsDrawerOpen,
    setTicketsListsActiveColumn,
    ticketsListsActiveColumn,
  } = props;

  const router = useRouter();
  const { makePath } = usePath();
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
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['ticketAction'],
      }),
    );
    setIsDrawerOpen?.(false);
  };

  return {
    submit,
    onClose,
    checkboxHandler,
    customizeColumn,
    ticketsListsColumnPersist,
  };
};
