import {
  AlertModalCloseIcon,
  CopyIcon,
  EmbedCodeIcon,
  EmbedcodeTickIcon,
} from '@/assets/icons';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { styles } from './Overview.style';
import useOverview from './useOverview';

const Overview = ({ data }: any) => {
  const {
    isEmbedDialogOpen,
    handleOpenEmbedDialog,
    handleCloseEmbedDialog,
    isCopiedURL,
    isCopiedCode,
    handleCopyURL,
    handleCopyEmbededCode,
  } = useOverview();

  return (
    <Box>
      <Typography variant="h5" sx={styles?.heading}>
        Basic Info
      </Typography>
      <Grid container spacing={'40px'}>
        <Grid item xs={12} sm={8} md={4}>
          <Box sx={styles?.fieldLabel}>Name</Box>
          <Box sx={styles?.nameField}>{data?.name}</Box>
        </Grid>

        <Grid item xs={12} sm={8} md={4}>
          <Box sx={styles?.fieldLabel}>URL</Box>
          <Box sx={styles?.nameField} className="fieldURL">
            <Box component="span">{'https://forms.activitytok.eu/forms/'}</Box>
            <Tooltip
              open={isCopiedURL}
              title="Copied"
              placement="top"
              arrow
              key="copy-url"
            >
              <IconButton
                size="small"
                onClick={() =>
                  handleCopyURL('https://forms.activitytok.eu/forms/')
                }
              >
                <CopyIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>

      <Button
        variant="outlined"
        startIcon={<EmbedCodeIcon />}
        sx={styles?.embedBtn}
        className="medium"
        onClick={handleOpenEmbedDialog}
      >
        Embed Code
      </Button>

      <Dialog
        open={isEmbedDialogOpen}
        onClose={handleCloseEmbedDialog}
        fullWidth
        maxWidth={'sm'}
      >
        <DialogTitle sx={{ padding: '20px 20px 0px' }}>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={1}
          >
            <Box display={'flex'} alignItems={'center'} gap={1}>
              <EmbedcodeTickIcon />
              <Typography variant="h3">Embed Code</Typography>
            </Box>

            <Box sx={{ cursor: 'pointer' }} onClick={handleCloseEmbedDialog}>
              <AlertModalCloseIcon />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ padding: '20px' }}>
          <Box sx={styles?.dialogContent}>
            <Typography variant="body2" sx={styles?.dialogCode}>
              <pre>
                <code style={{ whiteSpace: 'pre-wrap' }}>
                  {data?.htmlTemplate}
                </code>
              </pre>
            </Typography>
            <Tooltip
              open={isCopiedCode}
              title="Copied"
              placement="top"
              arrow
              key="copy-code"
            >
              <Box
                sx={styles?.copyBtn}
                onClick={() => handleCopyEmbededCode(data?.htmlTemplate)}
              >
                <CopyIcon />
              </Box>
            </Tooltip>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Overview;
