import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { AddCircleSmallIcon, DownloadIcon } from '@/assets/icons';
import { styles } from './PageHeader.style';
import { AIR_SALES } from '@/routesConstants/paths';

const PageHeader = () => {
  const router = useRouter();
  return (
    <Box sx={styles?.pageHeader}>
      <Typography variant="h4" sx={styles?.pageHeaderTitle}>
        Quotes
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '18px' }}>
        <Button
          className="small"
          sx={styles?.actionButton}
          startIcon={<DownloadIcon />}
        >
          Download All
        </Button>
        <Button
          className="small"
          variant="contained"
          color="primary"
          startIcon={<AddCircleSmallIcon />}
          onClick={() => router?.push(AIR_SALES?.CREATE_QUOTES)}
        >
          Create Quote
        </Button>
      </Box>
    </Box>
  );
};

export default PageHeader;
