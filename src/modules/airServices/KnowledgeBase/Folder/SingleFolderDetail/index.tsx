import { EditGreyIcon } from '@/assets/icons';
import { truncateText } from '@/utils/avatarUtils';
import { DeleteForever } from '@mui/icons-material';
import { Box, Divider, Skeleton, Typography } from '@mui/material';
import { useSingleFolderDetail } from './useSingleFolderDetail';
import ApiErrorState from '@/components/ApiErrorState';
import { ALL_FOLDER } from '../Folder.data';

export const SingleFolderDetail = () => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
    openUpsertFolderPortal,
    openDeleteFolderPortal,
    selectedFolder,
  } = useSingleFolderDetail();

  if (selectedFolder?._id === ALL_FOLDER) return <></>;
  if (isLoading || isFetching) return <Skeleton height="10vh" />;
  if (isError)
    return (
      <>
        <Box maxHeight={'40vh'} overflow="auto">
          <ApiErrorState height="100%" canRefresh refresh={refetch} />
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
        {truncateText(data?.data?.name)}
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
          <Box sx={{ cursor: 'pointer' }} onClick={openUpsertFolderPortal}>
            <EditGreyIcon />
          </Box>
          <Box>
            <DeleteForever
              sx={{ cursor: 'pointer' }}
              onClick={openDeleteFolderPortal}
            />
          </Box>
        </Box>
      </Box>
      <Divider />
      <br />
    </>
  );
};
