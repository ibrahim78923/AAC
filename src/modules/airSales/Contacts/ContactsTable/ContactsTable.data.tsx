import Link from 'next/link';

import { Checkbox } from '@mui/material';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

// href={{
//   pathname: `${SUPER_ADMIN_PLAN_MANAGEMENT?.ADD_PLAN}`,
//   query: { data: JSON?.stringify(tableRowValues?.row?.original) },
// }}
// as={`${SUPER_ADMIN_PLAN_MANAGEMENT?.ADD_PLAN}`}
export const ContactsColumns = () => {
  return [
    {
      accessorFn: (row: any) => row?.id,
      id: 'id',
      cell: () => <Checkbox color="primary" name="id" />,
      header: <Checkbox color="primary" name="id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.firstName + ' ' + row?.lastName,
      id: 'firstName',
      header: 'Contacts',
      isSortable: true,
      cell: (info: any) => {
        const contactInfo: any = {
          address: info?.row?.original?.address,
          firsName: info?.row?.original?.firstName,
        };
        return (
          <Link
            href={{
              pathname: '/air-sales/contacts/view-details',
              query: { data: contactInfo },
            }}
            as={'/air-sales/contacts/view-details'}
          >
            {info?.getValue()}
          </Link>
        );
      },
    },
    {
      accessorFn: (row: any) => row?.email,
      id: 'email',
      isSortable: true,
      header: 'Email',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.address,
      id: 'address',
      isSortable: true,
      header: 'Address',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) =>
        dayjs(row?.dateOfBirth)?.format(DATE_FORMAT?.UI),
      id: 'dateOfBirth',
      isSortable: true,
      header: 'Date of Birth',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.phoneNumber,
      id: 'phoneNumber',
      isSortable: true,
      header: 'Phone Number',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.whatsAppNumber,
      id: 'whatsAppNumber',
      isSortable: true,
      header: 'WhatsApp Number',
      cell: (info: any) => info?.getValue(),
    },
  ];
};
