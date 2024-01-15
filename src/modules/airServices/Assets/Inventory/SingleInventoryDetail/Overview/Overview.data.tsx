export const overviewData = (inventoryData: any) => [
  {
    id: inventoryData?._id,
    heading: 'Inventory Details',
    detailsData: [
      {
        name: 'Asset Type',
        detail: inventoryData?.assetTypeDetails?.name ?? '---',
      },
      {
        name: 'Department',
        detail: inventoryData?.departmentDetails?.name ?? '---',
      },
      { name: 'End of Life', detail: inventoryData?.assetLifeExpiry ?? '---' },
      { name: ' Impact', detail: inventoryData?.impact ?? '---' },
      { name: 'Discovery Enabled', detail: inventoryData?.createdAt ?? '---' },
      {
        name: 'Location',
        detail: inventoryData?.locationDetails?.locationName ?? '---',
      },
    ],
  },
];
