import { Checkbox } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';

export const InstallationTableColumns: any = (
  activeCheck: any,
  setActiveCheck: any,
) => {
  return [
    {
      accessorFn: (row: any) => row.Id,
      id: 'Id',
      cell: (info: any) => (
        <Checkbox
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxCheckedIcon />}
          checked={
            !!activeCheck.find((item: any) => item.Id === info.getValue())
          }
          onChange={(e: any) => {
            e.target.checked
              ? setActiveCheck([
                  ...activeCheck,
                  InstallationTableData.find(
                    (item: any) => item.Id === info.getValue(),
                  ),
                ])
              : setActiveCheck(
                  activeCheck.filter((item: any) => {
                    return item.Id !== info.getValue();
                  }),
                );
          }}
          color="primary"
          name={info.getValue()}
        />
      ),
      header: (
        <Checkbox
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxCheckedIcon />}
          checked={activeCheck.length === InstallationTableData.length}
          onChange={(e: any) => {
            e.target.checked
              ? setActiveCheck([...InstallationTableData])
              : setActiveCheck([]);
          }}
          color="primary"
          name="Id"
        />
      ),
    },
    {
      accessorFn: (row: any) => row.installationMachine,
      id: 'installationMachine',
      cell: (info: any) => info.getValue(),
      header: 'Installation Machine',
    },
    {
      accessorFn: (row: any) => row.version,
      id: 'version',
      header: 'Version',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.user,
      id: 'user',
      header: 'User',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.department,
      id: 'department',
      header: 'Department',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.installationDate,
      id: 'installationDate',
      header: 'Installation Date',
      cell: (info: any) => info.getValue(),
    },
  ];
};
export const InstallationTableData: any = [
  {
    Id: 1,
    installationMachine: `Andrea`,
    version: '--',
    user: 'Andrea',
    department: '--',
    installationDate: '--',
  },
  {
    Id: 2,
    installationMachine: `Jack`,
    version: '--',
    user: 'Jack',
    department: '--',
    installationDate: '--',
  },
];
