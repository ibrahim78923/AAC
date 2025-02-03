import { CustomGrid } from '@/components/Grids/CustomGrid';
import { Box, Skeleton } from '@mui/material';

export const ItemSkeleton = (props: any) => {
  const { length = 4, sm = 6, md = 6, lg = 4, xl = 3 } = props;
  return (
    <>
      {Array.from({ length })?.map((item: any, id: number) => (
        <CustomGrid
          md={md}
          sm={sm}
          lg={lg}
          xl={xl}
          key={item ?? `skeleton+${id}`}
        >
          <Box
            sx={{
              p: 2,
              height: '100%',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'custom.off_white_three',
            }}
          >
            <Skeleton
              animation="wave"
              variant={'rectangular'}
              width={50}
              height={50}
              sx={{
                margin: 'auto',
                bgcolor: 'grey.300',
                border: '1px solid',
                borderColor: 'custom.off_white_three',
              }}
            />
            <br />
            <Skeleton
              animation="wave"
              variant={'rectangular'}
              width={'100%'}
              height={25}
              sx={{
                bgcolor: 'grey.300',
                border: '1px solid',
                borderColor: 'custom.off_white_three',
              }}
            />
            <br />
            <Skeleton
              animation="wave"
              variant={'rectangular'}
              width={'100%'}
              height={25}
              sx={{
                bgcolor: 'grey.300',
                border: '1px solid',
                borderColor: 'custom.off_white_three',
              }}
            />
          </Box>
        </CustomGrid>
      ))}
    </>
  );
};
