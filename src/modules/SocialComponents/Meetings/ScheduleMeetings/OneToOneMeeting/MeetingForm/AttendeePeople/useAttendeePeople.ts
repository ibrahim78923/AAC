import { useLazyGetContactDropdownQuery } from '@/services/dropdowns';
import { getSession } from '@/utils';

export const useAttendeePeople = (props: any) => {
  const { watch } = props;
  const watchPeople = watch('people');
  const contactDropdown = useLazyGetContactDropdownQuery();
  const organizer = getSession()?.user;
  return {
    contactDropdown,
    watchPeople,
    organizer,
  };
};
