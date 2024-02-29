import { Checkbox, Typography } from '@mui/material';
import { AIR_SERVICES } from '@/constants';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';

export const columns = (
  softwareData: any,
  setSoftwareData: any,
  data: any,
  router: any,
): any => [
  {
    accessorFn: (row: any) => row?.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          !!softwareData?.find((item: any) => item?.id === info?.getValue())
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSoftwareData([
                ...softwareData,
                data?.find((item: any) => item?.id === info?.getValue()),
              ])
            : setSoftwareData(
                softwareData?.filter((item: any) => {
                  return item?.id !== info?.getValue();
                }),
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
        checked={softwareData?.length === data?.length}
        onChange={(e: any) => {
          e?.target?.checked ? setSoftwareData([...data]) : setSoftwareData([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.Software,
    id: 'Software',
    isSortable: true,
    header: 'Software',
    cell: (info: any) => (
      <Typography
        component="span"
        onClick={() =>
          router?.push({
            pathname: AIR_SERVICES?.ASSETS_SOFTWARE_DETAIL,
            query: {
              softwareId: info?.row?.original?.id,
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
    accessorFn: (row: any) => row?.Status,
    id: 'Status',
    header: 'Status',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.Category,
    id: 'Category',
    isSortable: true,
    header: 'Category',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.ContractValue,
    id: 'Contract Value',
    isSortable: true,
    header: 'Contract Value',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.ManagedBy,
    id: 'Managed By',
    isSortable: true,
    header: 'Managed By',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.Users,
    id: 'Users',
    isSortable: true,
    header: <span>Users</span>,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.Installs,
    id: 'Installs',
    isSortable: true,
    header: <span>Installs</span>,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.Type,
    id: 'Type',
    isSortable: true,
    header: <span>Type</span>,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.publisher,
    id: 'Publisher',
    isSortable: true,
    header: <span>Publisher</span>,
    cell: (info: any) => info?.getValue(),
  },
];
