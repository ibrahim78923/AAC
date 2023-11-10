import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useCustomizeTicketColumn = (props: any) => {
  const {
    ticketsListsColumnPersist,
    // setTicketsListsColumn,
    setIsDrawerOpen,
    // ticketsListsColumn,
    setColumnNames,
    columnNames,
  } = props;

  const theme = useTheme();
  const router = useRouter();

  // const [customizeColumn, setCustomizeColumn]: any = useState<any>(
  //   ticketsListsColumn?.reduce((x: any, y: any) => {
  //     const { id } = y;
  //     return { ...x, [id]: true };
  //   }, {}),
  // );
  const [customizeColumn, setCustomizeColumn]: any = useState<any>(columnNames);
  const checkboxHandler = (e: any, col: any) => {
    // e?.target?.checked
    //   ? setColumnNames([...columnNames, col?.id])
    //   : setColumnNames(
    //       columnNames?.filter((item: any) => item !== col?.id),
    //     );
    e?.target?.checked
      ? setCustomizeColumn([...customizeColumn, col?.id])
      : setCustomizeColumn(
          customizeColumn?.filter((item: any) => item !== col?.id),
        );
    // if (ticketsListsColumn[col?.id]) {
    //   delete ticketsListsColumn[col?.id];

    //   // const newTableColumns = ticketsListsColumnPersist?.filter(
    //   //   (x: any) => customizeColumn?.[x?.id],
    //   // );

    //   // setTicketsListsColumn(newTableColumns);
    //   return;
    // }
    // setTicketsListsColumn({
    //   ...ticketsListsColumn,
    //   id: true,
    //   [col?.id]: true,
    // });
    // const newTableColumns = ticketsListsColumnPersist?.filter(
    //   (x: any) => customizeColumn?.[x?.id],
    // );
    // setTicketsListsColumn(newTableColumns);
  };
  const submit = () => {
    // console.log({ ticketsListsColumn });
    // console.log({ setColumnNames });
    setColumnNames(customizeColumn);
    // const newTableColumns = ticketsListsColumnPersist?.filter(
    //   (x: any) => customizeColumn?.[x?.id],
    // );
    // setTicketsListsColumn(newTableColumns);
    //TODO: destructing as i do not need that in rest queries.
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const { tableAction, ...restQueries } = router?.query;
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
