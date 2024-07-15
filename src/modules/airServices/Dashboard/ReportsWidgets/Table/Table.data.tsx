export const makeDynamicColumn = (tableColumns: any) =>
  tableColumns?.length
    ? tableColumns?.map((column: any) => ({
        accessorFn: (row: any) => row?.[column?.fieldName],
        id: column?.fieldName,
        header: column?.fieldName,
        cell: (info: any) => (!!info?.getValue() ? info?.getValue() : '---'),
      }))
    : [];
