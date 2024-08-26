import { DATE_TIME_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import RowSelection from '@/components/RowSelection';
import RowSelectionAll from '@/components/RowSelectionAll';
import { ColumnsPropsI } from './Task.interface';

export const columns: ColumnsPropsI = (selectedRow, setSelectedRow) => {
  return [
    {
      accessorFn: (row: any) => row?.Id,
      id: 'Id',
      isSortable: false,
      header: (info: any) => {
        const rows = info?.table?.options?.data;
        return (
          <RowSelectionAll
            rows={rows}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
            disabled={rows?.length === 0}
          />
        );
      },
      cell: (info: any) => {
        const id = info?.cell?.row?.original?._id;
        return (
          <RowSelection
            id={id}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
          />
        );
      },
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
      cell: (info: any) =>
        dayjs(info.getValue()).format(DATE_TIME_FORMAT?.DMYhmma),
    },

    {
      accessorFn: (row: any) => row?.assignTo,
      id: 'assignTo',
      isSortable: true,
      header: 'Assigned To',
      cell: (info: any) =>
        `${info?.getValue()?.firstName} ${info?.getValue()?.lastName}`,
    },
  ];
};
