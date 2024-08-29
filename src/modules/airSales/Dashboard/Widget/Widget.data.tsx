export const widgetData = (widgetDetails: any) => {
  return [
    {
      dealName: 'Total Deals',
      totalDeals:
        widgetDetails?.totalDeals < 10
          ? `0${widgetDetails?.totalDeals}`
          : widgetDetails?.totalDeals,
    },
    {
      dealName: 'Open Deals',
      totalDeals:
        widgetDetails?.openDeals < 10
          ? `0${widgetDetails?.openDeals}`
          : widgetDetails?.openDeals,
    },
    {
      dealName: 'Team Goals',
      totalDeals:
        widgetDetails?.teamGoals < 10
          ? `0${widgetDetails?.teamGoals}`
          : widgetDetails?.teamGoals,
    },
    {
      dealName: 'Closed Won',
      totalDeals:
        widgetDetails?.closedWonDeals < 10
          ? `0${widgetDetails?.closedWonDeals}`
          : widgetDetails?.closedWonDeals,
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
