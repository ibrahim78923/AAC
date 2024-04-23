import { LOYALTY_REWARDS_TYPE } from '@/constants/strings';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

export const addRewardsData = [
  {
    id: 1,
    icon: CardGiftcardIcon,
    heading: 'Physical reward',
    text: 'This reward is only redeemable in store',
    color: 'primary.main',
    name: LOYALTY_REWARDS_TYPE?.PHYSICAL_REWARD,
  },
  {
    id: 2,
    icon: CardGiftcardIcon,
    heading: 'Digital reward',
    text: 'This reward is only redeemable in store',
    color: 'blue.light',
    name: LOYALTY_REWARDS_TYPE?.DIGITAL_REWARD,
  },
];
