export const postPerformanceColumn: any = [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    header: 'Name',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.postOneLikes,
    id: 'postOneLikes',
    header: 'postOneLikes',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.postTwoLikes,
    id: 'postTwoLikes',
    header: 'postTwoLikes',
    cell: (info: any) => info?.getValue(),
  },
];

export const postPerformanceData: any = [
  {
    name: 'Likes',
    postOneLikes: '0',
    postTwoLikes: '1',
  },
  {
    name: 'Shares',
    postOneLikes: '1',
    postTwoLikes: '2',
  },
  {
    name: 'Network Clicks',
    postOneLikes: '1',
    postTwoLikes: 'N/A',
  },
  {
    name: 'Reactions',
    postOneLikes: 'N/A',
    postTwoLikes: 'N/A',
  },
];

export const videoPerformanceColumn: any = [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    header: 'Name',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.postOneViews,
    id: 'postOneViews',
    header: 'postOneLikes',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.postTwoViews,
    id: 'postTwoViews',
    header: 'postTwoLikes',
    cell: (info: any) => info?.getValue(),
  },
];

export const videoPerformanceData: any = [
  {
    name: 'Video 10 Second Views',
    postOneViews: 'N/A',
    postTwoViews: 'N/A',
  },
  {
    name: 'Video Views',
    postOneViews: 'N/A',
    postTwoViews: 'N/A',
  },
];
