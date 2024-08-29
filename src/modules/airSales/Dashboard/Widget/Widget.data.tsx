export const widgetData = (widgetDetails: any) => {
  return [
    {
      dealName: 'Total Deals',
      totalDeals: widgetDetails?.totalDeals ?? 0,
    },
    {
      dealName: 'Open Deals',
      totalDeals: widgetDetails?.openDeals ?? 0,
    },
    {
      dealName: 'Team Goals',
      totalDeals: widgetDetails?.teamGoals ?? 0,
    },
    {
      dealName: 'Closed Won',
      totalDeals: widgetDetails?.closedWonDeals ?? 0,
    },
    {
      dealName: 'Published Quotes',
      totalDeals:
        widgetDetails?.totalPublishedQuotes < 10
          ? `0${widgetDetails?.totalPublishedQuotes}`
          : widgetDetails?.totalPublishedQuotes,
    },
  ];
};
