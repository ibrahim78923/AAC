import { Attachments } from '@/components/Attachments';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { CustomLinearProgress } from '@/components/ProgressBars/CustomLinearProgress';
import { Box, Typography } from '@mui/material';
import { useSingleArticle } from './useSingleArticle';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';

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
        <Box
          sx={{ wordBreak: 'break-all', overflow: 'auto' }}
          dangerouslySetInnerHTML={{
            __html: singleArticlesData?.details,
          }}
        />
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
