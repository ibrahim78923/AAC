export const EmailCardsData = (emailWidgetsData: any) => {
  return [
    {
      reportView: 'Total Send',
      Values: emailWidgetsData?.send ?? 0,
    },
    {
      reportView: 'Total Activity',
      Values: emailWidgetsData?.total ?? 0,
    },
    {
      reportView: 'Total Bounced',
      Values: emailWidgetsData?.bounce ?? 0,
    },
    {
      reportView: 'Total Unsubscribe',
      Values: emailWidgetsData?.unsubscribe ?? 0,
    },
  ];
};

export const EmailMarketingRateCard = [
  {
    heading: 'Open Rate',
    Progress: 65,
    precentage: '65%',
    rates: [
      {
        newHeading: 'Successfully Deliveries',
        value: '65',
      },
      {
        newHeading: 'Unique Open Rates',
        value: '66.6%',
      },
      {
        newHeading: 'Last Open Rates',
        value: '12.3%',
      },
    ],
  },
  {
    heading: 'Open Rate',
    Progress: 50,
    precentage: '50%',
    rates: [
      {
        newHeading: 'Total Clicks',
        value: '65',
      },
      {
        newHeading: 'Unique Click Rates',
        value: '66.6%',
      },
      {
        newHeading: 'Unsubscribe Rates',
        value: '12.3%',
      },
    ],
  },
];
