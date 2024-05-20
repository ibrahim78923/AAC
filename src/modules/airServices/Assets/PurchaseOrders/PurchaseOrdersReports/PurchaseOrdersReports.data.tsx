export const CardsData = () => {
  return {
    All: '10',
    Approved: '9',
    Rejected: '8',
    Pending: '7',
    Received: '6',
  };
};

export const purchaseOrdersColumns = [
  {
    accessorFn: (row: any) => row?.orderName,
    id: 'orderName',
    header: 'Order Name',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.vendor,
    id: 'vendor',
    header: 'Vendor',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    header: 'Status',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.totalCost,
    id: 'totalCost',
    header: 'Total Cost (£)',
    cell: (info: any) => info?.getValue(),
  },
];
