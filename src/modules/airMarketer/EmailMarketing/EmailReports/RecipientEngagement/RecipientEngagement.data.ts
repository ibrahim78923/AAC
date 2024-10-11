import { calculatePercentage } from '@/utils';

export const receipentEngagementData = (emailWidgetsData: any) => {
  return [
    {
      id: 1,
      value: emailWidgetsData?.total ?? 0,
      default: true,
      heading: 'All Email',
    },
    {
      id: 3,
      value: calculatePercentage(
        emailWidgetsData?.send ?? 0,
        emailWidgetsData?.total,
      ),
      heading: 'Sent Rate',
    },
    {
      id: 8,
      value: calculatePercentage(
        emailWidgetsData?.delivered ?? 0,
        emailWidgetsData?.total,
      ),
      heading: 'Delivered Rate',
    },
    {
      id: 4,
      value: calculatePercentage(
        emailWidgetsData?.unread ?? 0,
        emailWidgetsData?.total,
      ),
      heading: 'Unread',
    },
    {
      id: 5,
      value: calculatePercentage(
        emailWidgetsData?.open ?? 0,
        emailWidgetsData?.total,
      ),
      heading: 'Open Rate',
    },
    {
      id: 6,
      value: calculatePercentage(
        emailWidgetsData?.click ?? 0,
        emailWidgetsData?.total,
      ),
      heading: 'Click Rate',
    },
    {
      id: 2,
      value: emailWidgetsData?.clicksCount ?? 0,
      default: true,
      heading: 'Total link Clicks',
    },
    {
      id: 7,
      value: calculatePercentage(
        emailWidgetsData?.complaint ?? 0,
        emailWidgetsData?.total,
      ),
      heading: 'Blocked Rate',
    },
  ];
};
