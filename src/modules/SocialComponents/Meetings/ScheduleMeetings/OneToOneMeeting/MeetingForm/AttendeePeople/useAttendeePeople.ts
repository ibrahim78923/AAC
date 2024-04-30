import { useLazyGetContactDropdownQuery } from '@/services/dropdowns';
import { getSession } from '@/utils';

export const useAttendeePeople = (props: any) => {
  const { watch, setValue } = props;
  const watchPeople = watch('people');
  const contactDropdown = useLazyGetContactDropdownQuery();
  const organizer = getSession()?.user;
  const handleDateValues = (slot: any) => {
    setValue('fromDate', new Date(slot?.date));
    setValue('toDate', new Date(slot?.date));
  };
  return {
    contactDropdown,
    watchPeople,
    organizer,
    handleDateValues,
  };
};
