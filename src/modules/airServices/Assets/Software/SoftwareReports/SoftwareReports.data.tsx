import { TruncateText } from '@/components/TruncateText';
import { SOFTWARE_STATUS } from '@/constants/services';
import { fullName } from '@/utils/avatarUtils';

export const SoftwareReportsCountData = (data: any) => {
  return {
    [SOFTWARE_STATUS?.ALL_SOFTWARE]: data?.totalSoftware,
    [SOFTWARE_STATUS?.RESTRICTED]: data?.restricted,
    [SOFTWARE_STATUS?.IGNORED]: data?.ignored,
    [SOFTWARE_STATUS?.MANAGED]: data?.managed,
    [SOFTWARE_STATUS?.DISABLED]: data?.disable,
    [SOFTWARE_STATUS?.IN_REVIEW]: data?.inReview,
  };
};

export const SoftwareReportsChartData = (data: any) => {
  return {
    [SOFTWARE_STATUS?.RESTRICTED]: data?.restricted,
    [SOFTWARE_STATUS?.IGNORED]: data?.ignored,
    [SOFTWARE_STATUS?.MANAGED]: data?.managed,
    [SOFTWARE_STATUS?.DISABLED]: data?.disable,
    [SOFTWARE_STATUS?.IN_REVIEW]: data?.inReview,
  };
};

export const softwareStatusReportsOptions = [
  {
    label: SOFTWARE_STATUS?.ALL_SOFTWARE,
    _id: 'totalSoftware',
  },
  {
    label: SOFTWARE_STATUS?.RESTRICTED,
    _id: 'restricted',
  },
  {
    label: SOFTWARE_STATUS?.MANAGED,
    _id: 'managed',
  },
  {
    label: SOFTWARE_STATUS?.IN_REVIEW,
    _id: 'inReview',
  },
  {
    label: SOFTWARE_STATUS?.IGNORED,
    _id: 'ignored',
  },
  {
    label: SOFTWARE_STATUS?.DISABLED,
    _id: 'disable',
  },
];

export const softwareReportsTableColumnsDynamic = () => [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    isSortable: false,
    header: 'Name',
    cell: (info: any) => (
      <TruncateText text={info?.getValue()?.toLowerCase()} />
    ),
  },
  {
    accessorFn: (row: any) => row?.type,
    id: 'type',
    isSortable: false,
    header: 'Type',
    cell: (info: any) => (
      <TruncateText text={info?.getValue()?.toLowerCase()} />
    ),
  },
  {
    accessorFn: (row: any) => row?.softwareManagedByDetails,
    id: 'softwareManagedByDetails',
    isSortable: false,
    header: 'Managed By',
    cell: (info: any) => (
      <TruncateText
        text={fullName(
          info?.row?.original?.softwareManagedByDetails?.firstName?.toLowerCase(),
          info?.row?.original?.softwareManagedByDetails?.lastName?.toLowerCase(),
        )}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    isSortable: false,
    header: 'Status',
    cell: (info: any) => (
      <TruncateText text={info?.getValue()?.toLowerCase()} />
    ),
  },
];
