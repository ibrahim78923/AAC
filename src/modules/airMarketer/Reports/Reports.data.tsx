import Image from 'next/image';

import { HandShakeImage } from '@/assets/images';

export const ReportsCardsData = [
  {
    icon: <Image src={HandShakeImage} alt="image" width={30} height={30} />,
    title: 'Leads CTAs',
    description: 'Overview CTAs Report',
    link: '/air-marketer/reports/leads',
  },
  {
    icon: <Image src={HandShakeImage} alt="image" width={30} height={30} />,
    title: 'Email Marketing',
    description: 'Overview Marketing Report',
    link: '/air-marketer/reports/email-marketing',
  },
  {
    title: "Ad's Campaigns",
    description: 'Overview Ads Reports',
    link: '/air-marketer/reports/add-campaigns',
    icon: <Image src={HandShakeImage} alt="image" width={30} height={30} />,
  },
];
