import { RHFDatePicker, RHFSelect } from '@/components/ReactHookForm';
import { DATE_FORMAT } from '@/constants';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import RowSelection from '@/components/RowSelection';
import RowSelectionAll from '@/components/RowSelectionAll';
import { ColumnsPropsI, RowDataI } from './NewsAndEvents.interface';

export const newsAndEventsDateFiltersDataArray = [
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      select: true,
    },
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'createdDate',
      label: 'Created Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'type',
      label: 'Type',
      select: true,
    },
    options: [
      { value: 'event', label: 'Event' },
      { value: 'news', label: 'News' },
    ],
    component: RHFSelect,
    md: 12,
  },
];

export const columns: ColumnsPropsI = (selectedRow, setSelectedRow, theme) => {
  return [
    {
      accessorFn: (row: RowDataI) => row?._id,
      id: '_id',
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
      accessorFn: (row: RowDataI) => row?.name,
      id: 'name',
      cell: (info: any) => info?.getValue(),
      header: 'Name',
      isSortable: false,
    },
    {
      accessorFn: (row: RowDataI) => row?.description,
      id: 'description',
      isSortable: true,
      header: 'Description',
      cell: (info: any) => {
        return <Box dangerouslySetInnerHTML={{ __html: info?.getValue() }} />;
      },
    },
    {
      accessorFn: (row: RowDataI) => row?.type,
      id: 'type',
      isSortable: true,
      header: 'Type',
      cell: (info: any) => {
        return (
          info?.getValue()?.charAt(0)?.toUpperCase() +
          info?.getValue()?.slice(1)
        );
      },
    },
    {
      accessorFn: (row: RowDataI) => row?.createdAt,
      id: 'createdAt',
      isSortable: true,
      header: 'Created Date & Time',
      cell: (info: any) => dayjs(info?.getValue())?.format(DATE_FORMAT?.UI),
    },
    {
      accessorFn: (row: RowDataI) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => (
        <Typography
          variant="body4"
          sx={{
            borderRadius: '25px',
            padding: '2px 6px',
            color:
              info?.getValue() === 'inactive'
                ? theme?.palette?.error?.main
                : theme?.palette?.success?.main,
            backgroundColor:
              info?.getValue() === 'inactive'
                ? theme?.palette?.custom?.inactive_bg
                : theme?.palette?.custom?.active_bg,
          }}
        >
          {info?.getValue()}
        </Typography>
      ),
    },
  ];
};

export const MODAL_TITLE = {
  ADD: 'Add',
  UPDATE: 'Update',
};
