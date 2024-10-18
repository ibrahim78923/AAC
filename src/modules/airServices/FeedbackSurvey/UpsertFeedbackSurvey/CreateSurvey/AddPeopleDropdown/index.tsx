import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyAllUserDropdownQuery } from '@/services/airServices/feedback-survey';
import { getSession } from '@/utils';

export const AddPeopleDropdown = ({
  name,
  label,
  size,
}: {
  name: string;
  label: string;
  size: string;
}) => {
  const userDropdown = useLazyAllUserDropdownQuery();
  const sessionUser: any = getSession();
  return (
    <RHFAutocompleteAsync
      name={name}
      label={label}
      size={size}
      placeholder="Enter People"
      multiple
      required
      apiQuery={userDropdown}
      externalParams={{
        limit: 5000,
        role: 'ORG_EMPLOYEE',
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
