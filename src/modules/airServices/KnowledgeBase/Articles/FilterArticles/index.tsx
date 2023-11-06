import { Grid, Box } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { useFilterArticles } from './useFilterArticle';
import { filterArticlesData } from './FilterArticles.data';

const ArticleFilter = (props: any) => {
  const { submitHandler, isOpenFilterDrawer, setIsOpenFilterDrawer, methods } =
    useFilterArticles(props);

  return (
    <CommonDrawer
      isDrawerOpen={isOpenFilterDrawer}
      onClose={() => {
        setIsOpenFilterDrawer(false);
      }}
      submitHandler={submitHandler}
      title={'Filter'}
      okText={'Apply'}
      isOk={true}
      footer={true}
    >
      <Box mt={1}>
        <FormProvider methods={methods} onSubmit={submitHandler}>
          <Grid container spacing={4}>
            {filterArticlesData?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item?.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default ArticleFilter;
