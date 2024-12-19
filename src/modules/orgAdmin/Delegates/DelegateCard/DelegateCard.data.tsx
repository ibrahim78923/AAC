import {
  ActiveUserImage,
  InActiveUserImage,
  PoundImage,
  TotalUserImage,
} from '@/assets/images';
import { indexNumbers } from '@/constants';

export const delegateCardArr: any = (cardData: any) => [
  {
    icon: PoundImage,
    title: 'Total Earnings',
    totalMember: cardData?.totalEarning ? `£ ${cardData?.totalEarning}` : '00',
  },
  {
    icon: TotalUserImage,
    title: 'Total Members',
    totalMember: cardData?.activeUsers
      ? cardData?.activeUsers + cardData?.inactiveUsers < indexNumbers?.TEN
        ? `0${cardData?.activeUsers + cardData?.inactiveUsers}`
        : cardData?.activeUsers + cardData?.inactiveUsers
      : '00',
  },
  {
    icon: ActiveUserImage,
    title: 'Active Members',
    totalMember: cardData?.activeUsers
      ? cardData?.activeUsers < indexNumbers?.TEN
        ? `0${cardData?.activeUsers}`
        : cardData?.activeUsers
      : '00',
  },
  {
    icon: InActiveUserImage,
    title: 'Inactive Members',
    totalMember: cardData?.inactiveUsers
      ? cardData?.inactiveUsers < indexNumbers?.TEN
        ? `0${cardData?.inactiveUsers}`
        : cardData?.inactiveUsers
      : '00',
  },
];
