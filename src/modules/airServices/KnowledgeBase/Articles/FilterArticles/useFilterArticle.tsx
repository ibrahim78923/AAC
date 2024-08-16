import { useForm, UseFormReturn } from 'react-hook-form';
import {
  filterArticlesDataDefaultValues,
  filterArticlesFormFieldsDynamic,
} from './FilterArticles.data';
import { useLazyGetUsersDropdownListForAuthorsQuery } from '@/services/airServices/knowledge-base/articles';
import { PAGINATION } from '@/config';
import { filteredEmptyValues } from '@/utils/api';
import { ArticlesPortalComponentPropsI } from '../Articles.interface';
import { FilterArticlesFormFieldsI } from './FilterArticles.interface';

export const useFilterArticles = (props: ArticlesPortalComponentPropsI) => {
  const { setIsPortalOpen, filterValues, setFilterValues, setPage } = props;

  const methods: UseFormReturn<FilterArticlesFormFieldsI> =
    useForm<FilterArticlesFormFieldsI>({
      defaultValues: filterArticlesDataDefaultValues?.(filterValues),
    });

  const { handleSubmit, reset } = methods;

  const submitHandler = (data: FilterArticlesFormFieldsI) => {
    const articleFilter = filteredEmptyValues(data);

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

  const filterArticlesFormFields =
    filterArticlesFormFieldsDynamic(apiQueryAuthor);

  return {
    submitHandler,
    setIsPortalOpen,
    methods,
    resetArticleFilterForm,
    onClose,
    handleSubmit,
    filterArticlesFormFields,
  };
};
