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
    approvalStatus: TICKET_APPROVALS?.REQUESTED,
  },
  {
    id: '12',
    imgSrc: AvatarImage,
    name: 'pending',
    date: 'Thu, 11 Mar 11:02 PM',
    description: `<p> Hi We have been facing issue when we try to reach email
      server 3 Hi Guys </p>`,
    approvalStatus: TICKET_APPROVALS?.PENDING,
  },
  {
    id: '2',
    imgSrc: AvatarImage,
    date: 'Thu, 11 Mar 11:02 PM',
    name: 'Sharemydine',
    description: `Hi Guys We have been facing issue when we try to reach email
      server 3 Hi Guys.`,
    approvalStatus: TICKET_APPROVALS?.APPROVE,
  },
  {
    id: '3',
    imgSrc: AvatarImage,
    name: 'Sharemydine',
    date: 'Thu, 11 Mar 11:02 PM',
    description: `Hi Guys We have been facing issue when we try to reach email
      server 3 Hi Guys.`,
    approvalStatus: TICKET_APPROVALS?.CANCEL,
  },
  {
    id: '4',
    imgSrc: AvatarImage,
    name: 'Sharemydine',
    date: 'Thu, 11 Mar 11:02 PM',
    description: `Hi Guys We have been facing issue when we try to reach email
      server 3 Hi Guys.`,
    approvalStatus: TICKET_APPROVALS?.REJECT,
  },
  {
    id: '5',
    imgSrc: AvatarImage,
    name: 'Sharemydine',
    date: 'Thu, 11 Mar 11:02 PM',
    description: `Hi Guys We have been facing issue when we try to reach email
      server 3 Hi Guys.`,
    approvalStatus: TICKET_APPROVALS?.RECEIVED,
  },
];
