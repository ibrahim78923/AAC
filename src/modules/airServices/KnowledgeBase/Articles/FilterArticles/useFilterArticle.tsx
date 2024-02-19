import { useForm } from 'react-hook-form';
import {
  filterArticlesDataDefaultValues,
  filterArticlesFormFieldsDynamic,
} from './FilterArticles.data';
import { useLazyGetUsersDropdownQuery } from '@/services/airServices/knowledge-base/articles';

export const useFilterArticles = (props: any) => {
  const {
    isOpenFilterDrawer,
    setIsOpenFilterDrawer,
    filterValues,
    setFilterValues,
    setPage,
  } = props;
  const methods: any = useForm({
    defaultValues: filterArticlesDataDefaultValues?.(filterValues),
  });
  const { handleSubmit, reset } = methods;
  const submitHandler = (data: any) => {
    const articleFilter: any = Object?.entries(data || {})
      ?.filter(
        ([, value]: any) => value !== undefined && value != '' && value != null,
      )
      ?.reduce((acc: any, [key, value]: any) => ({ ...acc, [key]: value }), {});
    if (!Object?.keys(articleFilter || {})?.length) {
      setFilterValues({});
      reset();
      onClose();
      return;
    }
    setPage(1);
    setFilterValues(articleFilter);
    setIsOpenFilterDrawer?.(false);
  };

  const resetArticleFilterForm = async () => {
    if (!!Object?.keys(filterValues)?.length) {
      setFilterValues({});
    }
    reset();
    setIsOpenFilterDrawer?.(false);
  };

  const onClose = () => {
    setIsOpenFilterDrawer?.(false);
  };
  const apiQueryAuthor = useLazyGetUsersDropdownQuery();
  const filterArticlesFormFields =
    filterArticlesFormFieldsDynamic(apiQueryAuthor);
  return {
    submitHandler,
    isOpenFilterDrawer,
    setIsOpenFilterDrawer,
    methods,
    resetArticleFilterForm,
    onClose,
    handleSubmit,
    filterArticlesFormFields,
  };
};
