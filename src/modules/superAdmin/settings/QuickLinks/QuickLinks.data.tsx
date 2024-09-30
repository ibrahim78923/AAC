import { RHFSelect, RHFSwitchableDatepicker } from '@/components/ReactHookForm';
import { EQuickLinksType } from '@/constants';
import { Checkbox } from '@mui/material';

export const quickLinksFilterFiltersDataArray = (selectProductOptions: any) => [
  {
    componentProps: {
      name: 'createdAt',
      label: 'Created Date',
      fullWidth: true,
    },
    component: RHFSwitchableDatepicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'productId',
      label: 'Select Product',
      select: true,
    },
    options: selectProductOptions,
    component: RHFSelect,
    md: 12,
  },
];

export const columns: any = (
  selectedRow: any,
  setSelectedRow: any,
  setIsActionsDisabled: (value: boolean) => void,
  setRowId: any,
) => {
  const handleRowClick = (id: any) => {
    const selectedIndex = selectedRow?.indexOf(id);
    let newSelected: any = [];

    if (selectedIndex === -1) {
      newSelected = newSelected?.concat(selectedRow, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected?.concat(selectedRow.slice(1));
    } else if (selectedIndex === selectedRow.length - 1) {
      newSelected = newSelected?.concat(selectedRow.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected?.concat(
        selectedRow.slice(0, selectedIndex),
        selectedRow.slice(selectedIndex + 1),
      );
    }
    setSelectedRow(newSelected);
    setIsActionsDisabled(newSelected.length === 0);
    if (newSelected.length === 1) {
      setRowId(newSelected[0]);
    } else {
      setRowId(null);
    }
  };

  // Select All Row
  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    rows: any,
  ) => {
    if (event?.target?.checked) {
      const newSelected = rows?.map((n: any) => n?._id);
      setSelectedRow(newSelected);
      setIsActionsDisabled(false);
      return;
    }
    setSelectedRow([]);
    setIsActionsDisabled(true);
  };

  const isSelected = (id: any) => selectedRow?.indexOf(id) !== -1;

  return [
    {
      accessorFn: (row: any) => row?._id,
      id: '_id',
      cell: (info: any) => {
        return (
          <Checkbox
            color="primary"
            checked={isSelected(info?.cell?.row?.original?._id)}
            name={info?.cell?.row?.original?._id}
            onClick={() => {
              handleRowClick(info?.cell?.row?.original?._id);
            }}
          />
        );
      },
      header: (info: any) => {
        const rows = info?.table?.options?.data;
        return (
          <Checkbox
            color="primary"
            indeterminate={
              selectedRow?.length > 0 && selectedRow?.length < rows?.length
            }
            checked={rows?.length > 0 && selectedRow?.length === rows?.length}
            onChange={(event) => handleSelectAllClick(event, rows)}
            disabled={rows?.length === 0}
          />
        );
      },
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.type,
      id: 'type',
      header: 'Product',
      isSortable: false,
      cell: (info: any) =>
        info?.getValue() === EQuickLinksType?.SUPER_ADMIN
          ? 'Super Admin'
          : info?.getValue() === EQuickLinksType?.ORG_ADMIN
            ? 'Org Admin'
            : info?.cell?.row?.original?.productName,
    },

    {
      accessorFn: (row: any) => `${row?.parent} / ${row?.name}`,
      id: 'parent',
      isSortable: true,
      header: 'Module/Sub Module Name',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.url,
      id: 'url',
      isSortable: true,
      header: 'URL',
      cell: (info: any) => {
        const url = info?.getValue();
        const urlWithoutQueryParams = url?.split('?')[0];
        return <>{urlWithoutQueryParams}</>;
      },
    },
  ];
};
