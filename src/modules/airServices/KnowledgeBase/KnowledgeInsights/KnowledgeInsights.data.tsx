import { Typography } from '@mui/material';

export const knowledgeInsightsColumnsDynamic = (router: any) => [
  {
    accessorFn: (row: any) => row?.title,
    id: 'title',
    header: `Insights`,
    cell: (info: any) => (
      <Typography
        variant="body2"
        fontWeight={'fontWeightMedium'}
        sx={{ cursor: 'pointer' }}
        onClick={() =>
          router?.push({
            pathname: router?.pathname,
            query: {
              knowledgeInsightId: info?.row?.original?._id,
            },
          })
        }
      >
        {info?.getValue() ?? '---'}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.views,
    id: 'views',
    header: 'Mentions',
    cell: (info: any) => info?.getValue() ?? '---',
  },
];
