import {
  Paper,
  Box,
  Checkbox,
  Avatar,
  Typography,
  useTheme,
} from '@mui/material';

import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';

import { useGetDealsListQuery } from '@/services/airSales/deals';

import dayjs from 'dayjs';

const DelasTable = ({
  handleTableCheckboxChange,
  handleSelectAll,
  selectedTableIds,
  filterVal,
  search,
  columns,
}: any) => {
  const theme = useTheme();
  const params: any = {
    page: 1,
    limit: 10,
    search: search ? search : undefined,
    dealPiplineId: filterVal?.dealPiplineId
      ? filterVal?.dealPiplineId
      : undefined,
    dealOwnerId: filterVal?.dealOwnerId ? filterVal?.dealOwnerId : undefined,
    dealStageId: filterVal?.dealStageId ? filterVal?.dealStageId : undefined,
    dateEnd: filterVal?.closeDate
      ? dayjs(filterVal?.closeDate)?.toISOString()
      : undefined,
  };
  if (filterVal?.name) {
    // params['search'] = search;
    params['name'] = filterVal?.name;
  }
  const { data } = useGetDealsListQuery(params);
  const alwaysViewColumns = ['_id', 'email'];

  const dealsColumns: any = [
    {
      accessorFn: (row: any) => row?._id,
      id: '_id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          onChange={(event: any) =>
            handleTableCheckboxChange(event, info?.row?.original?._id)
          }
          checked={selectedTableIds?.includes(info?.row?.original?._id)}
        />
      ),
      header: (
        <Checkbox
          color="primary"
          name="selectAll"
          checked={selectedTableIds?.length === data?.data?.deals?.length}
          onChange={handleSelectAll}
        />
      ),
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.dealOwner,
      id: 'name',
      isSortable: true,
      header: 'Deal Owner',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: '5px' }}>
          <Avatar
            alt="Remy Sharp"
            // src={}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant="body4"
              sx={{ color: theme?.palette?.blue?.dull_blue }}
            >
              {info?.row?.original?.dealOwner?.name}
            </Typography>
            <Typography
              variant="body3"
              sx={{ color: theme?.palette?.custom?.light, fontWeight: 400 }}
            >
              {info?.row?.original?.dealOwner?.email
                ? info?.row?.original?.dealOwner?.email
                : 'N/A'}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      isSortable: true,
      header: 'Deal Name',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.closeDate,
      id: 'closeDate',
      isSortable: true,
      header: 'Close Date',
      cell: ({ getValue }: any) =>
        dayjs(getValue())?.format('YYYY/MM/DD') ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.amount,
      id: 'amount',
      isSortable: true,
      header: 'Amount',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.dealStage,
      id: 'dealStage',
      isSortable: true,
      header: 'Deal Stage',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.dealPipeline,
      id: 'dealPipeline',
      isSortable: true,
      header: 'Deal Pipeline',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
  ];

  // {
  //   columns: ['createdBy','name', 'closeDate', 'amount', 'dealStage', 'dealPipeline'],
  //   filters: {
  //     dealPiplineId: 'value',
  //     dealOwnerId: 'value',
  //     dealStageId: 'value',
  //     closeDate: 'value'
  //   },
  //   viewType: 'listView' | 'gridView'
  // }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TanstackTable
          columns={dealsColumns?.filter(
            (column: any) =>
              alwaysViewColumns?.includes(column?.id) ||
              columns?.includes(column?.id),
          )}
          data={data?.data?.deals}
        />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </Paper>
    </Box>
  );
};
export default DelasTable;
