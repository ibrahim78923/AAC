export const columns: any = () => {
  return [
    {
      accessorFn: (row: any) => row?.title,
      id: 'title',
      cell: (info: any) => info?.getValue(),
      header: 'Title',
      isSortable: true,
    },

    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.comments,
      id: 'comments',
      isSortable: true,
      header: 'Comments',
      cell: (info: any) => info?.getValue(),
    },
  ];
};
