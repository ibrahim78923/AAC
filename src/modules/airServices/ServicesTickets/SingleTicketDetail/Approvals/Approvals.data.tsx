import { AvatarImage } from '@/assets/images';
import { TICKET_APPROVALS } from '@/constants/strings';

export const requestApprovalsData = [
  {
    id: '1',
    imgSrc: AvatarImage,
    name: 'Sharemydine',
    date: 'Thu, 11 Mar 11:02 PM',
    description: `Hi Guys We have been facing issue when we try to reach email
      server 3 Hi Guys.`,
    status: TICKET_APPROVALS?.REQUESTED,
  },
  {
    id: '2',
    imgSrc: AvatarImage,
    date: 'Thu, 11 Mar 11:02 PM',
    name: 'Sharemydine',
    description: `Hi Guys We have been facing issue when we try to reach email
      server 3 Hi Guys.`,
    status: TICKET_APPROVALS?.APPROVE,
  },
  {
    id: '3',
    imgSrc: AvatarImage,
    name: 'Sharemydine',
    date: 'Thu, 11 Mar 11:02 PM',
    description: `Hi Guys We have been facing issue when we try to reach email
      server 3 Hi Guys.`,
    status: TICKET_APPROVALS?.CANCEL,
  },
  {
    id: '4',
    imgSrc: AvatarImage,
    name: 'Sharemydine',
    date: 'Thu, 11 Mar 11:02 PM',
    description: `Hi Guys We have been facing issue when we try to reach email
      server 3 Hi Guys.`,
    status: TICKET_APPROVALS?.REJECT,
  },
  {
    id: '5',
    imgSrc: AvatarImage,
    name: 'Sharemydine',
    date: 'Thu, 11 Mar 11:02 PM',
    description: `Hi Guys We have been facing issue when we try to reach email
      server 3 Hi Guys.`,
    status: TICKET_APPROVALS?.RECEIVED,
  },
];
