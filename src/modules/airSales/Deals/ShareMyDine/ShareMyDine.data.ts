import { UserAvatarImage } from '@/assets/images';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

export const ShareData = (data: any) => {
  return [
    {
      heading: 'Deal Owner',
      values: `${data?.dealOwner?.name ?? 'N/A'}`,
    },
    {
      heading: 'Amount',
      values: data?.amount ?? 'N/A',
    },
    {
      heading: 'Deal Stage',
      values: data?.dealStage ?? 'N/A',
    },
    {
      heading: 'Deal Pipeline',
      values: data?.dealPipeline ?? 'N/A',
    },
    {
      heading: 'Priority',
      values: data?.priority ?? 'N/A',
    },
    {
      heading: 'Close Date',
      values: data?.closeDate
        ? dayjs(data?.closeDate)?.format(DATE_FORMAT?.UI)
        : 'N/A',
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
