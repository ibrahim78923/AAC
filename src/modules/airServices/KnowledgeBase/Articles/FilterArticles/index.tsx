import { Box } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { useFilterArticles } from './useFilterArticle';
import { FormGrid } from '@/components/Grids/FormGrid';

const FilterArticles = () => {
  const {
    submitHandler,
    resetArticleFilterForm,
    methods,
    onClose,
    handleSubmit,
    filterArticlesFormFields,
    isPortalOpen,
  } = useFilterArticles();

  return (
    <CommonDrawer
      isDrawerOpen={isPortalOpen?.isOpen as boolean}
      onClose={onClose}
      submitHandler={handleSubmit?.(submitHandler)}
      title={'Filters'}
      okText={'Apply'}
      cancelText="Reset"
      isOk
      footer
      cancelBtnHandler={resetArticleFilterForm}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <FormGrid formFieldsList={filterArticlesFormFields} />
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default FilterArticles;
