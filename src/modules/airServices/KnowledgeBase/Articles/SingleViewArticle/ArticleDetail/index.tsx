import { Box, Divider, Typography } from '@mui/material';
import { Attachments } from '@/components/Attachments';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { useArticleDetail } from './useArticleDetail';
import {
  SingleViewArticleDetailArrayI,
  SingleViewArticleSideDataI,
} from '../SingleViewArticle.interface';
import { UpdateArticle } from '../UpdateArticle';
import { TruncateText } from '@/components/TruncateText';
import { Fragment } from 'react';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { HtmlRenderer } from '@/components/DataDisplay/HtmlRenderer';

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

  return (
    <ApiRequestFlow
      showSkeleton={showLoader}
      hasError={showError}
      refreshApi={getSingleArticle}
    >
      <ContainerGrid>
        <CustomGrid lg={8.9}>
          <Box sx={{ height: '100%' }}>
            <Typography variant="h3" color="slateBlue.main" my={2}>
              <TruncateText
                text={data?.data?.title?.toLowerCase()}
                size={50}
                isCapital={false}
              />
            </Typography>
            {!!data?.data?.details ? (
              <HtmlRenderer
                hasEditor
                maxHeight="none"
                description={data?.data?.details}
              />
            ) : (
              <Typography>No description available</Typography>
            )}
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
                    hasNoDeletePermission
                    hasStyling={false}
                    canDelete={false}
                  />
                </Box>
              </>
            )}
          </Box>
        </CustomGrid>

        <CustomGrid lg={3}>
          <Box
            sx={{
              height: '100%',
              px: { xs: 1, md: 2 },
              borderLeft: {
                lg: `1px solid ${theme?.palette?.custom?.off_white_three}`,
                xs: ' none',
              },
              borderTop: `1px solid ${theme?.palette?.custom?.off_white_three}`,
            }}
          >
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
                  <Box>
                    {item?.details?.map(
                      (ele: SingleViewArticleDetailArrayI) => (
                        <Box
                          key={ele?._id}
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: 2,
                            my: 2,
                          }}
                        >
                          <Typography variant="body3" color={'grey.600'}>
                            {ele?.title}
                          </Typography>
                          <Typography variant="body4" color="slateBlue.main">
                            {ele?.des}
                          </Typography>
                        </Box>
                      ),
                    )}
                  </Box>
                  <Divider sx={{ my: 2 }} />
                </Fragment>
              );
            })}
            <br />
            <UpdateArticle />
          </Box>
        </CustomGrid>
      </ContainerGrid>
    </ApiRequestFlow>
  );
};
