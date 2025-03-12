import { Typography } from '@mui/material';
import { fullName } from '@/utils/avatarUtils';
import { SoftwareDataI } from './Software.interface';
import { NextRouter } from 'next/router';
import { TruncateText } from '@/components/TruncateText';
import { AIR_SERVICES } from '@/constants/routes';
import { tableCheckbox } from '@/utils/table-checkbox';
import {
  SOFTWARE_STATUS,
  SOFTWARE_TYPE,
  TIME_PERIODS,
} from '@/constants/services';

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
  softwareData: string[],
  setSoftwareData: React.Dispatch<React.SetStateAction<string[]>>,
  data: SoftwareDataI[] = [],
  router: NextRouter,
) => [
  tableCheckbox({
    selectedList: softwareData,
    setSelectedList: setSoftwareData,
    tableData: data,
  }),
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    isSortable: true,
    header: 'Software',
    cell: (info: any) => (
      <Typography
        component="span"
        textTransform={'capitalize'}
        variant={'body3'}
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
        <TruncateText text={info?.getValue()?.toLowerCase()} />
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
    cell: (info: any) => <TruncateText text={info?.getValue()?.category} />,
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
    cell: (info: any) => (
      <TruncateText
        text={fullName(
          info?.row?.original?.managedByDetails?.firstName,
          info?.row?.original?.managedByDetails?.lastName,
        )}
      />
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
    cell: (info: any) => <TruncateText text={info?.getValue()?.publisher} />,
  },
];
