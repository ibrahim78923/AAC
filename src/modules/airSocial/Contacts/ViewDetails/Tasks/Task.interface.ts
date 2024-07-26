export type ColumnsPropsI = (
  selectedRow: string[],
  setSelectedRow: React.Dispatch<React.SetStateAction<string[]>>,
  setIsActionsDisabled: (value: boolean) => void,
  setRowId: React.Dispatch<React.SetStateAction<string | null>>,
) => any[];
