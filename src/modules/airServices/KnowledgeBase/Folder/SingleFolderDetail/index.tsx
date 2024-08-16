import { EditGreyIcon } from '@/assets/icons';
import { truncateText } from '@/utils/avatarUtils';
import { DeleteForever } from '@mui/icons-material';
import { Box, Divider, Skeleton, Typography } from '@mui/material';
import { ArticlesPortalComponentPropsI } from '../../Articles/Articles.interface';
import { useSingleFolderDetail } from './useSingleFolderDetail';
import ApiErrorState from '@/components/ApiErrorState';

export const SingleFolderDetail = (props: ArticlesPortalComponentPropsI) => {
  const { setIsPortalOpen } = props;
  const { data, isLoading, isFetching, isError, refetch } =
    useSingleFolderDetail(props);

  if (isLoading || isFetching) return <Skeleton height="10vh" />;
  if (isError)
    return (
      <>
        <Box maxHeight={'40vh'} overflow="auto">
          <ApiErrorState height="100%" canRefresh refresh={() => refetch?.()} />
        </Box>
        <br />
      </>
    );
  return (
    <>
      <Typography
        variant="h4"
        color="slateBlue.main"
        textTransform={'capitalize'}
      >
        {data?.data?.name}
      </Typography>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        mb={1}
      >
        <Typography variant="body2" my={0.5} color="grey.900">
          {truncateText(data?.data?.description || '---', 150)}
        </Typography>
        <Box display={'flex'} gap={2} alignItems={'center'}>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() =>
              setIsPortalOpen?.({
                isOpen: true,
                isUpsertFolder: true,
                data: data?.data,
              })
            }
          >
            <EditGreyIcon />
          </Box>
          <Box>
            <DeleteForever
              sx={{ cursor: 'pointer' }}
              onClick={() =>
                setIsPortalOpen?.({
                  isOpen: true,
                  isDeleteFolder: true,
                  data: data?.data,
                })
              }
            />
          </Box>
        </Box>
      </Box>
      <Divider />
      <br />
    </>
  );
};
