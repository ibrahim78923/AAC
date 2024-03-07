import { Checkbox } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import dayjs from 'dayjs';
import { CALENDAR_FORMAT } from '@/constants';

export const addAssociateAssetColumns: any = (
  activeCheck: any,
  setActiveCheck: any,
  assetsListData: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?._id,
      id: '_id',
      cell: (info: any) => (
        <Checkbox
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxCheckedIcon />}
          checked={
            !!activeCheck?.find((item: any) => item?._id === info?.getValue())
          }
          onChange={(e: any) => {
            e?.target?.checked
              ? setActiveCheck([
                  ...activeCheck,
                  assetsListData?.find(
                    (item: any) => item?._id === info?.getValue(),
                  ),
                ])
              : setActiveCheck(
                  activeCheck?.filter((item: any) => {
                    return item?._id !== info?.getValue();
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
          checked={activeCheck?.length === assetsListData?.length}
          onChange={(e: any) => {
            e?.target?.checked
              ? setActiveCheck([...assetsListData])
              : setActiveCheck([]);
          }}
          color="primary"
          name="_id"
        />
      ),
    },
    {
      accessorFn: (row: any) => row?.displayName,
      id: 'displayName',
      cell: (info: any) => info?.getValue(),
      isSortable: true,
      header: 'Name',
    },
    {
      accessorFn: (row: any) => row?.assetTypeDetails?.name,
      id: 'assetTypeDetails',
      header: 'Asset Type',
      isSortable: true,
      cell: (info: any) => info?.getValue() ?? '__',
    },
    {
      accessorFn: (row: any) => row?.locationDetails?.locationName,
      id: 'locationName',
      header: 'Location',
      isSortable: true,
      cell: (info: any) => (info?.getValue() ? info?.getValue() : '__'),
    },
    {
      accessorFn: (row: any) => row?.userDetails,
      id: 'userDetails',
      header: 'Used By',
      isSortable: true,
      cell: (info: any) => {
        const users = info?.getValue();
        return users ? `${users?.firstName} ${users?.lastName}` : '__';
      },
    },
    {
      accessorFn: (row: any) => row?.departmentDetails?.name,
      id: 'departmentDetails',
      header: 'Department',
      isSortable: true,
      cell: (info: any) => info?.getValue() ?? '__',
    },
    {
      accessorFn: (row: any) => row?.impact,
      id: 'impact',
      header: 'Impact',
      isSortable: true,
      cell: (info: any) => info?.getValue() ?? '__',
    },
    {
      accessorFn: (row: any) => row?.assetLifeExpiry,
      id: 'assetLifeExpiry',
      header: 'Asset life expire on',
      isSortable: true,
      cell: (info: any) => dayjs(info?.getValue())?.format(CALENDAR_FORMAT?.UI),
    },
  ];
};
