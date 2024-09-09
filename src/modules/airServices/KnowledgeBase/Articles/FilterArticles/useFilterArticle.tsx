import { useForm, UseFormReturn } from 'react-hook-form';
import {
  filterArticlesDataDefaultValues,
  filterArticlesFormFieldsDynamic,
} from './FilterArticles.data';
import { useLazyGetUsersDropdownListForAuthorsQuery } from '@/services/airServices/knowledge-base/articles';
import { PAGINATION } from '@/config';
import { filteredEmptyValues } from '@/utils/api';
import { FilterArticlesFormFieldsI } from './FilterArticles.interface';
import {
  emptyFilterArticlesList,
  setFilterArticlesList,
  setIsPortalClose,
} from '@/redux/slices/airServices/knowledge-base/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';

export const useFilterArticles = () => {
  const dispatch = useAppDispatch();
  const isPortalOpen = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.isPortalOpen,
  );
  const filterArticlesList = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.filterArticlesList,
  );
  const methods: UseFormReturn<FilterArticlesFormFieldsI> =
    useForm<FilterArticlesFormFieldsI>({
      defaultValues: filterArticlesDataDefaultValues?.(filterArticlesList),
    });

  const { handleSubmit, reset } = methods;

  const submitHandler = (data: FilterArticlesFormFieldsI) => {
    const articleFilter = filteredEmptyValues(data);

    if (!Object?.keys(articleFilter || {})?.length) {
      dispatch(emptyFilterArticlesList());
      reset();
      onClose();
      return;
    }

    dispatch(
      setFilterArticlesList<any>({
        filterValues: articleFilter,
        page: PAGINATION?.CURRENT_PAGE,
      }),
    );
    onClose();
  };

  const resetArticleFilterForm = async () => {
    if (!!Object?.keys(filterArticlesList)?.length) {
      dispatch(emptyFilterArticlesList());
    }
    reset();
    onClose();
  };

  const onClose = () => {
    dispatch(setIsPortalClose());
  };

  const apiQueryAuthor = useLazyGetUsersDropdownListForAuthorsQuery();

  const filterArticlesFormFields =
    filterArticlesFormFieldsDynamic(apiQueryAuthor);

  return {
    submitHandler,
    methods,
    resetArticleFilterForm,
    onClose,
    handleSubmit,
    filterArticlesFormFields,
    isPortalOpen,
  };
};
