import { KnowledgeInsightsTableRowI } from './KnowledgeInsights.interface';
import { TruncateText } from '@/components/TruncateText';

export const knowledgeInsightsColumnsDynamic = (setSelectedArticle: any) => [
  {
    accessorFn: (row: KnowledgeInsightsTableRowI) => row?.title,
    id: 'title',
    header: `Insights`,
    cell: (info: any) => (
      <TruncateText
        text={info?.getValue()}
        boxProps={{
          fontWeight: 'bold',
          sx: { cursor: 'pointer' },
          onClick: () => setSelectedArticle(info?.row?.original),
        }}
      />
    ),
  },
  {
    accessorFn: (row: KnowledgeInsightsTableRowI) => row?.views,
    id: 'views',
    header: 'Mentions',
    cell: (info: any) => info?.getValue() ?? '---',
  },
];
