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

    const obj = {
      ...values,
      dateStart: date?.[startedDate]
        ? dayjs(date[startedDate])?.format(DATE_FORMAT?.API)
        : null,
      dateEnd: date?.[endedDate]
        ? dayjs(date[endedDate])?.format(DATE_FORMAT?.API)
        : null,
    };
    const filteredObj = Object?.fromEntries(
      Object?.entries(obj)?.filter(
        (value) => value[1] !== '' && value[1] !== null,
      ),
    );
    delete filteredObj?.date;
    setFilterValues({
      ...filterValues,
      ...filteredObj,
    });

    setIsFilter(false);
  };

  return { methods, handleSubmit, onSubmit };
};

export default useFilterCompany;
