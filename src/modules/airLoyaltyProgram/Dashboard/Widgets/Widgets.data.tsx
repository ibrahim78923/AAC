import {
  TotalAmountGiftCardIcon,
  TotalAmountRedeemedIcon,
  TotalAmountRewardsIcon,
  TotalConsumerIcon,
  TotalPointsEarnedIcon,
  TotalPointsRedeemedIcon,
} from '@/assets/icons';

export const getWidgetsDataArray = (data: { [key: string]: number }) => [
  {
    _id: 1,
    avatar: TotalConsumerIcon,
    title: 'Total Consumers',
    count: data?.totalConsumers,
  },
  {
    _id: 2,
    avatar: TotalPointsEarnedIcon,
    title: 'Total points Earned',
    count: data?.totalPointsEarned,
  },
  {
    _id: 3,
    avatar: TotalPointsRedeemedIcon,
    title: 'Total points redeemed',
    count: data?.totalPointsRedeemed,
  },
  {
    _id: 4,
    avatar: TotalAmountRedeemedIcon,
    title: 'Total amount of Redeemed points',
    count: `£ ${data?.totalAmountRedeemedPoints ?? 0}`,
  },
  {
    _id: 5,
    avatar: TotalAmountRewardsIcon,
    title: 'Total amount of  redeemed rewards',
    count: `£ ${data?.totalAmountRedeemedReward ?? 0}`,
  },
  {
    _id: 6,
    avatar: TotalAmountRewardsIcon,
    title: 'Total amount of vouchers discount',
    count: `£ ${data?.totalAmountVoucherDiscount ?? 0}`,
  },
  {
    _id: 7,
    avatar: TotalAmountGiftCardIcon,
    title: 'Total  amount gift cards transactions',
    count: `£ ${data?.totalAmountGiftCardTransaction ?? 0}`,
  },
  {
    _id: 8,
    avatar: TotalConsumerIcon,
    title: 'Total Tiers',
    count: data?.totalTiers,
  },
];
