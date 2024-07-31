import { RHFSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';
import RowSelection from '@/components/RowSelection';
import RowSelectionAll from '@/components/RowSelectionAll';
import { Box, CircularProgress, MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { RowDataI, ColumnsProps } from './Enquiries.Interface';

export const enquiriesFiltersValidationSchema = Yup.object().shape({
  candidates: Yup.string().trim().required('Field is Required'),
  applyDate: Yup.string().trim().required('Field is Required'),
  status: Yup.string().trim().required('Field is Required'),
});

export const enquiriesFiltersDefaultValues = {
  status: '',
};

export const enquiriesFiltersFiltersDataArray = [
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      select: true,
    },
    options: [
      { value: 'done', label: 'Done' },
      { value: 'pending', label: 'Pending' },
    ],
    component: RHFSelect,
    md: 12,
  },
];

export const columns: ColumnsProps = (
  selectedRow,
  setSelectedRow,
  setSelectedRowData,
  handleStatusChange,
  patchEnquiriesStatus,
) => {
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
        const rowData = info?.cell?.row?.original;
        const id = info?.cell?.row?.original?._id;
        return (
          <Box onClick={() => setSelectedRowData(rowData)}>
            <RowSelection
              id={id}
              selectedRow={selectedRow}
              setSelectedRow={setSelectedRow}
            />
          </Box>
        );
      },
    },
    {
      accessorFn: (row: RowDataI) => row?.name,
      id: 'name',
      cell: (info: any) => info?.getValue() ?? '--',
      header: 'Name',
      isSortable: false,
    },
    {
      accessorFn: (row: RowDataI) => row?.companyAccount,
      id: 'companyAccount',
      isSortable: true,
      header: 'Company Name',
      cell: (info: any) => info?.getValue()?.accountName ?? '--',
    },
    {
      accessorFn: (row: RowDataI) => row?.email,
      id: 'email',
      isSortable: true,
      header: 'Email',
      cell: (info: any) => info?.getValue() ?? '--',
    },
    {
      accessorFn: (row: RowDataI) => row?.phoneNumber,
      id: 'phoneNumber',
      isSortable: true,
      header: 'Phone Number',
      cell: (info: any) => info?.getValue() ?? '--',
    },
    {
      accessorFn: (row: RowDataI) => row?.query,
      id: 'query',
      isSortable: true,
      header: 'Comments',
      cell: (info: any) => info?.getValue() ?? '--',
    },
    {
      accessorFn: (row: RowDataI) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => (
        <>
          {patchEnquiriesStatus?.isLoading &&
          patchEnquiriesStatus?.originalArgs?.queryParams ===
            info?.row?.original?._id ? (
            <CircularProgress size={20} />
          ) : (
            <Select
              value={info?.getValue()}
              label={''}
              onChange={(event: SelectChangeEvent) =>
                handleStatusChange?.(info?.row?.original, event)
              }
              disabled={patchEnquiriesStatus?.isLoading}
              size={'small'}
              sx={{
                color: 'custom.main',
                fontSize: '14px',
                '.MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
            >
              <MenuItem value={'done'}>Done</MenuItem>
              <MenuItem value={'pending'}>Pending</MenuItem>
            </Select>
          )}
        </>
      ),
    },
  ];
};
