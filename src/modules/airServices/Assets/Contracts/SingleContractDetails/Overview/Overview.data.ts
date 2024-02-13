export const overviewData = (contractData: any, contractItemData: any) => [
  {
    id: '1',
    heading: 'General Details',
    detailsData: [
      { name: 'Contact Number', detail: contractData?.contactNumber ?? '--' },
      { name: 'Vendor', detail: contractData?.vendor ?? '--' },
      { name: 'Type', detail: contractData?.type ?? '--' },
      { name: 'Status', detail: contractData?.status ?? '--' },
      { name: 'Cost', detail: contractData?.cost ?? '--' },
      { name: 'Approver', detail: contractData?.approver ?? '--' },
      {
        name: 'Validity',
        detail:
          `${contractData?.startDate} to ${contractData?.endDate}` ?? '--',
      },
    ],
  },
  {
    id: '2',
    heading: 'Items and Cost Details',
    detailsData: [
      { name: 'Software', detail: contractItemData?.serviceName ?? '--' },
      { name: 'Pricing Model', detail: contractItemData?.priceModel ?? '--' },
      { name: 'Cost', detail: contractItemData?.cost ?? '--' },
      { name: 'Count', detail: contractItemData?.count ?? '--' },
      { name: 'Comments', detail: contractItemData?.comments ?? '--' },
      { name: 'Billing Cycle', detail: contractData?.billingCycle ?? '--' },
    ],
  },
  {
    id: '3',
    heading: 'Software License Properties',
    detailsData: [
      { name: 'License Type', detail: contractData?.licenseType ?? '--' },
      { name: 'License Key', detail: contractData?.licenseKey ?? '--' },
    ],
  },
];
