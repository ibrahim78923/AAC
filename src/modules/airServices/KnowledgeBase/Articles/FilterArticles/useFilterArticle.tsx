import { useForm } from 'react-hook-form';
import { filterArticlesDataDefaultValues } from './FilterArticles.data';

export const useFilterArticles = (props: any) => {
  const { isOpenFilterDrawer, setIsOpenFilterDrawer, handleFilterValues } =
    props;
  const methods: any = useForm({
    defaultValues: filterArticlesDataDefaultValues,
  });
  const { handleSubmit } = methods;
  const submitHandler = handleSubmit((values: any) => {
    handleFilterValues(values);
    setIsOpenFilterDrawer(false);
    methods?.reset(filterArticlesDataDefaultValues);
  });
  return {
    submitHandler,
    isOpenFilterDrawer,
    setIsOpenFilterDrawer,
    methods,
  };
};
