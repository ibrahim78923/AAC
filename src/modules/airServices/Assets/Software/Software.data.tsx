import { Checkbox, Typography } from '@mui/material';
import { AIR_SERVICES } from '@/constants';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { fullName, truncateText } from '@/utils/avatarUtils';
import {
  SOFTWARE_STATUS,
  SOFTWARE_TYPE,
  TIME_PERIODS,
} from '@/constants/strings';

export const softwareStatusOptions = [
  SOFTWARE_STATUS?.RESTRICTED,
  SOFTWARE_STATUS?.IGNORED,
  SOFTWARE_STATUS?.MANAGED,
  SOFTWARE_STATUS?.DISABLED,
  SOFTWARE_STATUS?.IN_REVIEW,
];

export const softwareTypeOptions = [
  SOFTWARE_TYPE?.DESKTOP,
  SOFTWARE_TYPE?.SAAS,
  SOFTWARE_TYPE?.MOBILE,
];

export const softwareDateOptions = [
  TIME_PERIODS?.NONE,
  TIME_PERIODS?.ALL_TIME,
  TIME_PERIODS?.TODAY,
  TIME_PERIODS?.YESTERDAY,
  TIME_PERIODS?.PREVIOUS_WEEK,
  TIME_PERIODS?.PREVIOUS_MONTH,
];

export const columns = (
  softwareData: any,
  setSoftwareData: any,
  data: any,
  router: any,
): any => [
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={!!softwareData?.find((item: any) => item === info?.getValue())}
        onChange={(e: any) => {
          e?.target?.checked
            ? setSoftwareData([...softwareData, info?.getValue()])
            : setSoftwareData(
                softwareData?.filter((item: any) => item !== info?.getValue()),
              );
        }}
        color="primary"
        name={info?.getValue()}
      />
    ),
    header: (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={data?.length ? softwareData?.length === data?.length : false}
        onChange={(e: any) => {
          e?.target?.checked
            ? setSoftwareData(data?.map((list: any) => list?._id))
            : setSoftwareData([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    isSortable: true,
    header: 'Software',
    cell: (info: any) => (
      <Typography
        component="span"
        onClick={() =>
          router?.push({
            pathname: AIR_SERVICES?.ASSETS_SOFTWARE_DETAIL,
            query: {
              softwareId: info?.row?.original?._id,
            },
          })
        }
        color="custom.bright"
        sx={{ cursor: 'pointer' }}
      >
        {truncateText(info?.getValue())}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    header: 'Status',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.details,
    id: 'category',
    isSortable: true,
    header: 'Category',
    cell: (info: any) => truncateText(info?.getValue()?.category) || '---',
  },
  {
    accessorFn: (row: any) => row?.contractValue,
    id: 'contractValue',
    isSortable: true,
    header: 'Contract Value',
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
    accessorFn: (row: any) => row?.users,
    id: 'users',
    isSortable: true,
    header: <span>Users</span>,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.installs,
    id: 'installs',
    isSortable: true,
    header: <span>Installs</span>,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.type,
    id: 'type',
    isSortable: true,
    header: <span>Type</span>,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.details,
    id: 'publisher',
    isSortable: true,
    header: <span>Publisher</span>,
    cell: (info: any) => truncateText(info?.getValue()?.publisher) || '---',
  },
];
