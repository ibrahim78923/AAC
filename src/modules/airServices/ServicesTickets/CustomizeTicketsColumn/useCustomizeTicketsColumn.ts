import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useCustomizeTicketColumn = (props: any) => {
  const {
    ticketsListsColumnPersist,
    setTicketsListsColumn,
    setIsDrawerOpen,
    ticketsListsColumn,
  } = props;

  const theme = useTheme();
  const router = useRouter();

  const [customizeColumn, setCustomizeColumn]: any = useState<any>(
    ticketsListsColumn?.reduce((x: any, y: any) => {
      const { id } = y;
      return { ...x, [id]: true };
    }, {}),
  );

  const checkboxHandler = (col: any) => {
    if (customizeColumn[col?.id]) {
      delete customizeColumn[col?.id];

      const newTableColumns = ticketsListsColumnPersist?.filter(
        (x: any) => customizeColumn?.[x?.id],
      );

      setTicketsListsColumn(newTableColumns);
      return;
    }
    setCustomizeColumn({
      ...customizeColumn,
      id: true,
      [col?.id]: true,
    });
    const newTableColumns = ticketsListsColumnPersist?.filter(
      (x: any) => customizeColumn?.[x?.id],
    );
    setTicketsListsColumn(newTableColumns);
  };
  const submit = () => {
    const newTableColumns = ticketsListsColumnPersist?.filter(
      (x: any) => customizeColumn?.[x?.id],
    );
    setTicketsListsColumn(newTableColumns);
    //TODO: destructing as i do not need that in rest queries.
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const { tableAction, ...restQueries } = router?.query;
    router.push({
      pathname: router?.pathname,
      query: {
        ...restQueries,
      },
    });
    setIsDrawerOpen(false);
  };
  const onClose = () => {
    const { tableAction, ...restQueries } = router?.query;
    router?.push({
      pathname: router?.pathname,
      query: {
        ...restQueries,
      },
    });
    setIsDrawerOpen?.(false);
  };

  return {
    submit,
    onClose,
    checkboxHandler,
    customizeColumn,
    ticketsListsColumnPersist,
    theme,
  };
};
