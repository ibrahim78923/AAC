import Image from 'next/image';

import { AIR_MARKETER } from '@/routesConstants/paths';

import { HandShakeImage } from '@/assets/images';

export const ReportsCardsData = [
  {
    icon: <Image src={HandShakeImage} alt="image" width={30} height={30} />,
    title: 'Leads CTAs',
    description: 'Overview CTAs Report',
    link: AIR_MARKETER?.REPORTS_LEADS,
  },
  {
    icon: <Image src={HandShakeImage} alt="image" width={30} height={30} />,
    title: 'Email Marketing',
    description: 'Overview Marketing Report',
    link: AIR_MARKETER?.REPORTS_EMAIL,
  },
  {
    title: "Ad's Campaigns",
    description: 'Overview Ads Reports',
    link: AIR_MARKETER?.REPORTS_CAMPAIGNS,
    icon: <Image src={HandShakeImage} alt="image" width={30} height={30} />,
  },
];
