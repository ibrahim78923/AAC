import { Box, Checkbox, Grid, Typography } from '@mui/material';
import { documentFolderData } from './Folders.data';
import { v4 as uuidv4 } from 'uuid';
import useEmailMarketing from '../useEmailFolder.';
import { FolderIcon } from '@/assets/icons';
import { styles } from './Folders.style';
const Folders = () => {
  const { theme } = useEmailMarketing();
  return (
    <Grid container>
      {documentFolderData?.map((item: any) => {
        return (
          <Grid key={uuidv4()} item lg={3} md={3} sm={6} xs={12} p={1}>
            <Box
              sx={{
                border: `1.16px solid ${theme?.palette?.custom?.pale_gray}`,
                borderRadius: '11.56px',
                padding: '0.6rem',
              }}
              key={uuidv4()}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center',
                }}
              >
                <Checkbox />
              </Box>
              <Grid item lg={12} md={12} mt={-3}>
                <Box sx={styles?.folderBackground(theme)}>
                  <FolderIcon />
                </Box>
              </Grid>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <Typography
                  pt={1.7}
                  variant="h6"
                  sx={{
                    fontWeight: 500,
                    color: `${theme?.palette?.grey[600]}`,
                  }}
                >
                  {item?.folderName}
                </Typography>
                <Typography
                  variant="body3"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    color: `${theme?.palette?.grey[900]}`,
                    fontWeight: 400,
                  }}
                >
                  Created By:
                  <Typography
                    sx={{
                      color: `${theme?.palette?.custom?.main}`,
                      fontWeight: 500,
                    }}
                  >
                    {item?.createdBy}
                  </Typography>
                </Typography>
                <Typography
                  variant="body3"
                  pb={2}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    color: `${theme?.palette?.grey[900]}`,
                    fontWeight: 400,
                  }}
                >
                  Created Date:
                  <Typography
                    sx={{
                      color: `${theme?.palette?.custom?.main}`,
                      fontWeight: 500,
                    }}
                  >
                    {item?.createdAt}
                  </Typography>
                </Typography>
              </Grid>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};
export default Folders;
