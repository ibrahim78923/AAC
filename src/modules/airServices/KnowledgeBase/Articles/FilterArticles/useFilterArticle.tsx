import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  filterArticlesDataDefaultValues,
  filterArticlesValidationSchema,
} from './FilterArticles.data';

export const useFilterArticles = (props: any) => {
  const { isOpenFilterDrawer, setIsOpenFilterDrawer } = props;
  const methods: any = useForm({
    resolver: yupResolver(filterArticlesValidationSchema),
    defaultValues: filterArticlesDataDefaultValues,
  });
  const { handleSubmit } = methods;
  const submitHandler = handleSubmit(() => {
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
