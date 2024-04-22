import { LOYALTY_REWARDS_TYPE } from '@/constants/strings';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

export const addRewardsData = (palette: any) => [
  {
    id: 1,
    icon: CardGiftcardIcon,
    heading: 'A Physical reward',
    text: 'This Reward is only redeemable in store',
    color: palette?.primary?.main,
    name: LOYALTY_REWARDS_TYPE?.PHYSICAL_REWARD,
  },
  {
    id: 2,
    icon: CardGiftcardIcon,
    heading: 'A digital reward',
    text: 'This Reward is only redeemable in store',
    color: palette?.blue?.light,
    name: LOYALTY_REWARDS_TYPE?.DIGITAL_REWARD,
  },
];
