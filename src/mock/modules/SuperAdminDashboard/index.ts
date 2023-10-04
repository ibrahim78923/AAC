import { IcLinkImage, NotificationAvatarImage } from '@/assets/images';

export const MyAccountData = [
  {
    title: 'Sales Cart',
    role: 'sales',
    icon: IcLinkImage,
    children: [
      { company: 'Company A', websiteLink: 'company.airapple.com' },
      { company: 'Company B', websiteLink: 'company.airapple.com' },
      { company: 'Company C', websiteLink: 'company.airapple.com' },
    ],
  },
  {
    title: 'Marketing',
    role: 'marketing',
    icon: IcLinkImage,
    children: [
      { company: 'Company A', websiteLink: 'company.airapple.com' },
      { company: 'Company B', websiteLink: 'company.airapple.com' },
      { company: 'Company C', websiteLink: 'company.airapple.com' },
    ],
  },
  {
    title: 'Organization  Admin Portal',
    role: 'organization',
    icon: IcLinkImage,
  },
];

export const NotificationData = [
  {
    message: 'You have received a notification from Usman Saeed.',
    date: 'Dec 29 at 9:56 AM',
    icon: NotificationAvatarImage,
  },
  {
    message: 'You have received a notification from Usman Saeed.',
    date: 'Dec 29 at 9:56 AM',
    icon: NotificationAvatarImage,
  },
  {
    message: 'You have received a notification from Usman Saeed.',
    date: 'Dec 29 at 9:56 AM',
    icon: NotificationAvatarImage,
  },
];
