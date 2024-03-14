import { Checkbox, Typography } from '@mui/material';
import { AIR_SERVICES } from '@/constants';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { fullName } from '@/utils/avatarUtils';

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
        {info?.getValue()}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.status ?? '---',
    id: 'status',
    header: 'Status',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.category,
    id: 'category',
    isSortable: true,
    header: 'Category',
    cell: (info: any) =>
      info?.row?.original?.details?.category === ''
        ? '---'
        : info?.row?.original?.details?.category,
  },
  {
    accessorFn: (row: any) => row?.contractValue ?? '---',
    id: 'contractValue',
    isSortable: true,
    header: 'Contract Value',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.managedByDetails ?? '---',
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
    accessorFn: (row: any) => row?.users ?? '---',
    id: 'users',
    isSortable: true,
    header: <span>Users</span>,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.installs ?? '---',
    id: 'installs',
    isSortable: true,
    header: <span>Installs</span>,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.type ?? '---',
    id: 'type',
    isSortable: true,
    header: <span>Type</span>,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.publisher,
    id: 'publisher',
    isSortable: true,
    header: <span>Publisher</span>,
    cell: (info: any) =>
      info?.row?.original?.details?.publisher === ''
        ? '---'
        : info?.row?.original?.details?.publisher,
  },
];
