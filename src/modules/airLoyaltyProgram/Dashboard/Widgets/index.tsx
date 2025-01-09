import {
  Avatar,
  Box,
  Button,
  Grid,
  LinearProgress,
  Skeleton,
  Typography,
} from '@mui/material';
import { useWidgets } from './useWidgets';
import ApiErrorState from '@/components/ApiErrorState';
import { pxToRem } from '@/utils/getFontValue';
import { Autorenew } from '@mui/icons-material';

export const Widgets = () => {
  const {
    isHoveredId,
    setIsHoveredId,
    theme,
    widgetsData,
    isFetching,
    isLoading,
    isError,
    timeLapse,
    refetch,
  } = useWidgets();
  if (isError) {
    return <ApiErrorState height="30vh" />;
  }
  return (
    <Box>
      <Box textAlign={'end'} mb={1}>
        <Button
          className="small"
          color="inherit"
          size="small"
          startIcon={<Autorenew />}
          onClick={refetch}
          disabled={isLoading || isFetching}
          sx={{
            fontSize: pxToRem(12),
            fontWeight: 'fontWeightRegular',
            textTransform: 'lowercase',
          }}
        >
          {isLoading || isFetching ? (
            <Box>
              <LinearProgress sx={{ width: pxToRem(70) }} />
            </Box>
          ) : (
            timeLapse?.lastFetchLapseTime
          )}
        </Button>
      </Box>
      <Grid container spacing={3}>
        {widgetsData?.map((widget: any) => {
          if (isLoading || isFetching) {
            return (
              <Grid item xs={12} md={6} lg={3} key={widget?._id}>
                <Skeleton
                  variant={'rounded'}
                  height={95}
                  sx={{
                    border: 1,
                    borderColor: 'custom.pale_gray',
                    borderRadius: 3,
                    bgcolor: 'common.white',
                    p: 2,
                  }}
                />
              </Grid>
            );
          }
          return (
            <Grid item xs={12} md={6} lg={3} key={widget?._id}>
              <Box
                border={1}
                borderColor={'custom.pale_gray'}
                borderRadius={3}
                bgcolor={'common.white'}
                p={2}
                display={'flex'}
                alignItems={'center'}
                gap={1}
                onMouseEnter={() => setIsHoveredId(widget?._id)}
                onMouseLeave={() => setIsHoveredId(null)}
                sx={{
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: `0px 0px 0px 3px ${theme?.palette?.custom?.aqua_breeze}`,
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: theme?.palette?.grey?.[400],
                    width: 42,
                    height: 42,
                  }}
                >
                  <widget.avatar
                    fill={
                      widget?._id === isHoveredId
                        ? theme?.palette?.primary?.main
                        : undefined
                    }
                  />
                </Avatar>

                <Box>
                  <Typography
                    variant={'body3'}
                    color={'grey.900'}
                    fontWeight={600}
                  >
                    {widget?.title}
                  </Typography>
                  <Typography
                    variant={'subtitle1'}
                    component={'p'}
                    color={'grey.600'}
                  >
                    {widget?.count ?? 0}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
