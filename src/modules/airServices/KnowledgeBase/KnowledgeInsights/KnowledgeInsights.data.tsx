import { truncateText } from '@/utils/avatarUtils';
import { Typography } from '@mui/material';

export const knowledgeInsightsColumnsDynamic = (setSelectedArticle: any) => [
  {
    accessorFn: (row: any) => row?.title,
    id: 'title',
    header: `Insights`,
    cell: (info: any) => (
      <Typography
        variant="body2"
        fontWeight={'fontWeightMedium'}
        sx={{ cursor: 'pointer' }}
        onClick={() => setSelectedArticle(info?.row?.original)}
      >
        {truncateText(info?.getValue() ?? '---')}
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
