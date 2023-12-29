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

    const dateStart = date?.[startedDate]
      ? dayjs(date[startedDate])?.format(DATE_FORMAT?.API)
      : null;
    const dateEnd = date?.[endedDate]
      ? dayjs(date[endedDate])?.format(DATE_FORMAT?.API)
      : null;

    setFilterValues({
      ...filterValues,
      industry: values?.industry,
      name: values?.name,
      crn: values?.crn,
      ownerId: values?.ownerId,
      dateStart: dateStart,
      dateEnd: dateEnd,
    });

    setIsFilter(false);
  };

  return { methods, handleSubmit, onSubmit };
};

export default useFilterCompany;
