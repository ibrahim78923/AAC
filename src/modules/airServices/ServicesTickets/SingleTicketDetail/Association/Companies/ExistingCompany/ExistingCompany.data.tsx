import { Typography } from '@mui/material';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { UserInfo } from '@/components/UserInfo';
import { tableCheckbox } from '@/utils/table-checkbox';

export const useAddCompanyColumns = ({
  setSelected,
  selected,
  associatesCompanyList,
}: any) => [
  tableCheckbox({
    selectedList: selected,
    setSelectedList: setSelected,
    tableData: associatesCompanyList,
  }),
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
