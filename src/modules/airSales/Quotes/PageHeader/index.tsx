import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { AddCircleSmallIcon, DownloadIcon } from '@/assets/icons';
import { styles } from './PageHeader.style';
import { AIR_SALES } from '@/routesConstants/paths';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_QUOTES_MANAGE_QUOTES_PERMISSIONS } from '@/constants/permission-keys';

const PageHeader = () => {
  const router = useRouter();
  return (
    <Box sx={styles?.pageHeader}>
      <Typography variant="h4" sx={styles?.pageHeaderTitle}>
        Quotes
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          width: { xs: '100%', md: 'auto', lg: 'auto' },
        }}
      >
        <PermissionsGuard
          permissions={[AIR_SALES_QUOTES_MANAGE_QUOTES_PERMISSIONS?.DOWNLOAD]}
        >
          <Button
            className="small"
            sx={styles?.actionButton}
            startIcon={<DownloadIcon />}
          >
            Download All
          </Button>
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            AIR_SALES_QUOTES_MANAGE_QUOTES_PERMISSIONS?.CREATE_QUOTES,
          ]}
        >
          <Button
            className="small"
            variant="contained"
            color="primary"
            startIcon={<AddCircleSmallIcon />}
            onClick={() => router?.push(AIR_SALES?.CREATE_QUOTES)}
            sx={{
              width: { xs: '100%', sm: 'fit-Content' },
              marginTop: {
                xs: '15px !important',
                sm: '0px !important',
                md: '0px !important',
              },
              marginLeft: { xs: '0px !important', sm: '15px !important' },
            }}
          >
            Create Quote
          </Button>
        </PermissionsGuard>
      </Box>
    </Box>
  );
};

export default PageHeader;
