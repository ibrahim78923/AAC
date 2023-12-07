import { useRouter } from 'next/router';
import { useState } from 'react';
import { inventoryListsInitialColumns } from '../Inventory.data';
import usePath from '@/hooks/usePath';

export const useCustomizeInventoryColumn = (props: any) => {
  const {
    inventoryListsColumnsPersist,
    setInventoryListsColumns,
    setIsDrawerOpen,
    inventoryListsColumns,
    setSelectedInventoryLists,
  } = props;
  const router = useRouter();
  const { makePath } = usePath();
  const [customizeColumn, setCustomizeColumn]: any = useState<any>(
    inventoryListsColumns,
  );

  const checkboxHandler = (e: any, col: any) => {
    e?.target?.checked
      ? setCustomizeColumn([...customizeColumn, col?.id])
      : setCustomizeColumn(
          customizeColumn?.filter((item: any) => item !== col?.id),
        );
  };
  const submit = () => {
    setInventoryListsColumns(customizeColumn);
    setSelectedInventoryLists([]);
    onClose?.();
  };
  const onClose = () => {
    makePath({
      path: router?.pathname,
      skipQueries: ['inventoryListsAction'],
    }),
      setIsDrawerOpen?.(false);
  };

  const applyAllCheckboxHandler = (e: any) => {
    e?.target?.checked
      ? setCustomizeColumn(inventoryListsInitialColumns)
      : setCustomizeColumn([]);
  };

  return {
    submit,
    onClose,
    checkboxHandler,
    inventoryListsColumnsPersist,
    customizeColumn,
    applyAllCheckboxHandler,
    inventoryListsColumns,
  };
};
