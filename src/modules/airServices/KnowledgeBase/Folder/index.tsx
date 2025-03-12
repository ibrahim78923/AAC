import { Box, Typography } from '@mui/material';
import { FolderGreyIcon } from '@/assets/icons';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useFolder } from './useFolder';
import { truncateText } from '@/utils/avatarUtils';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';

export const Folder = () => {
  const {
    showLoader,
    showError,
    foldersList,
    getArticlesFolderListForFilterData,
    setFolder,
    selectedFolder,
    theme,
  } = useFolder();

  return (
    <ApiRequestFlow
      showSkeleton={showLoader}
      hasError={showError}
      refreshApi={getArticlesFolderListForFilterData}
      skeletonType={SKELETON_TYPES?.BASIC_CARD}
      cardSkeletonType={
        SKELETON_TYPES?.SMALL_HORIZONTAL_TWO_LAYER_CIRCULAR_CARD
      }
      length={6}
    >
      <Box
        sx={{
          maxHeight: '70vh',
          overflowY: 'auto',
        }}
      >
        {foldersList?.map((tab: AutocompleteAsyncOptionsI) => (
          <Box
            key={tab?._id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 1,
              backgroundColor:
                tab?._id === selectedFolder?._id ? 'grey.400' : 'common.white',
              borderRadius: '0.5rem',
              cursor: 'pointer',
            }}
            onClick={() => setFolder?.(tab)}
          >
            <FolderGreyIcon
              fill={
                theme?.palette?.grey?.[
                  tab?._id === selectedFolder?._id ? '800' : '900'
                ]
              }
            />
            <Typography
              sx={{
                color:
                  tab?._id === selectedFolder?._id
                    ? 'grey.800'
                    : 'slateBlue.main',
                textTransform: 'capitalize',
                fontWeight:
                  tab?._id === selectedFolder?._id
                    ? 'fontWeightSmall'
                    : 'fontWeightRegular',
              }}
            >
              {truncateText(tab?.name?.toLowerCase(), 15)}
            </Typography>
          </Box>
        ))}
      </Box>
    </ApiRequestFlow>
  );
};
