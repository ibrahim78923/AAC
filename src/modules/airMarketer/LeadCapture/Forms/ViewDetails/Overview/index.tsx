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
import { formStatus } from '@/constants/form-builder';
import { FE_BASE_URL } from '@/config';
import { PUBLIC_LEAD_CAPTURE } from '@/routesConstants/paths';
import { renderIframeToString } from '@/utils/leadcapture-forms';

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
          <Box sx={styles?.nameField}>{data?.form?.name}</Box>
        </Grid>
        {data?.form?.status === formStatus?.published && (
          <Grid item xs={12} sm={8} md={4}>
            <Box sx={styles?.fieldLabel}>URL</Box>
            <Box sx={styles?.nameField} className="fieldURL">
              <Box component="span">
                {`${FE_BASE_URL}${PUBLIC_LEAD_CAPTURE?.FORM}?id=${data?.form?._id}`}
              </Box>
              <Tooltip
                open={isCopiedURL}
                title="Copied"
                placement="top"
                arrow
                key="copy-url"
              >
                <IconButton
                  disabled={data?.form?.status === formStatus?.draft}
                  size="small"
                  onClick={() =>
                    handleCopyURL(
                      `${FE_BASE_URL}${PUBLIC_LEAD_CAPTURE?.FORM}?id=${data?.form?._id}`,
                    )
                  }
                >
                  <CopyIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        )}
      </Grid>

      <Button
        variant="outlined"
        startIcon={<EmbedCodeIcon />}
        sx={styles?.embedBtn}
        className="medium"
        onClick={handleOpenEmbedDialog}
        disabled={data?.form?.status === formStatus?.draft}
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
            <Box sx={styles?.dialogCode}>
              <pre>
                <code
                  style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                >
                  {renderIframeToString(data?.form?._id)}
                </code>
              </pre>
            </Box>
            <Tooltip
              open={isCopiedCode}
              title="Copied"
              placement="top"
              arrow
              key="copy-code"
            >
              <Box
                sx={styles?.copyBtn}
                onClick={() =>
                  handleCopyEmbededCode(renderIframeToString(data?.form?._id))
                }
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
