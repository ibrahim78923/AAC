import { SOFTWARE_STATUS, SOFTWARE_TYPE } from '@/constants/strings';
import { fullName, truncateText } from '@/utils/avatarUtils';
import { Typography } from '@mui/material';

export const SOFTWARE_STATUS_COUNT = {
  TOTAL_SOFTWARE: 'totalSoftware',
  [SOFTWARE_STATUS?.RESTRICTED]: 'restricted',
  [SOFTWARE_STATUS?.IGNORED]: 'ignored',
  [SOFTWARE_STATUS?.MANAGED]: 'managed',
  [SOFTWARE_STATUS?.DISABLED]: 'disable',
  [SOFTWARE_STATUS?.IN_REVIEW]: 'inReview',
};

export const softwareReportsCardsDataDynamic = (data: any) => {
  return {
    TotalSoftware: data?.[SOFTWARE_STATUS_COUNT?.TOTAL_SOFTWARE],
    [SOFTWARE_STATUS?.RESTRICTED]:
      data?.[SOFTWARE_STATUS_COUNT?.[SOFTWARE_STATUS?.RESTRICTED]],
    [SOFTWARE_STATUS?.IGNORED]:
      data?.[SOFTWARE_STATUS_COUNT?.[SOFTWARE_STATUS?.IGNORED]],
    [SOFTWARE_STATUS?.MANAGED]:
      data?.[SOFTWARE_STATUS_COUNT?.[SOFTWARE_STATUS?.MANAGED]],
    [SOFTWARE_STATUS?.DISABLED]:
      data?.[SOFTWARE_STATUS_COUNT?.[SOFTWARE_STATUS?.DISABLED]],
    [SOFTWARE_STATUS?.IN_REVIEW]:
      data?.[SOFTWARE_STATUS_COUNT?.[SOFTWARE_STATUS?.IN_REVIEW]],
  };
};

export const softwareReportsChartsDataDynamic = (data: any) => {
  return {
    [SOFTWARE_STATUS?.RESTRICTED]:
      data?.[SOFTWARE_STATUS_COUNT?.[SOFTWARE_STATUS?.RESTRICTED]],
    [SOFTWARE_STATUS?.IGNORED]:
      data?.[SOFTWARE_STATUS_COUNT?.[SOFTWARE_STATUS?.IGNORED]],
    [SOFTWARE_STATUS?.MANAGED]:
      data?.[SOFTWARE_STATUS_COUNT?.[SOFTWARE_STATUS?.MANAGED]],
    [SOFTWARE_STATUS?.DISABLED]:
      data?.[SOFTWARE_STATUS_COUNT?.[SOFTWARE_STATUS?.DISABLED]],
    [SOFTWARE_STATUS?.IN_REVIEW]:
      data?.[SOFTWARE_STATUS_COUNT?.[SOFTWARE_STATUS?.IN_REVIEW]],
  };
};
export const softwareStatusReportsOptions = [
  {
    label: 'All Software',
    _id: SOFTWARE_STATUS_COUNT?.TOTAL_SOFTWARE,
  },
  {
    label: SOFTWARE_STATUS?.RESTRICTED,
    _id: SOFTWARE_STATUS_COUNT?.[SOFTWARE_STATUS?.RESTRICTED],
  },
  {
    label: SOFTWARE_STATUS?.MANAGED,
    _id: SOFTWARE_STATUS_COUNT?.[SOFTWARE_STATUS?.MANAGED],
  },
  {
    label: SOFTWARE_STATUS?.IN_REVIEW,
    _id: SOFTWARE_STATUS_COUNT?.[SOFTWARE_STATUS?.IN_REVIEW],
  },
  {
    label: SOFTWARE_STATUS?.IGNORED,
    _id: SOFTWARE_STATUS_COUNT?.[SOFTWARE_STATUS?.IGNORED],
  },
  {
    label: SOFTWARE_STATUS?.DISABLED,
    _id: SOFTWARE_STATUS_COUNT?.[SOFTWARE_STATUS?.DISABLED],
  },
];

export const softwareTypeReportsOptions = [
  {
    _id: SOFTWARE_TYPE?.DESKTOP,
    label: SOFTWARE_TYPE?.DESKTOP,
  },
  {
    _id: SOFTWARE_TYPE?.SAAS,
    label: SOFTWARE_TYPE?.SAAS,
  },
  {
    _id: SOFTWARE_TYPE?.MOBILE,
    label: SOFTWARE_TYPE?.MOBILE,
  },
];

export const softwareReportsTableColumnsDynamic = () => [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    isSortable: true,
    header: 'Software',
    cell: (info: any) => (
      <Typography
        component="span"
        color="custom.bright"
        sx={{ cursor: 'pointer' }}
      >
        {truncateText(info?.getValue())}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.type,
    id: 'type',
    isSortable: true,
    header: 'Type',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.managedByDetails,
    id: 'managedByDetails',
    isSortable: true,
    header: 'Managed By',
    cell: (info: any) =>
      fullName(
        info?.row?.original?.managedByDetails?.firstName,
        info?.row?.original?.managedByDetails?.lastName,
      ),
  },
  {
    accessorFn: (row: any) => row?.details,
    id: 'category',
    isSortable: true,
    header: 'Category',
    cell: (info: any) => truncateText(info?.getValue()?.category) || '---',
  },
];
