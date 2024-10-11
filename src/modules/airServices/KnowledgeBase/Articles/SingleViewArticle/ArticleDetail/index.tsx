import { Box, Divider, Grid, Typography } from '@mui/material';
import { Attachments } from '@/components/Attachments';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { useArticleDetail } from './useArticleDetail';
import {
  SingleViewArticleDetailArrayI,
  SingleViewArticleSideDataI,
} from '../SingleViewArticle.interface';
import { UpdateArticle } from '../UpdateArticle';
import { TruncateText } from '@/components/TruncateText';
import { Fragment } from 'react';

export const ArticleDetail = () => {
  const {
    theme,
    articleId,
    data,
    showLoader,
    showError,
    getSingleArticle,
    articleDetails,
    isApiCalled,
  } = useArticleDetail();

  if (isApiCalled)
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
        <Typography variant="h3" color="slateBlue.main" my={2}>
          <TruncateText text={data?.data?.title?.toLowerCase()} />
        </Typography>
        <Box
          sx={{ wordBreak: 'break-all', overflow: 'auto' }}
          dangerouslySetInnerHTML={{ __html: data?.data?.details }}
        ></Box>
        {!!articleId && (
          <>
            <Typography
              variant="body1"
              fontWeight="fontWeightMedium"
              color="slateBlue.main"
              my={2}
            >
              Attachments
            </Typography>
            <Box>
              <Attachments
                recordId={articleId as string}
                size={{ width: '100%', height: '100%' }}
                permissionKey={[]}
                hasStyling={false}
                canDelete={false}
              />
            </Box>
          </>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        lg={3}
        borderLeft={{
          lg: `1px solid ${theme?.palette?.custom?.off_white_three}`,
          xs: ' none',
        }}
        borderTop={`1px solid ${theme?.palette?.custom?.off_white_three}`}
      >
        <>
          {articleDetails?.map((item: SingleViewArticleSideDataI) => {
            return (
              <Fragment key={item?._id}>
                <Typography
                  variant="body2"
                  fontWeight={'fontWeightSmall'}
                  color="slateBlue.main"
                  my={2}
                >
                  {item?.heading}
                </Typography>
                <Grid
                  container
                  key={item?._id}
                  flexDirection={'column'}
                  spacing={1.5}
                >
                  {item?.details?.map((ele: SingleViewArticleDetailArrayI) => (
                    <Grid
                      item
                      key={ele?._id}
                      display={'flex'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      gap={2}
                    >
                      <Typography variant="body3" color={'grey.600'}>
                        {ele?.title}
                      </Typography>
                      <Typography variant="body4" color="slateBlue.main">
                        {ele?.des}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
                <Divider sx={{ my: 2 }} />
              </Fragment>
            );
          })}
        </>
        <UpdateArticle />
      </Grid>
    </Grid>
  );
};
