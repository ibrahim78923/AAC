import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

export const columns = () => {
  return [
    {
      accessorFn: (row: any) => row?.phoneNumber,
      id: 'phoneNumber',
      isSortable: false,
      header: 'Number',
      cell: (info: any) => formatPhoneNumber(info?.getValue()),
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdAt',
      isSortable: false,
      header: 'Created at',
      cell: (info: any) => dayjs(info?.getValue()).format(DATE_FORMAT?.UI),
    },
  ];
};

function formatPhoneNumber(phoneNumber: string): string {
  const phoneRegex = /^(\+1)(\d{3})(\d{3})(\d{4})$/;
  return phoneNumber?.replace(phoneRegex, '$1 ($2) $3-$4');
}

export const integrationConfigurationData = [
  {
    configurationName: 'Twilio',
    number: '+1234567890',
  },
  {
    configurationName: 'AirFP',
    number: '+1234567890',
  },
];
