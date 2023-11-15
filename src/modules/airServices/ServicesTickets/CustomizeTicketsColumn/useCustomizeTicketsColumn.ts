import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useCustomizeTicketColumn = (props: any) => {
  const {
    ticketsListsColumnPersist,
    setIsDrawerOpen,
    setColumnNames,
    columnNames,
  } = props;

  const theme = useTheme();
  const router = useRouter();

  const [customizeColumn, setCustomizeColumn]: any = useState<any>(columnNames);
  const checkboxHandler = (e: any, col: any) => {
    e?.target?.checked
      ? setCustomizeColumn([...customizeColumn, col?.id])
      : setCustomizeColumn(
          customizeColumn?.filter((item: any) => item !== col?.id),
        );
  };
  const submit = () => {
    setColumnNames(customizeColumn);
    //TODO: destructing as i do not need that in rest queries.
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const { ticketAction, ...restQueries } = router?.query;
    router?.push({
      pathname: router?.pathname,
      query: {
        ...restQueries,
      },
    });
    setIsDrawerOpen(false);
  };
  const onClose = () => {
    //TODO: destructing as i do not need that in rest queries.
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const { ticketAction, ...restQueries } = router?.query;
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
