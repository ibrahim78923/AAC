export const CardsData = () => {
  return {
    'Total Assets': '10',
    Hardware: '9',
    'IT Services': '8',
    'Backup Services': '7',
    Utilizable: '6',
  };
};

export const inventoryColumns = [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    header: 'Name',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.location,
    id: 'location',
    header: 'Location',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.usedBy,
    id: 'usedBy',
    header: 'Used By',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.assetLikeExpireOn,
    id: 'assetLikeExpireOn',
    header: 'Asset Like Expire On',
    cell: (info: any) => info?.getValue(),
  },
];
