import { FirstAidKitImage } from '@/assets/images';
import { SecondAidKitImage } from '@/assets/images';
import { ThirdAidKitImage } from '@/assets/images';
import { FourAidKitImage } from '@/assets/images';
import { FiveAidKitImage } from '@/assets/images';

export const ticketDashboardCardsData = [
  { id: 1, icon: FirstAidKitImage, count: '15', label: 'Overdue' },
  { id: 2, icon: SecondAidKitImage, count: '06', label: 'Due Today' },
  { id: 3, icon: ThirdAidKitImage, count: '13', label: 'Unresolved' },
  { id: 4, icon: FourAidKitImage, count: '04', label: 'OnHold' },
  { id: 5, icon: FiveAidKitImage, count: '24', label: 'Open Tickets' },
];
