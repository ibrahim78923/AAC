import { EditGreyIcon } from '@/assets/icons';
import { DeleteForever } from '@mui/icons-material';
import { Box, Divider, Skeleton } from '@mui/material';
import { useSingleFolderDetail } from './useSingleFolderDetail';
import ApiErrorState from '@/components/ApiErrorState';
import { ALL_FOLDER } from '../Folder.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_FOLDER_LIST_PERMISSIONS } from '@/constants/permission-keys';
import { TruncateText } from '@/components/TruncateText';

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
    <Box maxHeight={'20vh'} overflow="auto">
      <TruncateText
        text={data?.data?.name?.toLowerCase()}
        size={45}
        boxProps={{
          variant: 'h4',
          textTransform: 'capitalize',
          color: 'slateBlue.main',
        }}
      />
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        mb={1}
      >
        <TruncateText
          text={!!data?.data?.description ? data?.data?.description : '---'}
          size={100}
          boxProps={{ variant: 'body2', my: 0.5, color: 'grey.900' }}
        />
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_FOLDER_LIST_PERMISSIONS?.CREATE_FOLDER,
          ]}
        >
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
        </PermissionsGuard>
      </Box>
      <Divider />
      <br />
    </Box>
  );
};
