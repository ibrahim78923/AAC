import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

const useFilterCompany = ({
  filterValues,
  setFilterValues,
  setIsFilter,
}: any) => {
  const methods: any = useForm({});

  const { handleSubmit } = methods;

  const startedDate = 0;
  const endedDate = 1;

  const onSubmit = async (values: any) => {
    const { date } = values;

    const dateStarted = date?.[startedDate]
      ? dayjs(date[startedDate])?.format(DATE_FORMAT?.API)
      : null;
    const dateEnded = date?.[endedDate]
      ? dayjs(date[endedDate])?.format(DATE_FORMAT?.API)
      : null;

    setFilterValues({
      ...filterValues,
      industry: values?.industry,
      // commented for future use
      // name: values?.name,
      // crn: values?.crn,
      ownerId: values?.ownerId,
      dateStart: dateStarted,
      dateEnd: dateEnded,
    });

    setIsFilter(false);
  };

  return { methods, handleSubmit, onSubmit };
};

export default useFilterCompany;
