import { Checkbox, Typography } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { UserInfo } from '@/components/UserInfo';

export const useAddContactsColumns = ({
  setSelected,
  selected,
  associatesContactsList,
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
          associatesContactsList?.length
            ? selected?.length === associatesContactsList?.length
            : false
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelected(
                associatesContactsList?.map((asset: any) => asset?._id),
              )
            : setSelected([]);
        }}
        disabled={!associatesContactsList?.length}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?._id,
    id: 'contactID',
    cell: (info: any) => (
      <Typography variant={'body3'} textTransform={'capitalize'}>
        #PBR - {info?.getValue()?.slice(-3)}
      </Typography>
    ),
    header: 'Contact ID',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row,
    id: 'name',
    header: 'Owner',
    isSortable: true,
    cell: (info: any) => (
      <UserInfo
        nameInitial={fullNameInitial(
          info?.getValue()?.firstName,
          info?.getValue()?.lastName,
        )}
        name={fullName(info?.getValue()?.firstName, info?.getValue()?.lastName)}
        avatarSrc={info?.getValue()?.profilePicture?.url}
        email={info?.getValue()?.email}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.jobTitle,
    id: 'jobTitle',
    isSortable: true,
    header: 'Job Title',
    cell: (info: any) => (
      <Typography variant={'body3'} textTransform={'capitalize'}>
        {info?.getValue()?.toLowerCase() ?? '---'}
      </Typography>
    ),
  },
];
