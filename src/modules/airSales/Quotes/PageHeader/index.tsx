import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { AddCircleSmallIcon, DownloadIcon } from '@/assets/icons';
import { styles } from './PageHeader.style';
import { AIR_SALES } from '@/routesConstants/paths';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_QUOTES_MANAGE_QUOTES_PERMISSIONS } from '@/constants/permission-keys';
import { LoadingButton } from '@mui/lab';
import DownloadQuote from '../DownloadQuote';

const PageHeader = (props: any) => {
  const { isDownloadQuote, setIsDownloadQuote, rowId } = props;
  const router = useRouter();

  return (
    <Box sx={styles?.pageHeader}>
      <Typography variant="h3" sx={styles?.pageHeaderTitle}>
        Quotes
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          width: { xs: '100%', md: 'auto', lg: 'auto' },
        }}
      >
        <PermissionsGuard
          permissions={[AIR_SALES_QUOTES_MANAGE_QUOTES_PERMISSIONS?.DOWNLOAD]}
        >
          <Button
            className="small"
            disabled={!rowId}
            sx={styles?.actionButton}
            startIcon={<DownloadIcon />}
            onClick={() => setIsDownloadQuote(true)}
          >
            Download
          </Button>
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            AIR_SALES_QUOTES_MANAGE_QUOTES_PERMISSIONS?.CREATE_QUOTES,
          ]}
        >
          <LoadingButton
            className="small"
            variant="contained"
            color="primary"
            startIcon={<AddCircleSmallIcon />}
            onClick={() => {
              router?.push(AIR_SALES?.CREATE_QUOTES);
            }}
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
          </LoadingButton>
        </PermissionsGuard>
      </Box>
      {isDownloadQuote && (
        <DownloadQuote
          isDownloadQuote={isDownloadQuote}
          setIsDownloadQuote={setIsDownloadQuote}
          rowId={rowId}
        />
      )}
    </Box>
  );
};

export default PageHeader;
