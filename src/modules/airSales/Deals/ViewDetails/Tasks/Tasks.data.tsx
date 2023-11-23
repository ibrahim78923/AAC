import { Checkbox } from '@mui/material';

export const columns = ({ handleCheckboxChange, selectedCheckboxes }: any) => {
  return [
    {
      accessorFn: (row: any) => row?.Id,
      id: 'Id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          name={'name'}
          onChange={(event) => handleCheckboxChange(event, info.row.original)}
          checked={selectedCheckboxes?.some(
            (selectedItem) => selectedItem.id === info.row.original.id,
          )}
        />
      ),
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?._id,
      id: 'taskno',
      cell: (info: any) => info?.getValue(),
      header: 'Task No',
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      isSortable: true,
      header: 'Task Name',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.dueDate,
      id: 'duedate',
      isSortable: true,
      header: 'Due Date',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.assignTo,
      id: 'assignedTo',
      isSortable: true,
      header: 'Assigned To',
      cell: (info: any) => info?.getValue(),
    },
  ];
};
