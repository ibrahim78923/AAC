import { Box, Divider, Grid, Typography } from '@mui/material';
import FiberManualRecordSharpIcon from '@mui/icons-material/FiberManualRecordSharp';
import { Attachments } from '@/components/Attachments';
import { truncateText } from '@/utils/avatarUtils';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { useArticleDetail } from './useArticleDetail';
import { styles } from './ArticleDetail.style';
import {
  SingleViewArticleDetailArrayI,
  SingleViewArticleSideDataI,
} from '../SingleViewArticle.interface';
import { sideData } from './ArticleDetail.data';
import { UpdateArticle } from '../UpdateArticle';

export const ArticleDetail = () => {
  const { theme, articleId, data, showLoader, showError, getSingleArticle } =
    useArticleDetail();

  if (!data?.data?._id)
    return (
      <Box height={'100vh'}>
        <SkeletonForm />;
      </Box>
    );

  if (showLoader) return <SkeletonForm />;
  if (showError)
    return (
      <ApiErrorState
        message="No Article Found"
        canRefresh
        refresh={getSingleArticle}
      />
    );

  return (
    <Grid container spacing={1} justifyContent={'space-between'}>
      <Grid item xs={12} lg={8.9}>
        <Typography variant="h3" fontWeight={600} color="slateBlue.main" my={2}>
          {truncateText(data?.data?.title, 40)}
        </Typography>
        <Box
          sx={{ wordBreak: 'break-all' }}
          dangerouslySetInnerHTML={{ __html: data?.data?.details }}
        ></Box>
        {!!articleId && (
          <>
            <Typography
              variant="body1"
              fontWeight={500}
              color="slateBlue.main"
              my={2}
            >
              {' '}
              Attachments{' '}
            </Typography>
            <Box>
              <Attachments
                recordId={articleId as string}
                size={{ width: '100%', height: '100%' }}
                permissionKey={[]}
              />
            </Box>
          </>
        )}
      </Grid>
      <Grid item xs={12} lg={3}>
        <Box sx={styles?.sideStyle(theme)}>
          <Box>
            {sideData?.(data?.data)?.map((item: SingleViewArticleSideDataI) => {
              return (
                <Grid
                  container
                  key={item?._id}
                  flexDirection={'column'}
                  spacing={1.5}
                  mt={2}
                >
                  <Grid item>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      color="slateBlue.main"
                    >
                      {item?.heading}
                    </Typography>
                  </Grid>
                  {item?.details?.map((ele: SingleViewArticleDetailArrayI) => (
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
                  <Box mt={1} maxHeight={100} overflow={'auto'} p={1}>
                    {item?.keyword && (
                      <Grid item display={'flex'} flexWrap={'wrap'} gap={1}>
                        {!!item?.keyword?.length ? (
                          item?.keyword?.map((item: string, index: number) => (
                            <Typography
                              key={index ?? item}
                              variant="body2"
                              sx={styles?.keywordStyle(theme)}
                            >
                              {
                                <FiberManualRecordSharpIcon
                                  fontSize={'inherit'}
                                />
                              }
                              {item}
                            </Typography>
                          ))
                        ) : (
                          <Typography variant="body2"> --- </Typography>
                        )}
                      </Grid>
                    )}
                  </Box>
                  <Divider sx={{ mt: 2 }} />
                </Grid>
              );
            })}
          </Box>
          <UpdateArticle />
        </Box>
      </Grid>
    </Grid>
  );
};
