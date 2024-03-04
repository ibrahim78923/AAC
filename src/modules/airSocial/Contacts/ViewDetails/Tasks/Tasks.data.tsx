import { DATE_TIME_FORMAT } from '@/constants';
import { Checkbox } from '@mui/material';
import dayjs from 'dayjs';

export const columns = (
  selectedRow: any,
  setSelectedRow: any,
  setIsActionsDisabled: (value: boolean) => void,
  setRowId: any,
) => {
  const handleRowClick = (id: any) => {
    const selectedIndex = selectedRow?.indexOf(id);
    let newSelected: any = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRow, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRow.slice(1));
    } else if (selectedIndex === selectedRow.length - 1) {
      newSelected = newSelected.concat(selectedRow.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
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
      accessorFn: (row: any) => row._id,
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
            checked={
              rows?.length > 0 &&
              selectedRow?.length === info?.table?.options?.data?.length
            }
            onChange={(event) => handleSelectAllClick(event, rows)}
          />
        );
      },
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?._id,
      id: 'taskno',
      cell: (info: any) => {
        return <>{`#TSK- ${info?.getValue()}`}</>;
      },
      header: 'Task No',
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.title,
      id: 'title',
      isSortable: true,
      header: 'Task Name',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => ({
        startDate: row?.startDate,
        endDate: row?.endDate,
      }),
      id: 'duedate',
      isSortable: true,
      header: 'Due Date',
      cell: (info: any) => {
        const startDate = dayjs(info.getValue()?.startDate).format(
          DATE_TIME_FORMAT?.MMMDDYYYY,
        );
        const endDate = dayjs(info.getValue()?.endDate).format(
          DATE_TIME_FORMAT?.MMMDDYYYY,
        );
        return `${startDate} - ${endDate}`;
      },
    },

    {
      accessorFn: (row: any) => row?.assignTo,
      id: 'assignTo',
      isSortable: true,
      header: 'Assigned To',
      cell: (info: any) => info?.getValue(),
    },
  ];
};
