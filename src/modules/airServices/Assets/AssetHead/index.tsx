import { Box, useTheme, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { PlusSharedIconColor, ExportShared, ImportIcon } from '@/assets/icons';

import { styles } from './AssetHead.style';

function AssetHead({ title, show, addTitle, onClick }: any) {
  const theme: any = useTheme();

  return (
    <>
      <Box sx={styles.mainBox}>
        <Box>
          <Typography sx={styles.typographyStyle(theme)}>{title}</Typography>
        </Box>

        {show === true ? (
          <Box sx={styles.buttonBox}>
            <Button
              sx={styles.buttonStyle(theme)}
              variant="outlined"
              startIcon={<ImportIcon />}
            >
              Import
            </Button>

            <Button
              sx={styles.buttonStyle(theme)}
              variant="outlined"
              startIcon={<ExportShared />}
            >
              Export
            </Button>

            <Button
              sx={styles.addButtonStyle(theme)}
              variant="outlined"
              startIcon={<PlusSharedIconColor />}
            >
              {addTitle}
            </Button>
          </Box>
        ) : (
          <Box sx={styles.buttonBox}>
            <Button
              sx={styles.addButtonStyle(theme)}
              variant="outlined"
              startIcon={<PlusSharedIconColor />}
              onClick={onClick}
            >
              {addTitle}
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}

export default AssetHead;
