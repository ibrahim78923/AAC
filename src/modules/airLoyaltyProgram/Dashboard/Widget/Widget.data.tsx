import {
  AddToCartDynamicIcon,
  AddToCartMoneyDynamicIcon,
  EarnPointsDynamicIcon,
  PointsDynamicIcon,
  SyncDynamicIcon,
  TicketsDynamicIcon,
  TransactionDynamicIcon,
  UserDynamicIcon,
} from '@/assets/icons';

export const dashboardWidgetsCards = [
  {
    id: 1,
    avatar: SyncDynamicIcon,
    type: 'Total Points Spend',
    point: 5240,
  },
  {
    id: 2,
    avatar: EarnPointsDynamicIcon,
    type: 'Total Earn Points',
    point: 9963,
  },
  {
    id: 3,
    avatar: TransactionDynamicIcon,
    type: 'Total amount of loyalty transactions',
    point: `£ 520.21`,
  },
  {
    id: 4,
    avatar: AddToCartMoneyDynamicIcon,
    type: 'Total amount of Giftcard transactions',
    point: `£ 5240.21`,
  },
  {
    id: 5,
    avatar: AddToCartDynamicIcon,
    type: 'Number of Prepaid transactions',
    point: `£ 84`,
  },
  {
    id: 6,
    avatar: PointsDynamicIcon,
    type: 'Total amount of points given away',
    point: 13,
  },
  {
    id: 7,
    avatar: UserDynamicIcon,
    type: 'Users',
    point: 20,
  },
  {
    id: 8,
    avatar: TicketsDynamicIcon,
    type: 'Total Marketing Email Send',
    point: 4,
  },
];
