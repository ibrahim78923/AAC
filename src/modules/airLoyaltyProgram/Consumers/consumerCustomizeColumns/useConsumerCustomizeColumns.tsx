import { useState } from 'react';
import { consumersListColumnDynamic } from '../Consumer.data';

export const useConsumerCustomizeColumns = (props: any) => {
  const { setCustomizeColumns, customizeColumns, closeDrawer } = props;

  const consumerColumns = consumersListColumnDynamic();

  const [columnDataCustomize, setColumnDataCustomize] =
    useState<any[]>(customizeColumns);

  const checkboxHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    col: any,
  ) => {
    e?.target?.checked
      ? setColumnDataCustomize([...columnDataCustomize, col])
      : setColumnDataCustomize(
          columnDataCustomize?.filter((item: any) => item?.id !== col?.id),
        );
  };

  const applyAllCheckboxHandler = () => {
    setCustomizeColumns?.(columnDataCustomize);
    closeDrawer?.(false);
  };

  return {
    checkboxHandler,
    consumerColumns,
    columnDataCustomize,
    applyAllCheckboxHandler,
  };
};
