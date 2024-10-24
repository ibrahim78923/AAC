import HeaderInfoIcon from '@/assets/icons/shared/header-info';
import { DATE_TIME_FORMAT, indexNumbers } from '@/constants';
import { isNullOrEmpty } from '@/utils';
import {
  Box,
  Checkbox,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';

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
  tableRowValues: any,
  setTableRowValues: any,
  goalsData: any,
) => {
  const handleSelectCompaniesById = (checked: boolean, id: string): void => {
    if (checked) {
      setTableRowValues([...tableRowValues, id]);
    } else {
      setTableRowValues(tableRowValues?.filter((_id: any) => _id !== id));
    }
  };

  const handleSelectAllCompanies = (checked: boolean): void => {
    setTableRowValues(
      checked ? goalsData?.goals?.map(({ _id }: any) => _id) : [],
    );
  };

  return [
    {
      accessorFn: (row: any) => row?.id,
      id: 'id',
      cell: ({ row: { original } }: any) => (
        <Checkbox
          checked={tableRowValues?.includes(original?._id)}
          onChange={({ target }) => {
            handleSelectCompaniesById(target.checked, original?._id);
          }}
        />
      ),
      header: (
        <Checkbox
          onChange={({ target }) => {
            handleSelectAllCompanies(target.checked);
          }}
          checked={
            goalsData?.goals?.length &&
            tableRowValues?.length === goalsData?.goals?.length
          }
        />
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.collaboratorDetail,
      id: 'collaboratorDetail',
      header: 'Contributor',
      isSortable: true,
      cell: (info: any) => (
        <Stack direction="row" gap={2} alignItems="center">
          <Box>
            {isNullOrEmpty(
              info?.row?.original?.collaboratorDetails[indexNumbers?.ZERO]
                ?.name,
            ) ? (
              <Typography variant="body2">
                {
                  info?.row?.original?.collaboratorDetails[indexNumbers?.ZERO]
                    ?.firstName
                }{' '}
                {
                  info?.row?.original?.collaboratorDetails[indexNumbers?.ZERO]
                    ?.lastName
                }
              </Typography>
            ) : (
              <Typography variant="body2">
                {
                  info?.row?.original?.collaboratorDetails[indexNumbers?.ZERO]
                    ?.name
                }
              </Typography>
            )}
          </Box>
        </Stack>
      ),
    },
    {
      accessorFn: (row: any) => row?.type,
      id: 'type',
      header: 'Type',
      isSortable: true,
      cell: () => 'Sum',
    },
    {
      accessorFn: (row: any) => row?.goalName,
      id: 'goalName',
      header: 'Goal Name',
      isSortable: true,
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.duration,
      id: 'duration',
      header: 'Duration',
      isSortable: true,
      cell: (info: any) => {
        return (
          <Stack direction="row" gap={2} alignItems="center">
            <Box>
              <Typography fontSize="13px" fontWeight={600}>
                {info?.getValue()}
              </Typography>
              <Typography fontSize="12px">
                {dayjs(info?.row?.original?.startDate).format(
                  DATE_TIME_FORMAT?.GOAL_DATE_FORMAT,
                )}{' '}
                -{' '}
                {dayjs(info?.row?.original?.endDate).format(
                  DATE_TIME_FORMAT?.GOAL_DATE_FORMAT,
                )}
              </Typography>
            </Box>
          </Stack>
        );
      },
    },
    {
      accessorFn: (row: any) => row?.target,
      id: 'target',
      header: 'Target',
      isSortable: true,
      cell: (info: any) => `£ ${info?.getValue()}`,
    },
    {
      accessorFn: (row: any) => row?.percentageAchieved,
      id: 'percentageAchieved',
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
      cell: (info: any) => {
        return (
          <Stack>
            <Box>
              <Typography textAlign={'right'} mb={0.2}>
                {info?.getValue()}%
              </Typography>
              <LinearProgress
                sx={{ color: theme?.Palette?.primary?.main, height: '5px' }}
                variant="determinate"
                value={info?.getValue() > 100 ? 100 : info?.getValue()}
              />

              <Typography
                fontSize="12px"
                fontWeight={500}
                textAlign={'right'}
                mt={0.5}
              >
                £{info?.getValue()} of £{info?.row?.original?.target}
              </Typography>
            </Box>
          </Stack>
        );
      },
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      header: 'status',
      isSortable: true,
      cell: (info: any) => info?.getValue(),
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
