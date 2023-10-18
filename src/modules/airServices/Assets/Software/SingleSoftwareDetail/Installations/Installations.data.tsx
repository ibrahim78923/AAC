import { Checkbox } from '@mui/material';
import { styles } from '../../../AssetHead/AssetHead.style';

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
    header: <span style={styles.headerStyle(theme)}>Installation Macnine</span>,
    cell: (info: any) => (
      <span style={styles.firstCellStyle}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.Version,
    id: 'Version',
    header: <span style={styles.headerStyle(theme)}>Version</span>,
    isSortable: true,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.User,
    id: 'User',
    isSortable: true,
    header: <span style={styles.headerStyle(theme)}>User</span>,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.Department,
    id: 'Department',
    isSortable: true,
    header: <span style={styles.headerStyle(theme)}>Department</span>,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.InstallationDate,
    id: 'Installation Date',
    isSortable: true,
    header: <span style={styles.headerStyle(theme)}>Installation Date</span>,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
];
