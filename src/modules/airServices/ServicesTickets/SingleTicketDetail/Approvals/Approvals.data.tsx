import { AvatarImage } from '@/assets/images';
import { TICKET_APPROVALS } from '@/constants/strings';

export const requestApprovalsData = [
  {
    _id: '1',
    imgSrc: AvatarImage,
    name: 'Sharemydine',
    date: 'Thu, 11 Mar 11:02 PM',
    description: `Hi Guys We have been facing issue when we try to reach email
      server 3 Hi Guys.`,
    approvalStatus: TICKET_APPROVALS?.REQUESTED,
  },
  {
    _id: '12',
    imgSrc: AvatarImage,
    name: 'pending',
    date: 'Thu, 11 Mar 11:02 PM',
    description: `<p> Hi We have been facing issue when we try to reach email
      server 3 Hi Guys </p>`,
    approvalStatus: TICKET_APPROVALS?.PENDING,
  },
  {
    _id: '2',
    imgSrc: AvatarImage,
    date: 'Thu, 11 Mar 11:02 PM',
    name: 'Sharemydine',
    description: `Hi Guys We have been facing issue when we try to reach email
      server 3 Hi Guys.`,
    approvalStatus: TICKET_APPROVALS?.APPROVE,
  },
  {
    _id: '3',
    imgSrc: AvatarImage,
    name: 'Sharemydine',
    date: 'Thu, 11 Mar 11:02 PM',
    description: `Hi Guys We have been facing issue when we try to reach email
      server 3 Hi Guys.`,
    approvalStatus: TICKET_APPROVALS?.CANCEL,
  },
  {
    _id: '4',
    imgSrc: AvatarImage,
    name: 'Sharemydine',
    date: 'Thu, 11 Mar 11:02 PM',
    description: `Hi Guys We have been facing issue when we try to reach email
      server 3 Hi Guys.`,
    approvalStatus: TICKET_APPROVALS?.REJECT,
  },
  {
    _id: '5',
    imgSrc: AvatarImage,
    name: 'Sharemydine',
    date: 'Thu, 11 Mar 11:02 PM',
    description: `Hi Guys We have been facing issue when we try to reach email
      server 3 Hi Guys.`,
    approvalStatus: TICKET_APPROVALS?.RECEIVED,
  },
];
