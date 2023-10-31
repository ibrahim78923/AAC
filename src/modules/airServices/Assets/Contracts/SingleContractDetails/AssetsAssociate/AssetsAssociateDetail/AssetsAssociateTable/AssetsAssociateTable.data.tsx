import { Checkbox } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';

export const assetsAssociateTableColumns: any = (
  activeCheck: any,
  setActiveCheck: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?.Id,
      id: 'Id',
      cell: (info: any) => (
        <Checkbox
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxCheckedIcon />}
          checked={
            !!activeCheck?.find((item: any) => item?.Id === info?.getValue())
          }
          onChange={(e: any) => {
            e?.target?.checked
              ? setActiveCheck([
                  ...activeCheck,
                  assetsAssociateTableData?.find(
                    (item: any) => item?.Id === info?.getValue(),
                  ),
                ])
              : setActiveCheck(
                  activeCheck?.filter((item: any) => {
                    return item?.Id !== info?.getValue();
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
          checked={activeCheck?.length === assetsAssociateTableData?.length}
          onChange={(e: any) => {
            e?.target?.checked
              ? setActiveCheck([...assetsAssociateTableData])
              : setActiveCheck([]);
          }}
          color="primary"
          name="Id"
        />
      ),
    },
    {
      accessorFn: (row: any) => row?.software,
      id: 'software',
      cell: (info: any) => info?.getValue(),
      isSortable: true,
      header: 'Software',
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      header: 'Status',
      isSortable: true,
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.category,
      id: 'category',
      header: 'Category',
      isSortable: true,
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.contractValue,
      id: 'contractValue',
      header: 'Contract Value',
      isSortable: true,
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.managedBy,
      id: 'managedBy',
      header: 'Managed By',
      isSortable: true,
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.users,
      id: 'users',
      header: 'Users',
      isSortable: true,
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.installs,
      id: 'installs',
      header: 'Installs',
      isSortable: true,
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.type,
      id: 'type',
      header: 'Type',
      isSortable: true,
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.publisher,
      id: 'publisher',
      header: 'Publisher',
      isSortable: true,
      cell: (info: any) => info?.getValue(),
    },
  ];
};
export const assetsAssociateTableData: any = [
  {
    Id: 1,
    software: `Fresh service`,
    status: 'Managed',
    category: '---',
    contractValue: '---',
    managedBy: '---',
    users: '---',
    installs: '1',
    type: '---',
    publisher: '9 Mar, 2027',
  },
];
