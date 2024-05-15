import { Avatar, Box, Typography } from '@mui/material';

export const totalColumns: any = (theme: any) => [
  {
    accessorFn: (row: any) => row?.owner,
    id: 'owner',
    cell: (info: any) => (
      <Box display="flex" gap={1} alignItems="center">
        <Avatar
          alt="Remy Sharp"
          sx={{ bgcolor: theme?.grey[900], fontSize: '12px' }}
        >
          AA
        </Avatar>
        <Box display="flex" flexDirection="column">
          <Typography
            variant="body4"
            fontWeight={500}
            color={theme?.blue?.dull_blue}
          >
            {info?.getValue()}
          </Typography>
          <Typography variant="body4" color={theme?.custom?.light}>
            @azeem
          </Typography>
        </Box>
      </Box>
    ),
    header: 'Owner',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.new,
    id: 'new',
    isSortable: true,
    header: 'New',
    cell: () => (
      <Box display="flex" flexDirection="column">
        <Typography
          variant="body4"
          fontWeight={500}
          color={theme?.blue?.dull_blue}
        >
          0 deals
        </Typography>
        <Typography variant="body4" color={theme?.custom?.light}>
          £0.00
        </Typography>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.followUp,
    id: 'followUp',
    isSortable: true,
    header: 'Follow up',
    cell: () => (
      <Box display="flex" flexDirection="column">
        <Typography
          variant="body4"
          fontWeight={500}
          color={theme?.blue?.dull_blue}
        >
          0 deals
        </Typography>
        <Typography variant="body4" color={theme?.custom?.light}>
          £0.00
        </Typography>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.underReview,
    id: 'underReview',
    isSortable: true,
    header: 'Under review',
    cell: () => (
      <Box display="flex" flexDirection="column">
        <Typography
          variant="body4"
          fontWeight={500}
          color={theme?.blue?.dull_blue}
        >
          0 deals
        </Typography>
        <Typography variant="body4" color={theme?.custom?.light}>
          £0.00
        </Typography>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.demo,
    id: 'demo',
    isSortable: true,
    header: 'Demo',
    cell: () => (
      <Box display="flex" flexDirection="column">
        <Typography
          variant="body4"
          fontWeight={500}
          color={theme?.blue?.dull_blue}
        >
          0 deals
        </Typography>
        <Typography variant="body4" color={theme?.custom?.light}>
          £0.00
        </Typography>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.negotiation,
    id: 'negotiation',
    isSortable: true,
    header: 'Negotiation',
    cell: () => (
      <Box display="flex" flexDirection="column">
        <Typography
          variant="body4"
          fontWeight={500}
          color={theme?.blue?.dull_blue}
        >
          0 deals
        </Typography>
        <Typography variant="body4" color={theme?.custom?.light}>
          {' '}
          £3,200.00
        </Typography>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.won,
    id: 'won',
    isSortable: true,
    header: 'Won',
    cell: () => (
      <Typography
        variant="body4"
        fontWeight={500}
        color={theme?.blue?.dull_blue}
      >
        Weekly
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.totalRevenueGoal,
    id: 'totalRevenueGoal',
    isSortable: true,
    header: 'Total revenue goal',
    cell: () => (
      <Typography variant="body4" color={theme?.custom?.light}>
        £0.00
      </Typography>
    ),
  },
];

export const pipelineTableData = [
  {
    owner: 'Azeem Aslam',
  },
  {
    owner: 'Azeem Aslam',
  },
];

export const overtimeColumns: any = (theme: any) => [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    cell: () => (
      <Typography
        variant="body4"
        fontWeight={500}
        color={theme?.blue?.dull_blue}
      >
        FollowUp
      </Typography>
    ),
    header: 'Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.one,
    id: 'one',
    isSortable: true,
    header: '5/1/2023',
    cell: () => (
      <Box display="flex" flexDirection="column">
        <Typography
          variant="body4"
          fontWeight={500}
          color={theme?.blue?.dull_blue}
        >
          0 deals
        </Typography>
        <Typography variant="body4" color={theme?.custom?.light}>
          £0.00
        </Typography>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.two,
    id: 'two',
    isSortable: true,
    header: '5/2/2023',
    cell: () => (
      <Box display="flex" flexDirection="column">
        <Typography
          variant="body4"
          fontWeight={500}
          color={theme?.blue?.dull_blue}
        >
          0 deals
        </Typography>
        <Typography variant="body4" color={theme?.custom?.light}>
          £0.00
        </Typography>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.three,
    id: 'three',
    isSortable: true,
    header: '5/3/2023',
    cell: () => (
      <Box display="flex" flexDirection="column">
        <Typography
          variant="body4"
          fontWeight={500}
          color={theme?.blue?.dull_blue}
        >
          0 deals
        </Typography>
        <Typography variant="body4" color={theme?.custom?.light}>
          £0.00
        </Typography>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.four,
    id: 'four',
    isSortable: true,
    header: '5/4/2023',
    cell: () => (
      <Box display="flex" flexDirection="column">
        <Typography
          variant="body4"
          fontWeight={500}
          color={theme?.blue?.dull_blue}
        >
          0 deals
        </Typography>
        <Typography variant="body4" color={theme?.custom?.light}>
          £0.00
        </Typography>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.five,
    id: 'five',
    isSortable: true,
    header: '5/5/2023',
    cell: () => (
      <Box display="flex" flexDirection="column">
        <Typography
          variant="body4"
          fontWeight={500}
          color={theme?.blue?.dull_blue}
        >
          0 deals
        </Typography>
        <Typography variant="body4" color={theme?.custom?.light}>
          {' '}
          £3,200.00
        </Typography>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.six,
    id: 'six',
    isSortable: true,
    header: '5/6/2023',
    cell: () => (
      <Box display="flex" flexDirection="column">
        <Typography
          variant="body4"
          fontWeight={500}
          color={theme?.blue?.dull_blue}
        >
          0 deals
        </Typography>
        <Typography variant="body4" color={theme?.custom?.light}>
          {' '}
          £3,200.00
        </Typography>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.seven,
    id: 'seven',
    isSortable: true,
    header: '5/7/2023',
    cell: () => (
      <Box display="flex" flexDirection="column">
        <Typography
          variant="body4"
          fontWeight={500}
          color={theme?.blue?.dull_blue}
        >
          0 deals
        </Typography>
        <Typography variant="body4" color={theme?.custom?.light}>
          {' '}
          £3,200.00
        </Typography>
      </Box>
    ),
  },
];

export const comparisonColumns: any = (theme: any) => [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    cell: () => (
      <Typography
        variant="body4"
        fontWeight={500}
        color={theme?.blue?.dull_blue}
      >
        New
      </Typography>
    ),
    header: 'Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.one,
    id: 'one',
    isSortable: true,
    header: 'Jan 2023',
    cell: () => (
      <Box display="flex" flexDirection="column">
        <Typography
          variant="body4"
          fontWeight={500}
          color={theme?.blue?.dull_blue}
        >
          0 deals
        </Typography>
        <Typography variant="body4" color={theme?.custom?.light}>
          £0.00
        </Typography>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.two,
    id: 'two',
    isSortable: true,
    header: 'Feb 2023',
    cell: () => (
      <Box display="flex" flexDirection="column">
        <Typography
          variant="body4"
          fontWeight={500}
          color={theme?.blue?.dull_blue}
        >
          0 deals
        </Typography>
        <Typography variant="body4" color={theme?.custom?.light}>
          £0.00
        </Typography>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.three,
    id: 'three',
    isSortable: true,
    header: 'Mar 2023',
    cell: () => (
      <Box display="flex" flexDirection="column">
        <Typography
          variant="body4"
          fontWeight={500}
          color={theme?.blue?.dull_blue}
        >
          0 deals
        </Typography>
        <Typography variant="body4" color={theme?.custom?.light}>
          £0.00
        </Typography>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.four,
    id: 'four',
    isSortable: true,
    header: 'April 2023',
    cell: () => (
      <Box display="flex" flexDirection="column">
        <Typography
          variant="body4"
          fontWeight={500}
          color={theme?.blue?.dull_blue}
        >
          0 deals
        </Typography>
        <Typography variant="body4" color={theme?.custom?.light}>
          £0.00
        </Typography>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.five,
    id: 'five',
    isSortable: true,
    header: 'May 2023',
    cell: () => (
      <Box display="flex" flexDirection="column">
        <Typography
          variant="body4"
          fontWeight={500}
          color={theme?.blue?.dull_blue}
        >
          0 deals
        </Typography>
        <Typography variant="body4" color={theme?.custom?.light}>
          {' '}
          £3,200.00
        </Typography>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.six,
    id: 'six',
    isSortable: true,
    header: 'June 2023',
    cell: () => (
      <Box display="flex" flexDirection="column">
        <Typography
          variant="body4"
          fontWeight={500}
          color={theme?.blue?.dull_blue}
        >
          0 deals
        </Typography>
        <Typography variant="body4" color={theme?.custom?.light}>
          {' '}
          £3,200.00
        </Typography>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.seven,
    id: 'seven',
    isSortable: true,
    header: 'July 2023',
    cell: () => (
      <Box display="flex" flexDirection="column">
        <Typography
          variant="body4"
          fontWeight={500}
          color={theme?.blue?.dull_blue}
        >
          0 deals
        </Typography>
        <Typography variant="body4" color={theme?.custom?.light}>
          {' '}
          £3,200.00
        </Typography>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.eight,
    id: 'eight',
    isSortable: true,
    header: 'Aug 2023',
    cell: () => (
      <Box display="flex" flexDirection="column">
        <Typography
          variant="body4"
          fontWeight={500}
          color={theme?.blue?.dull_blue}
        >
          0 deals
        </Typography>
        <Typography variant="body4" color={theme?.custom?.light}>
          {' '}
          £3,200.00
        </Typography>
      </Box>
    ),
  },
];
