import { useRouter } from 'next/router';
import { useState } from 'react';

export const useCustomizeInventoryColumn = (props: any) => {
  const {
    inventoryListsColumnsPersist,
    setInventoryListsColumns,
    setIsDrawerOpen,
    inventoryListsColumns,
  } = props;
  const router = useRouter();

  const [customizeColumn, setCustomizeColumn]: any = useState<any>(
    inventoryListsColumns?.reduce((x: any, y: any) => {
      const { id } = y;
      return { ...x, [id]: true };
    }, {}),
  );

  const checkboxHandler = (col: any) => {
    if (customizeColumn[col?.id]) {
      delete customizeColumn[col?.id];

      const newTableColumns = inventoryListsColumnsPersist?.filter(
        (x: any) => customizeColumn?.[x?.id],
      );

      setInventoryListsColumns(newTableColumns);
      return;
    }
    setCustomizeColumn({
      ...customizeColumn,
      id: true,
      [col?.id]: true,
    });
    const newTableColumns = inventoryListsColumnsPersist?.filter(
      (x: any) => customizeColumn?.[x?.id],
    );
    setInventoryListsColumns(newTableColumns);
  };
  const submit = () => {
    const newTableColumns = inventoryListsColumnsPersist?.filter(
      (x: any) => customizeColumn?.[x?.id],
    );
    setInventoryListsColumns(newTableColumns);
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

  const applyAllCheckboxHandler = (e: any) => {
    if (e?.target?.checked) {
      const inventory: any = inventoryListsColumnsPersist?.reduce(
        (x: any, y: any) => {
          const { id } = y;
          return { ...x, [id]: true };
        },
        {},
      );
      setCustomizeColumn(inventory);
      setInventoryListsColumns(inventoryListsColumnsPersist);
      return;
    }
    setCustomizeColumn({});
    setInventoryListsColumns([]);
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
