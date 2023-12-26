export const overviewDataArray = (data: any) => [
  { id: 1, name: 'Contact Name', detail: data?.contactName },
  { id: 2, name: 'Phone', detail: data?.phone },
  { id: 3, name: 'Mobile', detail: data?.mobile },
  { id: 4, name: 'Email', detail: data?.email },
  { id: 5, name: 'Description', detail: data?.description },
  { id: 6, name: 'Address', detail: data?.address },
  { id: 7, name: 'Country', detail: data?.country },
  { id: 8, name: 'State', detail: data?.state },
  { id: 9, name: 'City', detail: data?.city },
  { id: 10, name: 'Zip Code', detail: data?.zipCode },
];
