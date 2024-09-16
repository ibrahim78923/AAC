import { DATE_TIME_FORMAT } from '@/constants';
import { fullName } from '@/utils/avatarUtils';
import dayjs from 'dayjs';

export const printData = (singleTicketDetail: any) => [
  {
    id: 1,
    heading: 'Impact',
    text: singleTicketDetail?.impact ?? '-',
  },
  {
    id: 2,
    heading: 'Priority',
    text: singleTicketDetail?.pirority ?? '-',
  },
  {
    id: 3,
    heading: 'status',
    text: singleTicketDetail?.status ?? '-',
  },
  {
    id: 4,
    heading: 'Source',
    text: singleTicketDetail?.source ?? '-',
  },
  {
    id: 5,
    heading: 'Type',
    text: singleTicketDetail?.ticketType ?? '-',
  },
  {
    id: 6,
    heading: 'Agent',
    text:
      fullName(
        singleTicketDetail?.agentDetails?.firstName,
        singleTicketDetail?.agentDetails?.lastName,
      ) ?? '-',
  },

  {
    id: 7,
    heading: 'Department',
    text: singleTicketDetail?.departmentDetails?.name ?? '-',
  },

  {
    id: 8,
    heading: 'Category',
    text: singleTicketDetail?.categoryDetails?.categoryName ?? '-',
  },

  {
    id: 9,
    heading: 'Due by ',
    text:
      dayjs(singleTicketDetail?.requesterDetails?.createdAt)?.format(
        DATE_TIME_FORMAT?.DDMYHMA,
      ) ?? '-',
  },
];
