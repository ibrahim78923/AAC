import { Box, Typography } from '@mui/material';
import { FolderGreyIcon } from '@/assets/icons';
import ApiErrorState from '@/components/ApiErrorState';
import { FolderComponentPropsI } from '../Articles/Articles.interface';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

export const Folder = (props: FolderComponentPropsI) => {
  const {
    setFolder,
    selectedArticlesTab,
    isLoading,
    isFetching,
    isError,
    refetch,
    foldersList,
    theme,
  } = props;

  if (isLoading || isFetching) return <SkeletonTable />;
  if (isError) return <ApiErrorState canRefresh refresh={() => refetch?.()} />;

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
              tab?._id === selectedArticlesTab?._id
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
                tab?._id === selectedArticlesTab?._id ? '800' : '900'
              ]
            }
          />
          <Typography
            color={
              theme?.palette?.grey?.[
                tab?._id === selectedArticlesTab?._id ? '800' : '900'
              ]
            }
            textTransform={'capitalize'}
          >
            {tab?.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
