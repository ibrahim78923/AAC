import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import useAuth from '@/hooks/useAuth';
import { PAGINATION } from '@/config';
import { ROLES } from '@/constants/strings';
import { useLazyGetUsersDropdownListForDepartmentHeadQuery } from '@/services/airServices/settings/user-management/departments';

export const DepartmentHeadListDropdown = () => {
  const auth: any = useAuth();
  const headAPiQuery = useLazyGetUsersDropdownListForDepartmentHeadQuery?.();

  return (
    <RHFAutocompleteAsync
      size="small"
      name="departmentHeadDetails"
      label="Department Head"
      fullWidth={true}
      apiQuery={headAPiQuery}
      getOptionLabel={(option: any) =>
        `${option?.firstName} ${option?.lastName}`
      }
      placeholder="Select"
      externalParams={{
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
        organization: auth?.user?.organization?._id,
        role: ROLES?.ORG_ADMIN,
      }}
    />
  );
};
