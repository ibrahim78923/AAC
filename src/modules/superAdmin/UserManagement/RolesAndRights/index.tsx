import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './RoleAndRights.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SUPER_ADMIN_ROLES_AND_RIGHTS_PERMISSIONS } from '@/constants/permission-keys';
import { IUsersProps } from '../Users/Users-interface';
import useUserManagement from '../useUserManagement';
import { useGetAdminRolesAndRightsQuery } from '@/services/superAdmin/user-management/roles-and-rights';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

const RolesAndRights = (props: IUsersProps) => {
  const {
    filterValues,
    checkedRows,
    setCheckedRows,
    searchVal,
    page,
    setPage,
    pageLimit,
    setPageLimit,
  } = props;

  const { handleRolesSwitchChange } = useUserManagement();

  const params = {
    page: page,
    limit: pageLimit,
    search: searchVal ? searchVal : undefined,
    status: filterValues?.status ? filterValues?.status : undefined,
    name: filterValues?.roleName ? filterValues?.roleName : undefined,
    dateStart: filterValues?.startDate
      ? dayjs(filterValues?.startDate)?.format(DATE_FORMAT?.API)
      : undefined,
    dateEnd: filterValues?.endDate
      ? dayjs(filterValues?.endDate)?.format(DATE_FORMAT?.API)
      : undefined,
  };

  const { data, isSuccess, isLoading } = useGetAdminRolesAndRightsQuery({
    params,
  });

  const handleCheckboxChange = (val: any, rowId: string) => {
    const newCheckedRows = val?.target?.checked ? rowId : null;
    setCheckedRows(newCheckedRows);
  };

  const columnsProps = {
    handleRolesSwitchChange: handleRolesSwitchChange,
    checkedRows: checkedRows,
    handleCheckboxChange: handleCheckboxChange,
  };

  const columnParams = columns(columnsProps);

  return (
    <>
      <PermissionsGuard
        permissions={[
          SUPER_ADMIN_ROLES_AND_RIGHTS_PERMISSIONS?.ROLES_RIGHTS_LIST,
        ]}
      >
        <TanstackTable
          columns={columnParams}
          data={data?.data?.companyaccountroles}
          onPageChange={(page: number) => setPage(page)}
          totalRecords={data?.data?.meta?.total}
          currentPage={data?.data?.meta?.page}
          pageLimit={data?.data?.meta?.limit}
          count={data?.data?.meta?.pages}
          setPageLimit={setPageLimit}
          isLoading={isLoading}
          isSuccess={isSuccess}
          setPage={setPage}
          isPagination
        />
      </PermissionsGuard>
    </>
  );
};

export default RolesAndRights;
