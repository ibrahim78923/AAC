import React, { useMemo, useCallback } from 'react';
import { CheckboxField } from '@/components/InputFields/CheckboxField';

interface TableCheckboxPropsI<T> {
  selectedList: any[];
  setSelectedList: React.Dispatch<React.SetStateAction<any[]>>;
  tableData: any[];
  idKey?: keyof T;
}

export function tableCheckbox<T>({
  selectedList,
  setSelectedList,
  tableData,
  idKey = '_id' as keyof T,
}: TableCheckboxPropsI<T>) {
  const selectedSet = useMemo(
    () => new Set(selectedList?.map((item) => item?.[idKey])),
    [selectedList],
  );

  const handleCheckboxChange = useCallback(
    (value: any, checked: boolean) => {
      setSelectedList((prev) => {
        const newSelectedList = new Set(prev);
        if (checked) {
          const itemToAdd = tableData?.find((item) => item?.[idKey] === value);
          if (itemToAdd) newSelectedList?.add(itemToAdd);
        } else {
          const itemToRemove = prev?.find((item) => item?.[idKey] === value);
          if (itemToRemove) newSelectedList?.delete(itemToRemove);
        }
        return Array?.from(newSelectedList);
      });
    },
    [setSelectedList, tableData, idKey],
  );

  const handleHeaderChange = useCallback(
    (checked: boolean) => {
      setSelectedList(checked ? [...tableData] : []);
    },
    [setSelectedList, tableData],
  );
  return {
    accessorFn: (row: T) => row?.[idKey],
    id: String(idKey),
    cell: (info: any) => {
      const value = info?.getValue();
      const isChecked = selectedSet?.has(value);

      return (
        <CheckboxField
          checked={isChecked}
          onChange={(e) => handleCheckboxChange(value, e?.target?.checked)}
          name={String(value)}
        />
      );
    },
    header: (
      <CheckboxField
        checked={
          tableData?.length > 0 && selectedList?.length === tableData?.length
        }
        onChange={(e) => handleHeaderChange(e?.target?.checked)}
        name={String(idKey)}
      />
    ),
  };
}
