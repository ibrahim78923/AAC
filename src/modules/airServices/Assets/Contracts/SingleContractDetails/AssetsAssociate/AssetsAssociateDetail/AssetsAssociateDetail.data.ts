import { CALENDAR_FORMAT } from '@/constants';
import dayjs from 'dayjs';

export const assetsAssociateTableColumns: any = [
  {
    accessorFn: (row: any) => row?.displayName,
    id: 'displayName',
    cell: (info: any) => info?.getValue(),
    header: 'Name',
  },
  {
    accessorFn: (row: any) => row?.assetTypeDetails?.name,
    id: 'assetTypeDetails',
    header: 'Asset Type',
    cell: (info: any) => info?.getValue() ?? '__',
  },
  {
    accessorFn: (row: any) => row?.locationDetails?.locationName,
    id: 'locationName',
    header: 'Location',
    cell: (info: any) => (info?.getValue() ? info?.getValue() : '__'),
  },
  {
    accessorFn: (row: any) => row?.userDetails,
    id: 'userDetails',
    header: 'Used By',
    cell: (info: any) => {
      const users = info?.getValue();
      return users ? `${users?.firstName} ${users?.lastName}` : '__';
    },
  },
  {
    accessorFn: (row: any) => row?.departmentDetails?.name,
    id: 'departmentDetails',
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
    cell: (info: any) => dayjs(info?.getValue())?.format(CALENDAR_FORMAT?.UI),
  },
];
