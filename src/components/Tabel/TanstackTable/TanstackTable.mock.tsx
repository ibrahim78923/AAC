import React from 'react';
import { Checkbox } from '@mui/material';

export const data: any = [
  {
    Id: 1,
    articles: `Time Management - Meaning and its Im... @olivia`,
    status: 'Drafts',
    insertedTickets: 'Sharemydine',
    Author: 'Alee',
    folder: 'Tech Support',
  },
  {
    Id: 2,
    articles: `Time Management - Meaning and its Im...@olivia`,
    status: 'Drafts',
    insertedTickets: 'Sharemydine',
    Author: 'Alee',
    folder: 'Release',
  },
  {
    Id: 3,
    articles: `Time Management - Meaning and its Im...@olivia`,
    status: 'Drafts',
    insertedTickets: 'Sharemydine',
    Author: 'Alee',
    folder: 'Tech support 3',
  },
];
export const columns: any = [
  {
    accessorFn: (row: any) => row.Id,
    id: 'Id',
    cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.articles,
    id: 'Article',
    cell: (info: any) => info.getValue(),
    header: 'article',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.status,
    id: 'Status',
    isSortable: true,
    header: 'status',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.insertedTickets,
    id: 'insertedTickets',
    isSortable: true,
    header: 'inserted Tickets',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.Author,
    id: 'Author',
    isSortable: true,
    header: 'Author',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.folder,
    id: 'folder',
    isSortable: true,
    header: 'Folder',
    cell: (info: any) => info.getValue(),
  },
];
