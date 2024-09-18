import { Checkbox, Typography } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { UserInfo } from '@/components/UserInfo';

export const useAddCompanyColumns = ({
  setSelected,
  selected,
  associatesCompanyList,
}: any) => [
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={!!selected?.find((item: any) => item === info?.getValue())}
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelected([...selected, info?.getValue()])
            : setSelected(
                selected?.filter((item: any) => item !== info?.getValue()),
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
          associatesCompanyList?.length
            ? selected?.length === associatesCompanyList?.length
            : false
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelected(
                associatesCompanyList?.map((asset: any) => asset?._id),
              )
            : setSelected([]);
        }}
        disabled={!associatesCompanyList?.length}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row,
    id: 'name',
    header: 'Companies Name',
    isSortable: true,
    cell: (info: any) => (
      <UserInfo
        nameInitial={fullNameInitial(info?.getValue()?.name)}
        name={fullName(info?.getValue()?.name)}
        avatarSrc={info?.getValue()?.profilePicture?.url}
        email={info?.getValue()?.domain}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.owner?.phoneNumber,
    id: 'owner.phoneNumber',
    isSortable: true,
    header: 'Phone Number',
    cell: (info: any) => info?.getValue() ?? '---',
  },
  {
    accessorFn: (row: any) => row?.owner?.name,
    id: 'owner.name',
    isSortable: true,
    header: 'Company Owner',
    cell: (info: any) => (
      <Typography variant={'body2'} textTransform={'capitalize'}>
        {info?.getValue()?.toLowerCase() ?? '---'}
      </Typography>
    ),
  },
];
