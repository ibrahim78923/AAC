import HeaderInfoIcon from '@/assets/icons/shared/header-info';
import {
  Box,
  Checkbox,
  LinearProgress,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { usePatchGoalMutation } from '@/services/airSales/forecast';
import { enqueueSnackbar } from 'notistack';
import { EditPenIcon } from '@/assets/icons';

export const manageStatusData = (data: any) => {
  return [
    { title: 'Goal', count: data?.totalTarget, divider: true },
    { title: 'Closed Won', count: data?.totalAchieved, divider: true },
    { title: 'Gap', count: data?.totalGap, divider: true },
    {
      title: 'Forecast Submission',
      count: data?.totalSubmission,
      divider: false,
    },
  ];
};

export const manageAccountData = (data: any) => {
  return [
    { title: 'Pipeline Value', count: data?.totalAchieved, divider: true },
    {
      title: 'Pipeline Coverage',
      count: data?.totalCoveragePercentage,
      divider: false,
    },
  ];
};

//table data
export const manageTableColumns: any = (
  theme: any,
  isDisabled: boolean,
  setIsDisabled: (value: boolean) => void,
  tableRowValues: any,
  setTableRowValues: any,
  stages: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?.id,
      id: 'id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          checked={
            info?.cell?.row?.original?._id ===
              tableRowValues?.cell?.row?.original?._id && !isDisabled
          }
          name={info?.getValue()}
          onClick={() => {
            setTableRowValues(info), setIsDisabled(!isDisabled);
          }}
        />
      ),
      header: '',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.goalName,
      id: 'goalName',
      header: 'Name',
      isSortable: true,
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.percentageAchieved,
      id: 'percentageAchieved',
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
              value={info?.getValue() > 100 ? 100 : info?.getValue()}
            />

            <Typography
              fontSize="12px"
              fontWeight={500}
              textAlign={'right'}
              mt={0.5}
            >
              £{info?.row?.original?.totalAmountAchieved} of £{' '}
              {info?.row?.original?.target}
            </Typography>
          </Box>
        </Stack>
      ),
    },
    {
      accessorFn: (row: any) => row?.totalAmountAchieved,
      id: 'totalAmountAchieved',
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
      cell: (info: any) => `£ ${info?.getValue()}`,
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
      cell: (info: any) => (
        <Stack direction="row" gap={2} alignItems="center">
          <Typography sx={{ cursor: 'pointer' }}>
            {(
              info?.row?.original?.totalAmountAchieved /
              info?.row?.original?.target
            )?.toFixed(1)}
            x
          </Typography>
        </Stack>
      ),
    },
    {
      accessorFn: (row: any) => row?.submission,
      id: 'submission',
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
      cell: (info: any) => {
        const [isEditing, setIsEditing] = useState(false);
        const [submissionValue, setSubmissionValue] = useState(
          info?.getValue(),
        );

        const [patchGoal, { isLoading }] = usePatchGoalMutation();

        const handleEditClick = () => {
          setIsEditing(true);
        };

        const handleInputChange = (
          event: React.ChangeEvent<HTMLInputElement>,
        ) => {
          setSubmissionValue(event.target.value);
        };

        const handleBlur = async () => {
          setIsEditing(false);

          const payload = {
            submission: submissionValue,
          };

          if (info?.row?.original?.submission != submissionValue) {
            try {
              await patchGoal({
                body: payload,
                id: info?.row?.original?._id,
              })?.unwrap();
              enqueueSnackbar('Forecast Submission update successfully', {
                variant: 'success',
              });
            } catch (error: any) {
              enqueueSnackbar('An error occured', {
                variant: 'error',
              });
            }
          }
        };

        return (
          <Stack direction="row" gap={2} alignItems="center">
            {isLoading ? (
              <Skeleton variant="rectangular" width={100} height={30} />
            ) : (
              <>
                {isEditing ? (
                  <TextField
                    value={submissionValue}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    size="small"
                    autoFocus
                    variant="outlined"
                  />
                ) : (
                  <Typography sx={{ cursor: 'pointer' }}>
                    {info?.getValue() ?? '--'}
                  </Typography>
                )}
                {!isEditing && (
                  <Box sx={{ cursor: 'pointer' }} onClick={handleEditClick}>
                    <EditPenIcon />
                  </Box>
                )}
              </>
            )}
          </Stack>
        );
      },
    },
    ...(Array.isArray(stages)
      ? stages?.map((stage: any) => ({
          accessorFn: (row: any) => {
            const stageGroup = row?.stageGroups?.find(
              (group: any) => group?.stageId === stage?._id,
            );
            return stageGroup || { numberOfDeals: 0, totalAmount: 0 };
          },
          id: stage?._id,
          header: stage?.name,
          isSortable: false,
          cell: (info: any) => {
            const stageData = info?.getValue();
            return (
              <Stack direction="row" gap={2} alignItems="center">
                <Box>
                  <Typography>£ {stageData?.totalAmount}</Typography>
                  <Box display="flex" gap={0.5}>
                    <Typography fontSize="12px" fontWeight={600}>
                      {stageData?.numberOfDeals} Deals
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            );
          },
        }))
      : []),
  ];
};

export const manageTableData = [
  {
    id: '1',
    name: 'User 1',
    goalOutcome: '0',
    total: ' £ 20',
    coverageRatio: '0.0x',
    appointmentSch: '£0.00',
    deals: '0',
    contactSent: '£0.00',
    forecastSub: ' £ 20,000.00',
  },
  {
    id: '2',
    name: 'New Team',
    goalOutcome: '0',
    total: ' £ 20',
    coverageRatio: '1.0x',
    appointmentSch: '£0.00',
    deals: '0',
    contactSent: '£0.00',
    forecastSub: ' £ 20,000.00',
  },
  {
    id: '3',
    name: 'User 3456',
    goalOutcome: '0',
    total: ' £ 20',
    coverageRatio: '1.5x',
    appointmentSch: '£0.00',
    deals: '0',
    contactSent: '£0.00',
    forecastSub: ' £ 20,000.00',
  },
  {
    id: '4',
    name: 'Sales Team UK',
    goalOutcome: '0',
    total: ' £ 20',
    coverageRatio: '2.0x',
    appointmentSch: '£0.00',
    deals: '0',
    contactSent: '£0.00',
    forecastSub: ' £ 20,000.00',
  },
  {
    id: '5',
    name: 'User 2',
    goalOutcome: '0',
    total: ' £ 20',
    coverageRatio: '1.0x',
    appointmentSch: '£0.00',
    deals: '0',
    contactSent: '£0.00',
    forecastSub: ' £ 20,000.00',
  },
];
