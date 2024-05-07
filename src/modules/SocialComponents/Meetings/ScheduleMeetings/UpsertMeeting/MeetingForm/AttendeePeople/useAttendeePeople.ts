import { useRouter } from 'next/router';
import { useLazyGetContactDropdownQuery } from '@/services/dropdowns';
import { getSession } from '@/utils';
import { peopleTypes } from './AttendeePeople.data';

export const useAttendeePeople = (props: any) => {
  const { watch, setValue } = props;
  const router = useRouter();
  const watchPeople = watch('people');
  const contactDropdown = useLazyGetContactDropdownQuery();
  const organizer = getSession()?.user;
  const handleDateValues = (slot: any) => {
    setValue('startDate', new Date(slot?.date));
    setValue('endDate', new Date(slot?.date));
  };
  const peopleData =
    router?.query?.type === peopleTypes?.group ? watchPeople : [watchPeople];
  return {
    contactDropdown,
    peopleData,
    organizer,
    handleDateValues,
    router,
  };
};
