import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { TruncateText } from '@/components/TruncateText';
import { uiDateFormat } from '@/lib/date-time';
import { Checkbox } from '@mui/material';

export const loyaltyRolesAndRightColumnsDynamic = (
  selectedRoleList?: any,
  setSelectedRoleList?: any,
  totalRoles: any = [],
) => [
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          !!selectedRoleList?.find(
            (item: any) => item?._id === info?.getValue(),
          )
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedRoleList([...selectedRoleList, info?.row?.original])
            : setSelectedRoleList(
                selectedRoleList?.filter(
                  (item: any) => item?._id !== info?.getValue(),
                ),
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
        checked={
          totalRoles?.length
            ? selectedRoleList?.length === totalRoles?.length
            : false
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedRoleList(totalRoles?.map((item: any) => item))
            : setSelectedRoleList([]);
        }}
        color="primary"
        name="id"
      />
    ),
  },
  {
    accessorFn: (row: any) => row?._id,
    id: 'id',
    isSortable: true,
    header: 'Role ID',
    cell: (info: any) => info?.row?.original?._id?.slice?.(-3) ?? '---',
  },
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    isSortable: true,
    header: 'Role Name',
    cell: (info: any) => <TruncateText text={info?.getValue()} />,
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    isSortable: true,
    header: 'Created On',
    cell: (info: any) => uiDateFormat(info?.getValue()),
  },
  {
    accessorFn: (info: any) => info?.description,
    id: 'description',
    header: 'Description',
    isSortable: true,
    cell: (info: any) => <TruncateText text={info?.getValue()} />,
  },
];
