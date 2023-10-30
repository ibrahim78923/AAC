import { Checkbox } from '@mui/material';

export const CreatedColumns: any = [
  {
    accessorFn: (row: any) => row.id,
    id: 'id',
    cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
    header: <Checkbox color="primary" name="id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.Contact,
    id: 'Contacts',
    header: 'Contacts',
    isSortable: true,
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.Address,
    id: 'address',
    isSortable: true,
    header: 'Address',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.DateOfBirth,
    id: 'dateofBirth',
    isSortable: true,
    header: 'Date of Birth',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.PhoneNumber,
    id: 'phoneNumber',
    isSortable: true,
    header: 'Phone Number',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.WhatsappNumber,
    id: 'whatsAppNumber',
    isSortable: true,
    header: 'WhatsApp Number',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.ContactNumber,
    id: 'contactOwner',
    isSortable: true,
    header: 'contactOwner',
    cell: (info: any) => info.getValue(),
  },
];
