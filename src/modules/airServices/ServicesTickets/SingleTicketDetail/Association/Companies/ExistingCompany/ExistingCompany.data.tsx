import { Typography } from '@mui/material';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { UserInfo } from '@/components/UserInfo';
import { CheckboxField } from '@/components/InputFields/CheckboxField';

export const useAddCompanyColumns = ({
  setSelected,
  selected,
  associatesCompanyList,
}: any) => [
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    cell: (info: any) => (
      <CheckboxField
        checked={!!selected?.find((item: any) => item === info?.getValue())}
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelected([...selected, info?.getValue()])
            : setSelected(
                selected?.filter((item: any) => item !== info?.getValue()),
              );
        }}
        name={info?.getValue()}
      />
    ),
    header: (
      <CheckboxField
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
      <Typography variant={'body3'} textTransform={'capitalize'}>
        {info?.getValue()?.toLowerCase() ?? '---'}
      </Typography>
    ),
  },
];
