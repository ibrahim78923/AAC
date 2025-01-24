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
      <ContainerGrid
        spacing={1}
        customStyles={{ justifyContent: 'space-between' }}
      >
        <CustomGrid lg={8.9}>
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
        </CustomGrid>
        <CustomGrid lg={3}>
          <Box
            borderLeft={{
              lg: `1px solid ${theme?.palette?.custom?.off_white_three}`,
              xs: ' none',
            }}
            borderTop={`1px solid ${theme?.palette?.custom?.off_white_three}`}
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
                  <CustomGrid
                    container
                    key={item?._id}
                    flexDirection={'column'}
                    spacing={1.5}
                  >
                    {item?.details?.map(
                      (ele: SingleViewArticleDetailArrayI) => (
                        <CustomGrid
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
                        </CustomGrid>
                      ),
                    )}
                  </CustomGrid>
                  <Divider sx={{ my: 2 }} />
                </Fragment>
              );
            })}
          </Box>
          <UpdateArticle />
        </CustomGrid>
      </ContainerGrid>
    </ApiRequestFlow>
  );
};
