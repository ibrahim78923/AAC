import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DocumentTextIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
import { ExpenseImage } from '@/assets/images';
import Image from 'next/image';

export const PopularArticles = ({ articlesData = [], handleViewMore }: any) => {
  const { palette }: any = useTheme();
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={1.6}
        p={1}
        maxHeight={260}
        overflow={'scroll'}
      >
        {!!articlesData?.length ? (
          articlesData?.map((article: string) => (
            <Box
              key={uuidv4()}
              display={'flex'}
              alignItems={'center'}
              p={1}
              gap={0.6}
              borderRadius={1}
              flexBasis={{ xs: '100%', lg: '48%' }}
              sx={{ background: palette?.grey?.[100] }}
            >
              <DocumentTextIcon />
              <Typography variant="body2" color={palette?.grey?.[600]}>
                {article}
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
          <Button variant="text" onClick={() => handleViewMore()}>
            View More
          </Button>
        </Box>
      )}
    </>
  );
};
