import { Checkbox } from '@mui/material';

export const ContactsColumns: any = [
  {
    accessorFn: (row: any) => row.id,
    id: 'id',
    cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
    header: <Checkbox color="primary" name="id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.contact,
    id: 'dealOwner',
    header: 'Contacts',
    isSortable: true,
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.email,
    id: 'email',
    isSortable: true,
    header: 'Email',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.address,
    id: 'address',
    isSortable: true,
    header: 'Address',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.dateofBirth,
    id: 'dateofBirth',
    isSortable: true,
    header: 'Date of Birth',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.phoneNumber,
    id: 'phoneNumber',
    isSortable: true,
    header: 'Phone Number',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.whatsAppNumber,
    id: 'whatsAppNumber',
    isSortable: true,
    header: 'WhatsApp Number',
    cell: (info: any) => info.getValue(),
  },
];
