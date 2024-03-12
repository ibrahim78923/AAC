import { CALENDAR_FORMAT } from '@/constants';
import dayjs from 'dayjs';

export const assetsAssociateColumns: any = [
  {
    accessorFn: (row: any) => row?.displayName,
    id: 'displayName',
    cell: (info: any) => info?.getValue() ?? '__',
    header: 'Name',
  },
  {
    accessorFn: (row: any) => row?.assetType?.name,
    id: 'assetType',
    header: 'Asset Type',
    cell: (info: any) => info?.getValue() ?? '__',
  },
  {
    accessorFn: (row: any) => row?.location?.locationName,
    id: 'location',
    header: 'Location',
    cell: (info: any) => (info?.getValue() ? info?.getValue() : '__'),
  },
  {
    accessorFn: (row: any) => row?.usedBy,
    id: 'usedBy',
    header: 'Used By',
    cell: (info: any) => {
      const users = info?.getValue();
      return users ? `${users?.firstName} ${users?.lastName}` : '__';
    },
  },
  {
    accessorFn: (row: any) => row?.department?.name,
    id: 'department',
    header: 'Department',
    cell: (info: any) => info?.getValue() ?? '__',
  },
  {
    accessorFn: (row: any) => row?.impact,
    id: 'impact',
    header: 'Impact',
    cell: (info: any) => info?.getValue() ?? '__',
  },
  {
    accessorFn: (row: any) => row?.assetLifeExpiry,
    id: 'assetLifeExpiry',
    header: 'Asset life expire on',
    cell: (info: any) =>
      info?.getValue()
        ? dayjs(info?.getValue())?.format(CALENDAR_FORMAT?.UI)
        : '__',
  },
];
