import { DATE_TIME_FORMAT } from '@/constants';
import { fullName } from '@/utils/avatarUtils';
import dayjs from 'dayjs';

export const printData = (data: any) => [
  {
    id: 3,
    heading: 'Impact',
    text: data?.data?.[0]?.impact ?? '-',
  },
  {
    id: 4,
    heading: 'Priority',
    text: data?.data?.[0]?.pirority ?? '-',
  },
  {
    id: 5,
    heading: 'status',
    text: data?.data?.[0]?.status ?? '-',
  },
  {
    id: 6,
    heading: 'Source',
    text: data?.data?.[0]?.source ?? '-',
  },
  {
    id: 7,
    heading: 'Type',
    text: data?.data?.[0]?.ticketType ?? '-',
  },
  {
    id: 9,
    heading: 'Agent',
    text:
      fullName(
        data?.data?.[0]?.agentDetails?.firstName,
        data?.data?.[0]?.agentDetails?.lastName,
      ) ?? '-',
  },

  {
    id: 10,
    heading: 'Department',
    text: data?.data?.[0]?.departmentDetails?.name ?? '-',
  },

  {
    id: 11,
    heading: 'Category',
    text: data?.data?.[0]?.categoryDetails?.categoryName ?? '-',
  },

  {
    id: 13,
    heading: 'Due by ',
    text:
      dayjs(data?.data[0]?.requesterDetails?.createdAt)?.format(
        DATE_TIME_FORMAT?.DDMYHMA,
      ) ?? '-',
  },
];
