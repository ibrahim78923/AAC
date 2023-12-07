export const dataAdCampaigns: any = [
  {
    id: 1,

    name: `Campaign Name`,
    contacts: 'Campaign Owner',
    clicks: 0,
    spent: 0,
  },
  {
    id: 2,
    name: `Campaign Name`,

    contacts: 'Campaign Owner',
    clicks: 0,
    spent: 0,
  },
];

export const dataCta: any = [
  {
    id: 1,
    name: `CTA name`,
    views: 'CTA views',
    clicks: 'CTA clicks',
  },
  {
    id: 2,
    name: `CTA name`,
    views: 'CTA views',
    clicks: 'CTA clicks',
  },
];
export const dataEmail: any = [
  {
    id: 1,
    title: `Title`,
    sent: 'Sent',
    open: 'Open',
    clicks: 'Clicks',
  },
  {
    id: 2,
    title: `Title`,
    sent: 'Sent',
    open: 'Open',
    clicks: 'Clicks',
  },
];
export const dataForms: any = [
  {
    id: 1,
    views: `Views`,
    submissions: 'Submissions',
  },
  {
    id: 2,
    views: `Views`,
    submissions: 'Submissions',
  },
];

export const dataSocialForms: any = [
  {
    id: 1,
    title: `Title`,
    status: 'Pending',
    Comments: 'Comments',
  },
  {
    id: 2,
    title: `Title`,
    status: 'Pending',
    Comments: 'Comments',
  },
];
export const columnsAdCampaigns: any = [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    cell: (info: any) => info?.getValue(),
    header: 'Name',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.contacts,
    id: 'contacts',
    isSortable: true,
    header: 'Contacts',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.clicks,
    id: 'clicks',
    isSortable: true,
    header: 'Clicks',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.spent,
    id: 'spent',
    isSortable: true,
    header: 'Spent',
    cell: (info: any) => info?.getValue(),
  },
];
export const columnsCta: any = [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    cell: (info: any) => info?.getValue(),
    header: 'Name',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.views,
    id: 'views',
    isSortable: true,
    header: 'Views',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.clicks,
    id: 'clicks',
    isSortable: true,
    header: 'Clicks',
    cell: (info: any) => info?.getValue(),
  },
];
export const columnsEmail: any = [
  {
    accessorFn: (row: any) => row?.title,
    id: 'title',
    cell: (info: any) => info?.getValue(),
    header: 'Title',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.sent,
    id: 'sent',
    isSortable: true,
    header: 'Sent',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.open,
    id: 'open',
    isSortable: true,
    header: 'Open',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.clicks,
    id: 'clicks',
    isSortable: true,
    header: 'Clicks',
    cell: (info: any) => info?.getValue(),
  },
];
export const columnsForms: any = [
  {
    accessorFn: (row: any) => row?.views,
    id: 'views',
    cell: (info: any) => info?.getValue(),
    header: 'Views',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.submissions,
    id: 'submissions',
    isSortable: true,
    header: 'Submissions',
    cell: (info: any) => info?.getValue(),
  },
];
export const columnsSocialPosts: any = [
  {
    accessorFn: (row: any) => row?.title,
    id: 'title',
    cell: (info: any) => info?.getValue(),
    header: 'Title',
    isSortable: false,
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

export const accordionNames = [
  { id: 1, name: 'Ad campaigns(1)', description: 'Attribution' },
  {
    id: 2,
    name: "CTA'S",
    description: "CTA'S Views",
    actionViews: "CTA'S Clicks",
  },
  {
    id: 3,
    name: 'Email',
    description: 'Sent',
    opens: 'Open -',
    clicks: 'Click 0',
  },
  {
    id: 4,
    name: 'Forms',
    description: 'Form Views',
    opens: 'View 0',
    submissions: 'Submissions 0',
  },
  {
    id: 5,
    name: 'Social Posts(2)',
    description: 'Post Views',
    opens: 'View -',
    submissions: 'Submissions -',
    contacts: 'Contacts (First Touch) -',
  },
];
export const accordionNameInfo = {
  adCampaign: 'Ad campaigns(1)',
  cta: "CTA'S",
  email: 'Email',
  forms: 'Forms',
  socailPosts: 'Social Posts(2)',
};
