import { EditGreyIcon } from '@/assets/icons';
import { DeleteForever } from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';
import { useSingleFolderDetail } from './useSingleFolderDetail';
import ApiErrorState from '@/components/ApiErrorState';
import { ALL_FOLDER } from '../Folder.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_FOLDER_LIST_PERMISSIONS } from '@/constants/permission-keys';
import { TruncateText } from '@/components/TruncateText';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';

const { CREATE_FOLDER } =
  AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_FOLDER_LIST_PERMISSIONS ?? {};

export const SingleFolderDetail = () => {
  const {
    showLoader,
    folderDataName,
    folderDataDescription,
    isError,
    refetch,
    openUpsertFolderPortal,
    openDeleteFolderPortal,
    selectedFolderId,
  } = useSingleFolderDetail();

  if (selectedFolderId === ALL_FOLDER) return <></>;

  if (showLoader) return <SkeletonForm length={1} height="10vh" />;

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
    <Box maxHeight={'20vh'} overflow="auto" mb={1}>
      <Typography variant="h4" component={'div'}>
        <TruncateText
          text={folderDataName?.toLowerCase()}
          size={45}
          boxProps={{
            textTransform: 'capitalize',
            color: 'slateBlue.main',
          }}
        />
      </Typography>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        gap={2}
      >
        <Typography variant="body2" flex={1} component={'div'}>
          <TruncateText
            text={!!folderDataDescription ? folderDataDescription : '---'}
            size={100}
            boxProps={{ my: 0.5, color: 'grey.900' }}
          />
        </Typography>

        <PermissionsGuard permissions={[CREATE_FOLDER]}>
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
    </Box>
  );
};
