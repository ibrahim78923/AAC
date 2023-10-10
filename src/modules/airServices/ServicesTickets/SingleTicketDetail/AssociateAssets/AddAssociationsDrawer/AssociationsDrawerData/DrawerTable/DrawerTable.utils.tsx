import { Box, Checkbox } from '@mui/material';
export const DrawerTableColumns = (
  DrawerData: any,
  setDrawerData: any,
  DrawerMainData: any,
): any => [
  {
    accessorFn: (row: any) => row.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        checked={!!DrawerData.find((item: any) => item.id === info.getValue())}
        onChange={(e: any) => {
          e.target.checked
            ? setDrawerData([
                ...DrawerData,
                DrawerMainData.find((item: any) => item.id === info.getValue()),
              ])
            : setDrawerData(
                DrawerData.filter((item: any) => {
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
        checked={DrawerData.length === DrawerMainData.length}
        onChange={(e: any) => {
          e.target.checked
            ? setDrawerData([...DrawerMainData])
            : setDrawerData([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.title,
    id: 'title',
    cell: (info: any) => (
      <Box sx={{ color: '#0AADC7', fontWeight: '500' }}>{info.getValue()}</Box>
    ),
    header: 'Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row.owner,
    id: 'owner',
    isSortable: true,
    header: 'Asset Type',
    cell: (info: any) => (
      <Box sx={{ color: 'common.black', fontWeight: '500' }}>
        {info.getValue()}
      </Box>
    ),
  },
];

export const DrawerTableData: any = [
  {
    id: '1',
    title: 'Logitech Mouse',
    owner: 'Hardware',
  },
  {
    id: '2',
    title: 'Dell Monitor',
    owner: 'Hardware',
  },
  {
    id: '3',
    title: 'Andrea’s Laptop',
    owner: 'Hardware',
  },
];
