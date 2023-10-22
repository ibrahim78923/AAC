import { Checkbox } from '@mui/material';

export const data: any = [
  {
    id: 1,
    InstallationMacnine: 'Andrea',
    Version: '--',
    User: 'Andera',
    Department: '--',
    InstallationDate: '--',
  },
];
export const columns = (
  installationData: any,
  setInstallationData: any,
  meetingsMainData: any,
  theme: any,
): any => [
  {
    accessorFn: (row: any) => row.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        checked={
          !!installationData.find((item: any) => item.id === info.getValue())
        }
        onChange={(e: any) => {
          e.target.checked
            ? setInstallationData([
                ...installationData,
                meetingsMainData.find(
                  (item: any) => item.id === info.getValue(),
                ),
              ])
            : setInstallationData(
                installationData.filter((item: any) => {
                  return item.id !== info.getValue();
                }),
              );
        }}
        color="primary"
        name={info.getValue()}
      />
    ),
    header: (
      <Checkbox
        checked={installationData.length === meetingsMainData.length}
        onChange={(e: any) => {
          e.target.checked
            ? setInstallationData([...meetingsMainData])
            : setInstallationData([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.InstallationMacnine,
    id: 'Installation Macnine',
    isSortable: true,
    header: <span>Installation Macnine</span>,
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.Version,
    id: 'Version',
    header: <span>Version</span>,
    isSortable: true,
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.User,
    id: 'User',
    isSortable: true,
    header: <span>User</span>,
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.Department,
    id: 'Department',
    isSortable: true,
    header: <span>Department</span>,
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.InstallationDate,
    id: 'Installation Date',
    isSortable: true,
    header: <span>Installation Date</span>,
    cell: (info: any) => info.getValue(),
  },
];

export const addDeviceOptions = [
  {
    value: 'device_one',
    label: 'Device One',
  },
  {
    value: 'device_two',
    label: 'Device Two',
  },
];
