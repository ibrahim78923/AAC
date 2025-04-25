import { Theme } from '@mui/material';

export const styles = {
  attachmentPreview: (theme: Theme) => ({
    '& .previewLabel': {
      color: theme?.palette?.grey[600],
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '22px',
      marginBottom: '6px',
    },
    '& .previewInfobar': {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      backgroundColor: theme?.palette?.custom?.pale_grayish_blue,
      border: `1px solid ${theme?.palette?.custom?.border_grayish_blue}`,
      borderRadius: '6px',
      padding: '10px',

      '& .previewInfo': {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',

        '& .previewFileIcon': {
          height: '30px',
          width: '30px',
        },
        '& .previewFileName': {
          fontSize: '14px',
          lineHeight: '22px',
          color: theme?.palette?.slateBlue?.main,
        },
        '& .previewFileSize': {
          fontSize: '12px',
          lineHeight: '18px',
          color: theme?.palette?.custom?.light,
        },
      },

      '& .previewInfobarAction': {
        ml: 'auto',
      },
    },
  }),
  embedPdf: {
    height: '530px',
    position: 'relative',

    '& embed': {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
    },
  },

  pdfPreview: {
    display: 'flex',
    justifyContent: 'center',
    height: '530px',
    overflow: 'auto',
  },
};
