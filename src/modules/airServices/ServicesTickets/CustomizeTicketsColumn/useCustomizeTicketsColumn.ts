import usePath from '@/hooks/usePath';
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
  const { makePath } = usePath();
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
    theme,
  };
};
