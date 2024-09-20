import { TruncateText } from '@/components/TruncateText';
import { CALENDAR_FORMAT } from '@/constants';
import { fullName } from '@/utils/avatarUtils';
import dayjs from 'dayjs';

export const assetsAssociateColumns: any = [
  {
    accessorFn: (row: any) => row?.displayName,
    id: 'displayName',
    cell: (info: any) => <TruncateText text={info?.getValue()} />,
    header: 'Name',
  },
  {
    accessorFn: (row: any) => row?.assetType?.name,
    id: 'assetType',
    header: 'Asset Type',
    cell: (info: any) => <TruncateText text={info?.getValue()} />,
  },
  {
    accessorFn: (row: any) => row?.location?.locationName,
    id: 'location',
    header: 'Location',
    cell: (info: any) => <TruncateText text={info?.getValue()} />,
  },
  {
    accessorFn: (row: any) => row?.usedBy,
    id: 'usedBy',
    header: 'Used By',
    cell: (info: any) => {
      const users = info?.getValue();
      return (
        <TruncateText text={fullName(users?.firstName, users?.lastName)} />
      );
    },
  },
  {
    accessorFn: (row: any) => row?.department?.name,
    id: 'department',
    header: 'Department',
    cell: (info: any) => <TruncateText text={info?.getValue()} />,
  },
  {
    accessorFn: (row: any) => row?.impact,
    id: 'impact',
    header: 'Impact',
    cell: (info: any) => <TruncateText text={info?.getValue()} />,
  },
  {
    accessorFn: (row: any) => row?.assetLifeExpiry,
    id: 'assetLifeExpiry',
    header: 'Asset life expire on',
    cell: (info: any) =>
      info?.getValue()
        ? dayjs(info?.getValue())?.format(CALENDAR_FORMAT?.UI)
        : '---',
  },
];
