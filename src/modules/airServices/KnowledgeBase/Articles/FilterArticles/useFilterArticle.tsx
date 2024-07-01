import { useForm } from 'react-hook-form';
import {
  filterArticlesDataDefaultValues,
  filterArticlesFormFieldsDynamic,
} from './FilterArticles.data';
import { useLazyGetUsersDropdownListForAuthorsQuery } from '@/services/airServices/knowledge-base/articles';
import useAuth from '@/hooks/useAuth';

export const useFilterArticles = (props: any) => {
  const {
    isOpenFilterDrawer,
    setIsOpenFilterDrawer,
    filterValues,
    setFilterValues,
    setPage,
  } = props;

  const auth: any = useAuth();

  const { _id: productId } = auth?.product;
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
  const apiQueryAuthor = useLazyGetUsersDropdownListForAuthorsQuery();

  const filterArticlesFormFields = filterArticlesFormFieldsDynamic(
    apiQueryAuthor,
    productId,
  );

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
