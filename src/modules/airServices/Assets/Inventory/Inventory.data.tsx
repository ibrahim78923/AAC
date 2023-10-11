import { Checkbox } from '@mui/material';
import { styles } from '../AssetHead/AssetHead.style';

export const data: any = [
  {
    id: 1,
    Name: 'Logitech Mouse',
    AssetType: 'Hardware',
    Location: '---',
    UsedBy: '---',
    Department: '---',
    Impact: 'Low',
  },
  {
    id: 2,
    Name: 'Dell Monitor',
    AssetType: 'Hardware',
    Location: '---',
    UsedBy: '---',
    Department: '---',
    Impact: 'Low',
  },
  {
    id: 3,
    Name: 'Andrea’s Laptop',
    AssetType: `Hardware`,
    Location: '---',
    UsedBy: 'Andrea',
    Department: '---',
    Impact: 'Medium',
  },
];
export const columns = (
  meetingsData: any,
  setMeetingsData: any,
  meetingsMainData: any,
  theme: any,
): any => [
  {
    accessorFn: (row: any) => row.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        checked={
          !!meetingsData.find((item: any) => item.id === info.getValue())
        }
        onChange={(e: any) => {
          e.target.checked
            ? setMeetingsData([
                ...meetingsData,
                meetingsMainData.find(
                  (item: any) => item.id === info.getValue(),
                ),
              ])
            : setMeetingsData(
                meetingsData.filter((item: any) => {
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
        checked={meetingsData.length === meetingsMainData.length}
        onChange={(e: any) => {
          e.target.checked
            ? setMeetingsData([...meetingsMainData])
            : setMeetingsData([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.Name,
    id: 'Name',
    isSortable: true,
    header: <span style={styles.headerStyle(theme)}>Name</span>,
    cell: (info: any) => (
      <span style={styles.firstCellStyle}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.AssetType,
    id: 'AssetType',
    header: <span style={styles.headerStyle(theme)}>Asset Type</span>,
    isSortable: true,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.Location,
    id: 'Location',
    isSortable: true,
    header: <span style={styles.headerStyle(theme)}>Location</span>,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.UsedBy,
    id: 'UsedBy',
    isSortable: true,
    header: <span style={styles.headerStyle(theme)}>Used By</span>,
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
    accessorFn: (row: any) => row.Impact,
    id: 'Impact',
    isSortable: true,
    header: <span style={styles.headerStyle(theme)}>Impact</span>,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
];
