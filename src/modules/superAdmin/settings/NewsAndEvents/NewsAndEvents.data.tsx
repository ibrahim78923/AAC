import { RHFDatePicker, RHFSelect } from '@/components/ReactHookForm';
import { DATE_FORMAT } from '@/constants';
import { Checkbox, Typography } from '@mui/material';
import dayjs from 'dayjs';
import * as Yup from 'yup';
export const newsAndEventsDateValidationSchema = Yup.object().shape({
  createdDate: Yup?.string(),
  status: Yup?.string(),
  type: Yup?.string(),
});

export const newsAndEventsDateDefaultValues = {
  createdDate: '',
  status: '',
  type: '',
};

export const newsAndEventsDateFiltersDataArray = [
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      select: true,
    },
    options: [
      { value: 'active', label: 'active' },
      { value: 'inactive', label: 'inactive' },
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
      { value: 'events', label: 'event' },
      { value: 'news', label: 'news' },
    ],
    component: RHFSelect,
    md: 12,
  },
];

export const columns = (
  isDisabled: boolean,
  setIsDisabled: (value: boolean) => void,
  tableRowValues: any,
  setTableRowValues: any,
  theme: any,
) => {
  return [
    {
      accessorFn: (row: any) => row.id,
      id: 'id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          checked={
            info?.cell?.row?.original?._id ===
              tableRowValues?.cell?.row?.original?._id && isDisabled
          }
          name={info?.getValue()}
          onClick={() => {
            setTableRowValues(info), setIsDisabled(!isDisabled);
          }}
        />
      ),
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.name,
      id: 'name',
      cell: (info: any) => info?.getValue(),
      header: 'Name',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.description,
      id: 'description',
      isSortable: true,
      header: 'Description',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.type,
      id: 'type',
      isSortable: true,
      header: 'Type',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdAt',
      isSortable: true,
      header: 'Created Date & Time',
      cell: (info: any) => dayjs(info?.getValue())?.format(DATE_FORMAT?.UI),
    },
    {
      accessorFn: (row: any) => row?.status,
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
