import { FirstAidKitImage } from '@/assets/images';
import { SecondAidKitImage } from '@/assets/images';
import { ThirdAidKitImage } from '@/assets/images';
import { FourAidKitImage } from '@/assets/images';
import { FiveAidKitImage } from '@/assets/images';

export const ticketDashboardCardsData = (cardData: any) => [
  { id: 1, icon: FirstAidKitImage, count: cardData?.overDue, label: 'Overdue' },
  {
    id: 2,
    icon: SecondAidKitImage,
    count: cardData?.dueToday,
    label: 'Due Today',
  },
  {
    id: 3,
    icon: ThirdAidKitImage,
    count: cardData?.unResolved,
    label: 'Unresolved',
  },
  { id: 4, icon: FourAidKitImage, count: cardData?.onHold, label: 'OnHold' },
  {
    id: 5,
    icon: FiveAidKitImage,
    count: cardData?.openTicketsTotal,
    label: 'Open Tickets',
  },
];
