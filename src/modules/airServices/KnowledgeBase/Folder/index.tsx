import { Box, Typography } from '@mui/material';
import { FolderGreyIcon } from '@/assets/icons';
import ApiErrorState from '@/components/ApiErrorState';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { useFolder } from './useFolder';
import { truncateText } from '@/utils/avatarUtils';

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

  if (showLoader) return <SkeletonTable />;

  if (showError)
    return (
      <ApiErrorState canRefresh refresh={getArticlesFolderListForFilterData} />
    );

  return (
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
            background:
              tab?._id === selectedFolder?._id
                ? theme?.palette?.grey?.['400']
                : 'common.white',
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
            color={
              theme?.palette?.grey?.[
                tab?._id === selectedFolder?._id ? '800' : '900'
              ]
            }
            textTransform={'capitalize'}
          >
            {truncateText(tab?.name, 15)}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
