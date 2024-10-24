import ProfileNameIcon from '@/components/ProfileNameIcon';
import { ARRAY_INDEX } from '@/constants/strings';
import { Box, Typography } from '@mui/material';

export const totalColumns: any = (theme: any, data: any) => {
  const nameColumns = [
    {
      accessorFn: (row: any) =>
        row?.collaboratorDetails[ARRAY_INDEX?.ZERO].name,
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
  ];

  const totalTargetColumns = [
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

  let dynamicColumns: any[] = [];

  if (data?.forecastWithPipeline?.length) {
    dynamicColumns = data?.forecastWithPipeline?.map((pipeline: any) => {
      return {
        accessorFn: (row: any) =>
          row?.forecastCategories?.find(
            (category: any) => category?._id === pipeline?._id,
          ) || {},
        id: `${pipeline?.name}-${pipeline?.pipelinesDetails?.name}`,
        header: `${pipeline?.name} (${pipeline?.pipelinesDetails?.name})`,
        cell: (info: any) => (
          <Box display="flex" flexDirection="column">
            <Typography variant="body4" color={theme?.custom?.light}>
              {info?.getValue()?.numberOfDeals || 0} Deals
            </Typography>
            <Typography variant="body4" color={theme?.custom?.light}>
              £{info?.getValue()?.totalAmount || 0}
            </Typography>
          </Box>
        ),
      };
    });
  }

  return [...nameColumns, ...dynamicColumns, ...totalTargetColumns];
};

export const pipelineTableData = [
  {
    owner: 'Azeem Aslam',
  },
  {
    owner: 'Azeem Aslam',
  },
];

export const overtimeColumns = (data: any) => {
  const categories =
    data?.paginated?.goals?.flatMap((goal: any) => goal.categories) || [];
  const uniqueCategories = [
    ...new Set(categories?.map((category: any) => category?.name)),
  ];

  const columns = [
    {
      accessorFn: (row: any) => row?.date,
      id: 'date',
      cell: (info: any) => info.getValue(),
      header: 'Date',
      isSortable: true,
    },
  ];

  uniqueCategories?.forEach((categoryName) => {
    columns?.push({
      accessorFn: (row) => {
        const category = row?.categories?.find(
          (cat: any) => cat?.name === categoryName,
        );
        const numberOfDeals = category ? category?.numberOfDeals : 0;
        const totalAmount = category ? category?.totalAmount : 0;

        return `${numberOfDeals} deals\n£${totalAmount.toFixed(2)}`;
      },
      id: categoryName,
      cell: (info) => info?.getValue(),
      header: categoryName,
      isSortable: true,
    });
  });

  return columns;
};

export const comparisonColumns = (data: any) => {
  const categories =
    data?.paginated?.goals?.flatMap((goal: any) => goal.categories) || [];
  const uniqueCategories = [
    ...new Set(categories?.map((category: any) => category?.name)),
  ];

  const columns = [
    {
      accessorFn: (row: any) => row?.date,
      id: 'date',
      cell: (info: any) => info.getValue(),
      header: 'Date',
      isSortable: true,
    },
  ];

  uniqueCategories?.forEach((categoryName) => {
    columns?.push({
      accessorFn: (row) => {
        const category = row?.categories?.find(
          (cat: any) => cat?.name === categoryName,
        );
        const numberOfDeals = category ? category?.numberOfDeals : 0;
        const totalAmount = category ? category?.totalAmount : 0;

        return `${numberOfDeals} deals\n£${totalAmount.toFixed(2)}`;
      },
      id: categoryName,
      cell: (info) => info?.getValue(),
      header: categoryName,
      isSortable: true,
    });
  });

  return columns;
};
