import { Grid, Box } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { useFilterArticles } from './useFilterArticle';
import { filterArticlesData } from './FilterArticles.data';

const FilterArticles = (props: any) => {
  const {
    submitHandler,
    resetArticleFilterForm,
    isOpenFilterDrawer,
    methods,
    onClose,
    handleSubmit,
  } = useFilterArticles(props);

  return (
    <CommonDrawer
      isDrawerOpen={isOpenFilterDrawer}
      onClose={() => {
        onClose();
      }}
      submitHandler={() => {
        handleSubmit?.(submitHandler)();
      }}
      title={'Filters'}
      okText={'Apply'}
      cancelText="Reset"
      isOk={true}
      footer={true}
      cancelBtnHandler={() => resetArticleFilterForm?.()}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={4}>
            {filterArticlesData?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
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
