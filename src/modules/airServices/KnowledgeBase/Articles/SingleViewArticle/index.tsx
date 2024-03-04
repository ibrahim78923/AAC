import { Box, Divider, Grid, Skeleton, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FiberManualRecordSharpIcon from '@mui/icons-material/FiberManualRecordSharp';
import { styles } from './SingleViewArticle.style';
import { useSingleViewArticle } from './useSingleViewArticle';
import { sideData } from './SingleViewArticle.data';
import { DeleteArticles } from '../DeleteArticles';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES } from '@/constants';

export const SingleViewArticle = () => {
  const {
    theme,
    openDelete,
    articleId,
    setOpenDelete,
    data,
    isLoading,
    isFetching,
    router,
    // isError,
  } = useSingleViewArticle();

  if (isLoading || isFetching) return <Skeleton />;

  return (
    <>
      <Grid container spacing={1} justifyContent={'space-between'}>
        <Grid item xs={12} lg={8.9}>
          <PageTitledHeader
            title={'View Article'}
            canMovedBack
            moveBack={() => {
              router?.push(AIR_SERVICES?.KNOWLEDGE_BASE);
            }}
          />
          <Box
            sx={{ wordBreak: 'break-all' }}
            dangerouslySetInnerHTML={{ __html: data?.data?.details }}
          ></Box>
        </Grid>
        <Grid item xs={12} lg={3}>
          <Box sx={styles?.sideStyle(theme)}>
            <Box>
              {sideData?.(data?.data)?.map((item: any) => {
                return (
                  <Grid
                    container
                    key={item?._id}
                    flexDirection={'column'}
                    spacing={1.5}
                    mt={2}
                  >
                    <Grid item>
                      <Typography variant="body2" fontWeight={500}>
                        {item?.heading}
                      </Typography>
                    </Grid>
                    {item?.details?.map((ele: any) => (
                      <Grid
                        item
                        key={ele?._id}
                        display={'flex'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                      >
                        <Typography
                          variant="body3"
                          color={theme?.palette?.grey?.[600]}
                        >
                          {ele?.title}
                        </Typography>
                        <Typography
                          variant="body4"
                          sx={styles?.desStyle(ele?.des, theme)}
                        >
                          {ele?.des}
                        </Typography>
                      </Grid>
                    ))}
                    {item?.keyword && (
                      <Grid item display={'flex'} flexWrap={'wrap'} gap={1}>
                        {!!item?.keyword?.length
                          ? item?.keyword?.map((i: any) => (
                              <Typography
                                key={i?._id}
                                variant="body2"
                                sx={styles?.keywordStyle(theme)}
                              >
                                {
                                  <FiberManualRecordSharpIcon
                                    fontSize={'inherit'}
                                  />
                                }
                                {i}
                              </Typography>
                            ))
                          : []}
                      </Grid>
                    )}
                    <Divider sx={{ mt: 2 }} />
                  </Grid>
                );
              })}
            </Box>
            <Box display={'flex'} flexDirection={'column'} gap={1}>
              <LoadingButton
                variant="contained"
                color="primary"
                onClick={() => {
                  router?.push({
                    pathname: AIR_SERVICES?.UPSERT_ARTICLE,
                    query: {
                      articleId,
                    },
                  });
                }}
                fullWidth
              >
                Edit
              </LoadingButton>
              <LoadingButton
                variant="text"
                color="error"
                onClick={() => setOpenDelete(true)}
                fullWidth
              >
                Delete
              </LoadingButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <DeleteArticles
        deleteModalOpen={openDelete}
        setDeleteModalOpen={setOpenDelete}
        selectedArticlesData={[articleId]}
        moveBack={true}
      />
    </>
  );
};
