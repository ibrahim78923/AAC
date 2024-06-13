import { DATE_TIME_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import RowSelection from '@/components/RowSelection';
import RowSelectionAll from '@/components/RowSelectionAll';

export const columns = (selectedRow: any, setSelectedRow: any) => {
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
      accessorFn: (row: any) => row?.title,
      id: 'title',
      cell: (info: any) => info?.getValue(),
      header: 'Title',
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.contactOwnerId,
      id: 'contactOwnerId',
      isSortable: true,
      header: 'Owner',
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
      accessorFn: (row: any) => row?.outcome,
      id: 'outcome',
      isSortable: true,
      header: 'Outcome',
      cell: (info: any) => info?.getValue(),
    },
  ];
};

export const callsDetails: Record<string, number> = {
  All: 0,
  Upcoming: 0,
  Completed: 0,
};

export const callsStatusColor: Record<string, string> = {
  All: '#0AADC7',
  Upcoming: '#FF4A4A',
  Completed: '#47B263',
};
