import ProfileNameIcon from '@/components/ProfileNameIcon';
import { ARRAY_INDEX } from '@/constants/strings';
import { Box, Stack, Typography } from '@mui/material';

export const totalColumns: any = (theme: any, data: any) => [
  {
    accessorFn: (row: any) => row?.collaboratorDetails[ARRAY_INDEX?.ZERO]?.name,
    id: 'name',
    cell: (info: any) => (
      <Box display="flex" gap={1} alignItems="center">
        <ProfileNameIcon
          lastName={
            info?.row?.original?.collaboratorDetails[ARRAY_INDEX?.ZERO]
              ?.lastName ??
            info?.row?.original?.collaboratorDetails[ARRAY_INDEX?.ZERO]?.name
          }
          firstName={
            info?.row?.original?.collaboratorDetails[ARRAY_INDEX?.ZERO]
              ?.firstName ?? ''
          }
        />

        <Box display="flex" flexDirection="column">
          <Typography
            variant="body4"
            fontWeight={500}
            color={theme?.blue?.dull_blue}
          >
            {info?.getValue()}
          </Typography>
          <Typography variant="body4" color={theme?.custom?.light}>
            @{' '}
            {
              info?.row?.original?.collaboratorDetails[ARRAY_INDEX?.ZERO]
                ?.firstName
            }
          </Typography>
        </Box>
      </Box>
    ),
    header: 'Owner',
    isSortable: true,
  },

  ...(Array.isArray(data?.pipelineWithStages)
    ? data?.pipelineWithStages.flatMap(
        (pipeline: any) =>
          pipeline?.stages?.map((stage: any) => ({
            accessorFn: (row: any) => {
              const stageGroup = row?.stageGroups?.find(
                (group: any) => group?.stageId === stage?._id,
              );
              return stageGroup || { numberOfDeals: 0, totalAmount: 0 };
            },
            id: stage?._id,
            header: `${stage?.name} (${pipeline?.name})`, // Stage name with pipeline in brackets
            isSortable: false,
            cell: (info: any) => {
              const stageData = info?.getValue();
              return (
                <Stack gap={2} alignItems="center">
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
          })),
      )
    : []),

  {
    accessorFn: (row: any) => row?.totalTarget,
    id: 'totalTarget',
    isSortable: true,
    header: 'Total revenue goal',
    cell: (info: any) => (
      <Typography variant="body4" color={theme?.custom?.light}>
        £ {info?.getValue()}
      </Typography>
    ),
  },
];

export const overtimeColumns = (theme: any, data: any) => {
  const stageIdToNameMap: any = {};
  data?.pipelineWithStages?.forEach((pipeline: any) => {
    pipeline?.stages?.forEach((stage: any) => {
      stageIdToNameMap[stage?._id] = `${stage?.name} (${pipeline?.name})`;
    });
  });

  const columns = [
    {
      accessorFn: (row: any) => row?.date,
      id: 'date',
      cell: (info: any) => (
        <Typography
          variant="body4"
          fontWeight={500}
          color={theme?.blue?.dull_blue}
        >
          {info?.getValue()}
        </Typography>
      ),
      header: 'Date',
      isSortable: true,
    },
    ...data?.pipelineWithStages?.reduce((acc: any[], pipeline: any) => {
      pipeline?.stages?.forEach((stage: any) => {
        acc?.push({
          accessorFn: (row: any) => {
            const stageData = row?.stages?.find(
              (s: any) => s?.stageId === stage?._id,
            );
            return stageData || { deals: 0, total: 0 };
          },
          id: stage?._id,
          header: stageIdToNameMap[stage?._id],
          isSortable: true,
          cell: (info: any) => {
            const { total, deals } = info?.getValue();
            return (
              <Box display="flex" flexDirection="column">
                <Typography
                  variant="body4"
                  fontWeight={500}
                  color={theme?.blue?.dull_blue}
                >
                  {deals} deals
                </Typography>
                <Typography variant="body4" color={theme?.custom?.light}>
                  £{total?.toFixed(2)}
                </Typography>
              </Box>
            );
          },
        });
      });
      return acc;
    }, []),
  ];

  return columns;
};

export const comparisonColumns = (theme: any, data: any) => {
  const stageIdToNameMap: any = {};
  data?.pipelineWithStages?.forEach((pipeline: any) => {
    pipeline?.stages?.forEach((stage: any) => {
      stageIdToNameMap[stage?._id] = `${stage?.name} (${pipeline?.name})`;
    });
  });

  const columns = [
    {
      accessorFn: (row: any) => row?.date,
      id: 'date',
      cell: (info: any) => (
        <Typography
          variant="body4"
          fontWeight={500}
          color={theme?.blue?.dull_blue}
        >
          {info?.getValue()}
        </Typography>
      ),
      header: 'Date',
      isSortable: true,
    },
    ...data?.pipelineWithStages?.reduce((acc: any[], pipeline: any) => {
      pipeline?.stages?.forEach((stage: any) => {
        acc?.push({
          accessorFn: (row: any) => {
            const stageData = row?.stages?.find(
              (s: any) => s?.stageId === stage?._id,
            );
            return stageData || { deals: 0, total: 0 };
          },
          id: stage?._id,
          header: stageIdToNameMap[stage?._id],
          isSortable: true,
          cell: (info: any) => {
            const { total, deals } = info?.getValue();
            return (
              <Box display="flex" flexDirection="column">
                <Typography
                  variant="body4"
                  fontWeight={500}
                  color={theme?.blue?.dull_blue}
                >
                  {deals} deals
                </Typography>
                <Typography variant="body4" color={theme?.custom?.light}>
                  £{total?.toFixed(2)}
                </Typography>
              </Box>
            );
          },
        });
      });
      return acc;
    }, []),
  ];

  return columns;
};
