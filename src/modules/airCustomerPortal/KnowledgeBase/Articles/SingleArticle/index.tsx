import { Attachments } from '@/components/Attachments';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { CustomLinearProgress } from '@/components/ProgressBars/CustomLinearProgress';
import { Box, Typography } from '@mui/material';
import { useSingleArticle } from './useSingleArticle';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { HtmlRenderer } from '@/components/DataDisplay/HtmlRenderer';

export const SingleArticle = () => {
  const { singleArticlesData, handlePageBack, showLoader, isError, refetch } =
    useSingleArticle();

  return (
    <Box sx={{ height: '100%' }}>
      <PageTitledHeader
        title={
          showLoader ? <CustomLinearProgress /> : singleArticlesData?.title
        }
        canMovedBack
        moveBack={handlePageBack}
      />
      <ApiRequestFlow
        showSkeleton={showLoader}
        hasError={isError}
        refreshApi={refetch}
      >
        {!!singleArticlesData?.details ? (
          <HtmlRenderer
            maxHeight="none"
            description={singleArticlesData?.details}
          />
        ) : (
          <Typography>No description available</Typography>
        )}
        {!!singleArticlesData?._id && (
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
                recordId={singleArticlesData?._id as string}
                size={{ width: '100%', height: '100%' }}
                hasNoDeletePermission
                hasStyling={false}
                canDelete={false}
              />
            </Box>
          </>
        )}
      </ApiRequestFlow>
    </Box>
  );
};
