import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { ROLES } from '@/constants/strings';
import { useLazyAllUserDropdownQuery } from '@/services/airServices/feedback-survey';
import { getSession } from '@/utils';

export const AddPeopleDropdown = ({
  name,
  label,
}: {
  name: string;
  label: string;
}) => {
  const userDropdown = useLazyAllUserDropdownQuery();
  const sessionUser: any = getSession();
  return (
    <RHFAutocompleteAsync
      name={name}
      label={label}
      size={'small'}
      placeholder="Enter People"
      multiple
      required
      apiQuery={userDropdown}
      externalParams={{
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
        role: ROLES?.ORG_EMPLOYEE,
        organization: sessionUser?.user?.organization?._id,
      }}
      getOptionLabel={(option: any) => (option?.email ? option?.email : option)}
      isOptionEqualToValue={(option: any, newValue: any) =>
        newValue?.email
          ? option?.email === newValue?.email
          : option?.email === newValue
      }
    />
  );
};
