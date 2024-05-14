import HeaderInfoIcon from '@/assets/icons/shared/header-info';
import {
  Box,
  Checkbox,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

export const manageStatusData = [
  { title: 'Goal', count: 120, divider: true },
  { title: 'Closed Won', count: 0, divider: true },
  { title: 'Gap', count: 120, divider: true },
  { title: 'Forecast Submission', count: 20, divider: false },
];

export const manageAccountData = [
  { title: 'Pipeline Value', count: '0', divider: true },
  { title: 'Pipeline Coverage', count: 0, divider: false },
];

//table data
export const manageTableColumns: any = (
  theme: any,
  isDisabled: boolean,
  setIsDisabled: (value: boolean) => void,
  tableRowValues: any,
  setTableRowValues: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?.id,
      id: 'id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          checked={
            info?.cell?.row?.original?.id ===
              tableRowValues?.cell?.row?.original?.id && !isDisabled
          }
          name={info.getValue()}
          onClick={() => {
            setTableRowValues(info), setIsDisabled(!isDisabled);
          }}
        />
      ),
      header: <Checkbox color="primary" name="id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.contributor,
      id: 'contributor',
      header: 'Contributor',
      isSortable: true,
      cell: (info: any) => info.getValue(),
    },

    {
      accessorFn: (row: any) => row?.type,
      id: 'type',
      header: 'Type',
      isSortable: true,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.goalName,
      id: 'goalName',
      header: 'Goal Name',
      isSortable: true,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.duration,
      id: 'duration',
      header: 'Duration',
      isSortable: true,
      cell: (info: any) => (
        <Stack direction="row" gap={2} alignItems="center">
          <Box>
            <Typography>{info.getValue()}</Typography>

            <Box display="flex" gap={0.5}>
              <Typography fontSize="12px" fontWeight={500}>
                {info?.row?.original?.durationData} Deals
              </Typography>
            </Box>
          </Box>
        </Stack>
      ),
    },
    {
      accessorFn: (row: any) => row?.target,
      id: 'target',
      header: 'Target',
      isSortable: true,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.progress,
      id: 'progress',
      header: (
        <Box display={'flex'} gap={1}>
          Progress
          <Tooltip
            title={
              <Typography variant="body4">
                Progress bar updates will <br /> take upto 24 hours
              </Typography>
            }
            placement="top-start"
            arrow
          >
            <Box>
              {' '}
              <HeaderInfoIcon />{' '}
            </Box>
          </Tooltip>
        </Box>
      ),
      isSortable: true,
      cell: (info: any) => (
        <Stack>
          <Box>
            <Typography textAlign={'right'} mb={0.2}>
              {info.getValue()}%
            </Typography>
            <LinearProgress
              sx={{ color: theme?.Palette?.primary?.main, height: '5px' }}
              variant="determinate"
              value={50}
            />

            <Typography
              fontSize="12px"
              fontWeight={500}
              textAlign={'right'}
              mt={0.5}
            >
              £{info.getValue()} of £120
            </Typography>
          </Box>
        </Stack>
      ),
    },
    {
      accessorFn: (row: any) => row?.forecastSub,
      id: 'forecastSub',
      header: 'Forecast Sub..',
      isSortable: true,
      cell: (info: any) => (
        <Typography
          sx={{
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: '25px',
            width: 'fit-content',
            backgroundColor: `${
              info.getValue() === 'In-Progress' ? '#FFFCF1' : '#ECFFF1'
            }`,
            color: `${
              info.getValue() === 'In-Progress' ? '#FFC20E' : '#47B263'
            }`,
          }}
        >
          {info.getValue()}
        </Typography>
      ),
    },
  ];
};

export const manageTableData = [
  {
    id: '1',
    contributor: 'User 1',
    type: 'Revenue',
    goalName: 'Testers',
    duration: 'Monthly',
    durationData: 'Apr 01 2023- Apr 30 2023',
    deals: '0',
    target: '£1200',
    progress: '0',
    forecastSub: 'In-Progress',
  },
  {
    id: '2',
    contributor: 'New Team',
    type: 'Revenue',
    goalName: 'Testers',
    duration: 'Monthly',
    durationData: 'Apr 01 2023- Apr 30 2023',
    deals: '0',
    target: '£1200',
    progress: '0',
    forecastSub: 'Achieved',
  },
  {
    id: '3',
    contributor: 'User 3456',
    type: 'Revenue',
    goalName: 'Testers',
    duration: 'Monthly',
    durationData: 'Apr 01 2023- Apr 30 2023',
    deals: '0',
    target: '£1200',
    progress: '0',
    forecastSub: 'Achieved',
  },
  {
    id: '4',
    contributor: 'Sales Team UK',
    type: 'Revenue',
    goalName: 'Testers',
    duration: 'Monthly',
    durationData: 'Apr 01 2023- Apr 30 2023',
    deals: '0',
    target: '£1200',
    progress: '0',
    forecastSub: 'Achieved',
  },
  {
    id: '5',
    contributor: 'User 2',
    type: 'Revenue',
    goalName: 'Testers',
    duration: 'Monthly',
    durationData: 'Apr 01 2023- Apr 30 2023',
    deals: '0',
    target: '£1200',
    progress: '0',
    forecastSub: 'Achieved',
  },
];
