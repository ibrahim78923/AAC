import { Checkbox } from '@mui/material';

export const SocialPostsData: any = [
  {
    Id: 1,
    Posts: `post1`,
  },
  {
    Id: 2,
    Posts: `post2`,
  },
];

export const SocialPostsColumns: any = [
  {
    accessorFn: (row: any) => row?.Id,
    id: 'Id',
    cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.Posts,
    id: 'posts',
    cell: (info: any) => info?.getValue(),
    header: 'Posts',
    isSortable: false,
  },
];
