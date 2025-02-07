import { FLEX_DIRECTION } from '@/constants/style';
import { Box, Grid, Skeleton } from '@mui/material';
import { CARD_SKELETON_TYPES } from './SkeletonCard.data';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { SkeletonCardPropsI } from '../Skeletons.interface';

export const SkeletonCard = (props: SkeletonCardPropsI) => {
  const { length = 4, cardType = SKELETON_TYPES?.BASIC_CARD } = props;

  const mapSkeletonCard = CARD_SKELETON_TYPES?.[cardType];

  return (
    <Grid container spacing={2}>
      {Array.from({ length })?.map((item: any, id: any) => (
        <Grid
          key={item ?? `skeleton+${id}`}
          item
          xs={12}
          md={4}
          {...mapSkeletonCard?.gridSize}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              justifyContent: 'space-between',
              flexDirection: mapSkeletonCard?.flexDirection,
              px: mapSkeletonCard?.outerPadding?.x ?? 1,
              py: mapSkeletonCard?.outerPadding?.y ?? 1,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'custom.off_white_three',
            }}
          >
            {mapSkeletonCard?.hasCircularSkeleton && (
              <Skeleton
                animation="wave"
                variant={mapSkeletonCard?.isCircular}
                width={
                  mapSkeletonCard?.flexDirection === FLEX_DIRECTION?.COLUMN
                    ? mapSkeletonCard?.circularSkeletonSize?.width ?? 50
                    : mapSkeletonCard?.circularSkeletonSize?.width ?? 100
                }
                height={mapSkeletonCard?.circularSkeletonSize?.height ?? 50}
                sx={{
                  bgcolor: 'grey.300',
                  border: '1px solid',
                  borderColor: 'custom.off_white_three',
                }}
              />
            )}
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                gap: 2,
                flexDirection: mapSkeletonCard?.flexDirectionRectangular,
              }}
            >
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
              {mapSkeletonCard?.hasThirdSkeleton && (
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
              )}
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
