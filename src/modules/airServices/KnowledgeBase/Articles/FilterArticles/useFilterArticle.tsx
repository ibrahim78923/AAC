import { useForm } from 'react-hook-form';
import {
  filterArticlesDataDefaultValues,
  filterArticlesFormFieldsDynamic,
} from './FilterArticles.data';
import { useLazyGetUsersDropdownListForAuthorsQuery } from '@/services/airServices/knowledge-base/articles';
import useAuth from '@/hooks/useAuth';
import { PAGINATION } from '@/config';
import { filteredEmptyValues } from '@/utils/api';

export const useFilterArticles = (props: any) => {
  const {
    isOpenFilterDrawer,
    setIsPortalOpen,
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
    const articleFilter: any = filteredEmptyValues(data);

    if (!Object?.keys(articleFilter || {})?.length) {
      setFilterValues({});
      reset();
      onClose();
      return;
    }

    setPage(PAGINATION?.CURRENT_PAGE);
    setFilterValues(articleFilter);
    onClose();
  };

  const resetArticleFilterForm = async () => {
    if (!!Object?.keys(filterValues)?.length) {
      setFilterValues({});
    }
    reset();
    onClose();
  };

  const onClose = () => {
    setIsPortalOpen?.({});
  };

  const apiQueryAuthor = useLazyGetUsersDropdownListForAuthorsQuery();

  const filterArticlesFormFields = filterArticlesFormFieldsDynamic(
    apiQueryAuthor,
    productId,
  );

  return {
    submitHandler,
    isOpenFilterDrawer,
    setIsPortalOpen,
    methods,
    resetArticleFilterForm,
    onClose,
    handleSubmit,
    filterArticlesFormFields,
  };
};
