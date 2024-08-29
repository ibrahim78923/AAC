import { useRouter } from 'next/router';
import { useState } from 'react';
import { inventoryListsInitialColumns } from '../Inventory.data';
import usePath from '@/hooks/usePath';
import { CustomizeInventoryColumnI } from './CustomizeInventoryColumn.interface';

export const useCustomizeInventoryColumn = (
  props: CustomizeInventoryColumnI,
) => {
  const {
    inventoryListsColumnsPersist,
    setInventoryListsColumns,
    setIsDrawerOpen,
    inventoryListsColumns,
    setSelectedInventoryLists,
  } = props;
  const router = useRouter();
  const { makePath } = usePath();
  const [customizeColumn, setCustomizeColumn] = useState<string[]>(
    inventoryListsColumns,
  );

  const checkboxHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    col: any,
  ) => {
    e?.target?.checked
      ? setCustomizeColumn([...customizeColumn, col?.id])
      : setCustomizeColumn(customizeColumn?.filter((item) => item !== col?.id));
  };
  const submit = () => {
    setInventoryListsColumns(customizeColumn);
    setSelectedInventoryLists([]);
    onClose?.();
  };
  const onClose = () => {
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['inventoryListsAction'],
      }),
    );
    setIsDrawerOpen?.(false);
  };

  const applyAllCheckboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e?.target?.checked
      ? setCustomizeColumn(inventoryListsInitialColumns)
      : setCustomizeColumn(['_id', 'displayName', 'assetType']);
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
