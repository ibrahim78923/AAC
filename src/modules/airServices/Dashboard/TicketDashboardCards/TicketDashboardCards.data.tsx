import FirstAidKit from '@/assets/images/modules/airServices/Tickets/FirstAidKit.png';
import SecondAidKit from '@/assets/images/modules/airServices/Tickets/SecondAidKit.png';
import ThirdAidKit from '@/assets/images/modules/airServices/Tickets/ThirdAidKit.png';
import FourAidKit from '@/assets/images/modules/airServices/Tickets/FourAidKit.png';
import FifthAidKit from '@/assets/images/modules/airServices/Tickets/FiveAidKit.png';

const ticketDashboardCardsData = [
  { icon: FirstAidKit, count: '15', label: 'Overdue' },
  { icon: SecondAidKit, count: '06', label: 'Due Today' },
  { icon: ThirdAidKit, count: '13', label: 'Unresolved' },
  { icon: FourAidKit, count: '04', label: 'OnHold' },
  { icon: FifthAidKit, count: '24', label: 'Open Tickets' },
];

export default ticketDashboardCardsData;
