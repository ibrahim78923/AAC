import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { Checkbox, Typography } from '@mui/material';

export const data: any = [
  {
    id: 9699,
    groupName: 'VG - Van Group',
    numberOfShop: '03',
  },
  {
    id: 7547,
    groupName: 'Nation - National Group',
    numberOfShop: '06',
  },
  {
    id: 5477,
    groupName: 'Mu - Mu Group',
    numberOfShop: '10',
  },
  {
    id: 5656,
    groupName: 'Xi - Xian Group',
    numberOfShop: '12',
  },
  {
    id: 3456,
    groupName: 'Chco - Charlie Corporation',
    numberOfShop: '09',
  },
  {
    id: 5364,
    groupName: 'Gen - General Enterprise',
    numberOfShop: '08',
  },
];
export const groupColumnsFunction = (
  setSelectedSendData: any,
  setIsDrawerOpen: any,
  selectedGroupData: any,
  setSelectedGroupData: any,
  data: any,
): any => [
  {
    accessorFn: (row: any) => row?.id,
    id: 'id',

    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          !!selectedGroupData?.find(
            (item: any) => item?.id === info?.getValue(),
          )
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedGroupData([
                ...selectedGroupData,
                data?.find((item: any) => item?.id === info?.getValue()),
              ])
            : setSelectedGroupData(
                selectedGroupData?.filter((item: any) => {
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
        checked={selectedGroupData?.length === data?.length}
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedGroupData([...data])
            : setSelectedGroupData([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.groupName,
    id: 'groupName',
    isSortable: false,
    header: 'Group Name',
    cell: (info: any) => (
      <Typography
        component="span"
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          setIsDrawerOpen(true);
          setSelectedSendData(info?.getValue());
        }}
      >
        {info?.getValue()}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.numberOfShop,
    id: 'numberOfShop',
    header: 'Number Of Shop',
    isSortable: false,
    cell: (info: any) => info?.getValue(),
  },
];
