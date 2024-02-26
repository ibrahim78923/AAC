import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DocumentTextIcon } from '@/assets/icons';
import { ExpenseImage } from '@/assets/images';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { AIR_CUSTOMER_PORTAL } from '@/constants';

export const PopularArticles = ({ articlesData = [], handleViewMore }: any) => {
  const { palette }: any = useTheme();
  const router = useRouter();
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={1.6}
        p={1}
        borderRadius={2}
        maxHeight={260}
        overflow={'scroll'}
      >
        {!!articlesData?.length ? (
          articlesData?.map((article: any) => (
            <Box
              key={article?._id}
              display={'flex'}
              alignItems={'center'}
              p={1}
              gap={0.6}
              borderRadius={2}
              flexBasis={{ xs: '100%', sm: '48%', lg: '32%' }}
              sx={{ background: palette?.grey?.[100] }}
              onClick={() =>
                router?.push({
                  pathname: AIR_CUSTOMER_PORTAL?.KNOWLEDGE_BASE_TICKET_DETAIL,
                  query: {
                    articleId: article?._id,
                    folderId: article?.folder?._id,
                  },
                })
              }
            >
              <DocumentTextIcon />
              <Typography variant="body2" color={palette?.grey?.[600]}>
                {article?.title}
              </Typography>
            </Box>
          ))
        ) : (
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            flexDirection={'column'}
            width={'100%'}
          >
            <Image src={ExpenseImage} width={0} height={0} alt="Not Found" />
            <Typography variant="h6">Articles Not Found</Typography>
          </Box>
        )}
      </Box>
      {!!articlesData?.length && (
        <Box width={'100%'} display={'flex'} justifyContent={'center'}>
          <Button
            variant="text"
            sx={{ mb: 1 }}
            onClick={() => handleViewMore()}
          >
            View More
          </Button>
        </Box>
      )}
    </>
  );
};
