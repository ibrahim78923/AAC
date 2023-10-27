import { Checkbox, Typography } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
export const DrawerTableColumns = (
  DrawerData: any,
  setDrawerData: any,
  DrawerMainData: any,
  theme: any,
): any => [
  {
    accessorFn: (row: any) => row?.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          !!DrawerData?.find((item: any) => item?.id === info?.getValue())
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setDrawerData([
                ...DrawerData,
                DrawerMainData?.find(
                  (item: any) => item?.id === info?.getValue(),
                ),
              ])
            : setDrawerData(
                DrawerData?.filter((item: any) => {
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
        checked={DrawerData?.length === DrawerMainData?.length}
        onChange={(e: any) => {
          e?.target?.checked
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
    accessorFn: (row: any) => row?.title,
    id: 'title',
    cell: (info: any) => (
      <Typography variant="body4" color={theme?.palette?.custom?.bright}>
        {info?.getValue()}
      </Typography>
    ),
    header: 'Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.owner,
    id: 'owner',
    isSortable: true,
    header: 'Asset Type',
    cell: (info: any) => (
      <Typography variant="body4">{info?.getValue()}</Typography>
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
