import { Checkbox } from '@mui/material';
import { SwitchBtn } from '@/components/SwitchButton';
import useUsers from './useUsers';
import { getSession } from '@/utils';
import { capitalizeFirstLetter } from '@/utils/api';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_SETTINGS } from '@/constants/permission-keys';

export const columnsUser = (
  checkedUser: any,
  setCheckedUser: any,
  tableData: any,
) => {
  const { user }: any = getSession();
  const { handleUpdateStatus } = useUsers();

  const handleSelectCompaniesById = (checked: boolean, id: string): void => {
    if (checked) {
      setCheckedUser([...checkedUser, id]);
    } else {
      setCheckedUser(checkedUser?.filter((_id: any) => _id !== id));
    }
  };

  const handleSelectAllCompanies = (checked: boolean): void => {
    setCheckedUser(checked ? tableData?.map(({ _id }: any) => _id) : []);
  };

  return [
    {
      accessorFn: (row: any) => row?._id,
      id: 'Id',
      cell: ({ row: { original } }: any) => (
        <Checkbox
          checked={checkedUser?.includes(original?._id)}
          onChange={({ target }) => {
            handleSelectCompaniesById(target.checked, original?._id);
          }}
        />
      ),
      header: (
        <Checkbox
          onChange={({ target }) => {
            handleSelectAllCompanies(target.checked);
          }}
          checked={
            tableData?.length && checkedUser?.length === tableData?.length
          }
        />
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.username,
      id: 'name',
      cell: (info: any) => capitalizeFirstLetter(info?.getValue()) ?? 'N/A',
      header: 'Name',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.userData?.email,
      id: 'email',
      isSortable: true,
      header: 'Email',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => (
        <PermissionsGuard
          permissions={[AIR_SALES_SETTINGS?.ACTIVE_INACTIVE_USER]}
        >
          <SwitchBtn
            defaultChecked={
              info?.row?.original?.status === 'ACTIVE' ? true : false
            }
            name={info?.getValue()}
            handleSwitchChange={(val: any) =>
              handleUpdateStatus(info?.row?.original?._id, val)
            }
            disabled={info?.row?.original?.user === user?._id}
          />
        </PermissionsGuard>
      ),
    },
  ];
};
