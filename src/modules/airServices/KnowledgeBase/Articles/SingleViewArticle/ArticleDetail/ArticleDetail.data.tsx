import { DATE_FORMAT } from '@/constants';
import { fullName } from '@/utils/avatarUtils';
import dayjs from 'dayjs';
import { SingleViewArticleDataI } from '../SingleViewArticle.interface';

export const sideData = (data: SingleViewArticleDataI) => {
  return [
    {
      heading: 'Details',
      details: [
        {
          title: 'Author:',
          des: fullName(data?.author?.firstName, data?.author?.lastName),
        },
        {
          title: 'Created  on:',
          des: dayjs(data?.createdAt)?.format(DATE_FORMAT?.UI),
        },
        {
          title: 'Status:',
          des: data?.status,
        },
        {
          title: 'Folder:',
          des: data?.folder?.name,
        },
        {
          title: 'Keywords:',
        },
      ],
      keyword: Array?.isArray(data?.keywords)
        ? data?.keywords
        : [data?.keywords],
    },
    {
      heading: 'Analytics',
      details: [
        {
          title: 'Views:',
          des: data?.views,
        },
        {
          title: 'Helpful:',
          des: data?.helpfulYesCount,
        },
        {
          title: 'Not helpful:',
          des: data?.helpfulNoCount,
        },
        {
          title: 'Inserted tickets:',
          des: Array?.isArray(data?.insertedTickets?.length)
            ? data?.insertedTickets?.length
            : 0,
        },
      ],
    },
  ];
};
