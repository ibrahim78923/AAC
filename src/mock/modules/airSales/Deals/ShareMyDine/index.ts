import { UserAvatarImage } from '@/assets/images';
import dayjs from 'dayjs';

export const ShareData = (data: any) => {
  return [
    {
      heading: 'Deal Owner',
      values: `${data?.user?.firstName} ${data?.user?.firstName}`,
    },
    { heading: 'Amount', values: data?.amount },
    { heading: 'Deal Stage', values: data?.stage?.name },
    { heading: 'Deal Pipeline', values: data?.pipline?.name },
    { heading: 'Priority', values: data?.priority },
    {
      heading: 'Close Date',
      values: dayjs(data?.closeDate)?.format('YYYY/MM/DD'),
    },
  ];
};
export const ShareAccordianData = [
  { number: '01', heading: 'Contact' },
  { number: '01', heading: 'Companies' },
  { number: '0', heading: 'Tickets' },
  { number: '01', heading: 'Products' },
  { number: '01', heading: 'Quotes' },
  { number: '0', heading: 'Attachments' },
];

export const AccordianDetailsData = [
  {
    img: UserAvatarImage,
    name: 'Olivia Rhye',
    email: 'Olivia@gmail.com',
    number: '+44 23669252',
  },
];
