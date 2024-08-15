import { EditGreyIcon } from '@/assets/icons';
import { truncateText } from '@/utils/avatarUtils';
import { DeleteForever } from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';

export const SingleFolderDetail = (props: any) => {
  const { setIsPortalOpen, selectedArticlesTab } = props;
  return (
    <>
      <Typography
        variant="h4"
        color="slateBlue.main"
        textTransform={'capitalize'}
      >
        {selectedArticlesTab?.name}
      </Typography>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        mb={1}
      >
        <Typography variant="body2" my={0.5} color="grey.900">
          {truncateText(selectedArticlesTab?.description || '---', 150)}
        </Typography>
        <Box display={'flex'} gap={2} alignItems={'center'}>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() =>
              setIsPortalOpen?.({
                isOpen: true,
                isUpsertFolder: true,
                data: selectedArticlesTab,
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
                  data: selectedArticlesTab,
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
