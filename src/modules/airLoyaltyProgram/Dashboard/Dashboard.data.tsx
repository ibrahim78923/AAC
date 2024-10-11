import {
  TotalAmountGiftCardIcon,
  TotalAmountRedeemedIcon,
  TotalAmountRewardsIcon,
  TotalConsumerIcon,
  TotalPointsEarnedIcon,
  TotalPointsRedeemedIcon,
} from '@/assets/icons';

export const getWidgetsDataArray = () => [
  { _id: 1, avatar: TotalConsumerIcon, title: 'Total Consumers', count: '500' },
  {
    _id: 2,
    avatar: TotalPointsEarnedIcon,
    title: 'Total points Earned',
    count: '9963',
  },
  {
    _id: 3,
    avatar: TotalPointsRedeemedIcon,
    title: 'Total points redeemed',
    count: '5240',
  },
  {
    _id: 4,
    avatar: TotalAmountRedeemedIcon,
    title: 'Total amount of Redeemed points',
    count: '£ 6240.21',
  },
  {
    _id: 5,
    avatar: TotalAmountRewardsIcon,
    title: 'Total amount of  redeemed rewards',
    count: '£ 540.21',
  },
  {
    _id: 6,
    avatar: TotalAmountRewardsIcon,
    title: 'Total amount of vouchers discount',
    count: '£ 540.21',
  },
  {
    _id: 7,
    avatar: TotalAmountGiftCardIcon,
    title: 'Total  amount gift cards transactions',
    count: '£ 540.21',
  },
  { _id: 8, avatar: TotalConsumerIcon, title: 'Total Tiers', count: '05' },
];
