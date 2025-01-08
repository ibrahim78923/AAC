import { fullName } from '@/utils/avatarUtils';
import { SingleViewArticleDataI } from '../SingleViewArticle.interface';
import { uiDateFormat } from '@/lib/date-time';
import { TooltipItemsCountChip } from '@/components/Chip/TooltipItemsCountChip';

export const sideData = (data: SingleViewArticleDataI) => {
  const keywords = !!data?.keywords?.length
    ? data?.keywords?.map((item: any, id: any) => ({
        label: item,
        _id: item + id,
      }))
    : [];

  return [
    {
      _id: 'details',
      heading: 'Details',
      details: [
        {
          _id: 'author',
          title: 'Author:',
          des: fullName(data?.author?.firstName, data?.author?.lastName),
        },
        {
          _id: 'created_on',
          title: 'Created  on:',
          des: uiDateFormat(data?.createdAt),
        },
        {
          _id: 'status',
          title: 'Status:',
          des: data?.status?.toLowerCase(),
        },
        {
          _id: 'folder',
          title: 'Folder:',
          des: data?.folder?.name,
        },
        {
          _id: 'keywords',
          title: 'Keywords:',
          des: <TooltipItemsCountChip data={keywords} truncateTextLength={6} />,
        },
      ],
    },
    {
      _id: 'analytics',
      heading: 'Analytics',
      details: [
        {
          _id: 'views',
          title: 'Views:',
          des: data?.views,
        },
        {
          _id: 'helpful',
          title: 'Helpful:',
          des: data?.helpfulYesCount,
        },
        {
          _id: 'not_helpful',
          title: 'Not helpful:',
          des: data?.helpfulNoCount,
        },
        {
          _id: 'inserted_tickets',
          title: 'Inserted tickets:',
          des: Array?.isArray(data?.insertedTickets)
            ? data?.insertedTickets?.length
            : 0,
        },
      ],
    },
  ];
};
