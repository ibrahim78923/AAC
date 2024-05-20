import { IMG_URL } from '@/config';
import {
  Avatar,
  Box,
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';

const pipeLineNames = [
  'Test Pipeline',
  'Registering Pipeline',
  'Test Pipeline 2',
];

//table data
export const teamGoalTableColumns: any = (
  handleChange: any,
  personName: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?.id,
      id: 'id',
      cell: (info: any) => <Checkbox color="primary" name={info?.getValue()} />,
      header: <Checkbox color="primary" name="id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      header: 'Name',
      isSortable: true,
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Avatar
            alt="Remy Sharp"
            src={`${
              info?.row?.original?.profilePicture
                ? `${IMG_URL}${info?.row?.original?.profilePicture?.url}`
                : ''
            }`}
          />
          <Box>
            <Typography variant="body4" sx={{ color: '#111827' }}>
              {`${info?.row?.original?.name ?? 'N/A'}`}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.Pipeline,
      id: 'Pipeline',
      header: 'Pipeline',
      isSortable: true,
      cell: () => (
        <Box>
          <FormControl sx={{ mt: 1, width: '100%' }}>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected: any) => selected?.join(', ')}
              placeholder="all"
              multiple
              sx={{ height: '44px', width: '200px' }}
            >
              {pipeLineNames?.map((name: any) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={personName?.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.unitMeasurement,
      id: 'unitMeasurement ',
      header: 'Unit of Measurement ',
      isSortable: true,
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.Jan2023,
      id: 'Jan2023',
      header: 'Jan 2023',
      isSortable: true,
      cell: () => (
        <Box>
          <TextField
            type="number"
            placeholder="0"
            sx={{ '& input': { height: '12px' } }}
          />
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.Jan2023,
      id: 'Jan2023',
      header: 'Feb 2023',
      isSortable: true,
      cell: () => (
        <Box>
          <TextField
            type="number"
            placeholder="0"
            sx={{ '& input': { height: '12px' } }}
          />
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.Jan2023,
      id: 'Jan2023',
      header: 'Mar 2023',
      isSortable: true,
      cell: () => (
        <Box>
          <TextField
            type="number"
            placeholder="0"
            sx={{ '& input': { height: '12px' } }}
          />
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.Jan2023,
      id: 'Jan2023',
      header: 'Apr 2023',
      isSortable: true,
      cell: () => (
        <Box>
          <TextField
            type="number"
            placeholder="0"
            sx={{ '& input': { height: '12px' } }}
          />
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.Jan2023,
      id: 'Jan2023',
      header: 'May  2023',
      isSortable: true,
      cell: () => (
        <Box>
          <TextField
            type="number"
            placeholder="0"
            sx={{ '& input': { height: '12px' } }}
          />
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.Jan2023,
      id: 'Jan2023',
      header: 'Jun 2023',
      isSortable: true,
      cell: () => (
        <Box>
          <TextField
            type="number"
            placeholder="0"
            sx={{ '& input': { height: '12px' } }}
          />
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.Jan2023,
      id: 'Jan2023',
      header: 'Jul 2023',
      isSortable: true,
      cell: () => (
        <Box>
          <TextField
            type="number"
            placeholder="0"
            sx={{ '& input': { height: '12px' } }}
          />
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.Jan2023,
      id: 'Jan2023',
      header: 'Aug 2023',
      isSortable: true,
      cell: () => (
        <Box>
          <TextField
            type="number"
            placeholder="0"
            sx={{ '& input': { height: '12px' } }}
          />
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.Jan2023,
      id: 'Jan2023',
      header: 'Sep 2023',
      isSortable: true,
      cell: () => (
        <Box>
          <TextField
            type="number"
            placeholder="0"
            sx={{ '& input': { height: '12px' } }}
          />
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.Jan2023,
      id: 'Jan2023',
      header: 'Oct 2023',
      isSortable: true,
      cell: () => (
        <Box>
          <TextField
            type="number"
            placeholder="0"
            sx={{ '& input': { height: '12px' } }}
          />
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.Jan2023,
      id: 'Jan2023',
      header: 'Nov 2023',
      isSortable: true,
      cell: () => (
        <Box>
          <TextField
            type="number"
            placeholder="0"
            sx={{ '& input': { height: '12px' } }}
          />
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.Jan2023,
      id: 'Jan2023',
      header: 'Dec 2023',
      isSortable: true,
      cell: () => (
        <Box>
          <TextField
            type="number"
            placeholder="0"
            sx={{ '& input': { height: '12px' } }}
          />
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.yearlyTotal,
      id: 'yearlyTotal',
      header: 'yearly Total',
      isSortable: true,
      cell: (info: any) => (
        <Box>
          <Typography fontSize="12px" fontWeight={600} textAlign={'right'}>
            {info?.getValue()} Deals ({info?.row?.original?.yearlyTotal}%)
          </Typography>
          <Typography
            fontSize="12px"
            fontWeight={500}
            textAlign={'right'}
            mt={0.5}
          >
            {info?.getValue()}/12 months
          </Typography>
        </Box>
      ),
    },
  ];
};

export const teamGoalTableData = [
  {
    id: '1',
    name: 'Olivia Rhye',
    Pipeline: '0',
    unitMeasurement: ' No of Deals',
    Jan2023: '10',
    yearlyTotal: '0',
  },
];
