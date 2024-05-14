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
          name={info?.getValue()}
          onClick={() => {
            setTableRowValues(info), setIsDisabled(!isDisabled);
          }}
        />
      ),
      header: <Checkbox color="primary" name="id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      header: 'Name',
      isSortable: true,
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.goalOutcome,
      id: 'goalOutcome',
      header: (
        <Box display={'flex'} gap={1}>
          Goal Outcome
          <Tooltip
            title={
              <Typography variant="body4">
                Closed revenue relative <br /> to the revenue goal
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
              {info?.getValue()}%
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
              £{info?.getValue()} of £120
            </Typography>
          </Box>
        </Stack>
      ),
    },
    {
      accessorFn: (row: any) => row?.total,
      id: 'total',
      header: (
        <Box display={'flex'} gap={1}>
          Total
          <Tooltip
            title={
              <Typography variant="body4" style={{ textAlign: 'center' }}>
                How it's calculated <br /> Forecasted Deals + Closed Won <br />{' '}
                = Total
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
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.coverageRatio,
      id: 'coverageRatio',
      header: (
        <Box display={'flex'} gap={1}>
          Coverage Ratio
          <Tooltip
            title={
              <Typography variant="body4" style={{ textAlign: 'center' }}>
                How it's calculated <br /> Total / Goal = Coverage Ratio
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
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.closedDeal,
      id: 'closedDeal',
      header: (
        <Box display={'flex'} gap={1}>
          Closed Deal
          <Tooltip
            title={
              <Typography variant="body4" style={{ textAlign: 'center' }}>
                Deals in this forecast category <br /> are less likely to close
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
        <Stack direction="row" gap={2} alignItems="center">
          <Box>
            <Typography>{info?.getValue()}</Typography>

            <Box display="flex" gap={0.5}>
              <Typography fontSize="12px" fontWeight={500}>
                {info?.row?.original?.deals} Deals
              </Typography>
            </Box>
          </Box>
        </Stack>
      ),
    },
    {
      accessorFn: (row: any) => row?.bestCase,
      id: 'bestCase',
      header: (
        <Box display={'flex'} gap={1}>
          Best Case
          <Tooltip
            title={
              <Typography variant="body4" style={{ textAlign: 'center' }}>
                Deals that have a moderate <br /> chance of closing
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
        <Stack direction="row" gap={2} alignItems="center">
          <Box>
            <Typography>{info?.getValue()}</Typography>

            <Box display="flex" gap={0.5}>
              <Typography fontSize="12px" fontWeight={500}>
                {info?.row?.original?.deals} Deals
              </Typography>
            </Box>
          </Box>
        </Stack>
      ),
    },
    {
      accessorFn: (row: any) => row?.commit,
      id: 'commit',
      header: 'Commit',
      isSortable: true,
      cell: (info: any) => (
        <Stack direction="row" gap={2} alignItems="center">
          <Box>
            <Typography>{info?.getValue()}</Typography>

            <Box display="flex" gap={0.5}>
              <Typography fontSize="12px" fontWeight={500}>
                {info?.row?.original?.deals} Deals
              </Typography>
            </Box>
          </Box>
        </Stack>
      ),
    },
    {
      accessorFn: (row: any) => row?.forecastSub,
      id: 'forecastSub',
      header: (
        <Box display={'flex'} gap={1}>
          Forecast Sub..
          <Tooltip
            title={
              <Typography variant="body4" style={{ textAlign: 'center' }}>
                Forecast Submission
              </Typography>
            }
            placement="top-end"
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
        <Stack direction="row" gap={2} alignItems="center">
          <Box display="flex" gap={0.5}>
            <Tooltip
              title={
                <Box>
                  <Typography variant="body4">
                    <b> Forecast Submission</b> <br />
                  </Typography>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant="body4">Time Forecast</Typography>
                    <Typography variant="body4">
                      May 2023 <br />
                    </Typography>
                  </Box>

                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant="body4">Total</Typography>
                    <Typography variant="body4">
                      N/A <br />
                    </Typography>
                  </Box>

                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant="body4">Team Submission</Typography>
                    <Typography variant="body4">
                      £45.00 <br />
                    </Typography>
                  </Box>
                </Box>
              }
              placement="top-end"
              arrow
              PopperProps={{
                style: { width: '220px' },
              }}
            >
              <Typography sx={{ cursor: 'pointer' }}>
                {info?.getValue()}
              </Typography>
            </Tooltip>
          </Box>
        </Stack>
      ),
    },
  ];
};

export const manageTableData = [
  {
    id: '1',
    name: 'User 1',
    goalOutcome: '0',
    total: ' £ 20',
    coverageRatio: '0.0x',
    closedDeal: '£0.00',
    deals: '0',
    bestCase: '£0.00',
    commit: '£0.00',
    forecastSub: ' £ 20,000.00',
  },
  {
    id: '2',
    name: 'New Team',
    goalOutcome: '0',
    total: ' £ 20',
    coverageRatio: '1.0x',
    closedDeal: '£0.00',
    deals: '0',
    bestCase: '£0.00',
    commit: '£0.00',
    forecastSub: ' £ 20,000.00',
  },
  {
    id: '3',
    name: 'User 3456',
    goalOutcome: '0',
    total: ' £ 20',
    coverageRatio: '1.5x',
    closedDeal: '£0.00',
    deals: '0',
    bestCase: '£0.00',
    commit: '£0.00',
    forecastSub: ' £ 20,000.00',
  },
  {
    id: '4',
    name: 'Sales Team UK',
    goalOutcome: '0',
    total: ' £ 20',
    coverageRatio: '2.0x',
    closedDeal: '£0.00',
    deals: '0',
    bestCase: '£0.00',
    commit: '£0.00',
    forecastSub: ' £ 20,000.00',
  },
  {
    id: '5',
    name: 'User 2',
    goalOutcome: '0',
    total: ' £ 20',
    coverageRatio: '1.0x',
    closedDeal: '£0.00',
    deals: '0',
    bestCase: '£0.00',
    commit: '£0.00',
    forecastSub: ' £ 20,000.00',
  },
];
