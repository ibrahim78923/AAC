import { Grid, Box } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { useFilterArticles } from './useFilterArticle';
import { ArticlesPortalComponentPropsI } from '../Articles.interface';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';

const FilterArticles = (props: ArticlesPortalComponentPropsI) => {
  const { isPortalOpen } = props;
  const {
    submitHandler,
    resetArticleFilterForm,
    methods,
    onClose,
    handleSubmit,
    filterArticlesFormFields,
  } = useFilterArticles(props);

  return (
    <CommonDrawer
      isDrawerOpen={isPortalOpen?.isFilter as boolean}
      onClose={() => {
        onClose();
      }}
      submitHandler={() => {
        handleSubmit?.(submitHandler)();
      }}
      title={'Filters'}
      okText={'Apply'}
      cancelText="Reset"
      isOk
      footer
      cancelBtnHandler={() => resetArticleFilterForm?.()}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {filterArticlesFormFields?.map((item: ReactHookFormFieldsI) => (
              <Grid item xs={12} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default FilterArticles;
