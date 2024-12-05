export const styles = {
  root: {
    '& .dropzone-preview-all-types': {
      '& .dropzone-preview-upload': {},

      '& .dropzone-content': {
        // textAlign: 'left',
        // display: 'flex',
        // alignItems: 'center',
        // gap: '10px',

        '& .dropzone-icon': {
          // display: 'flex',
        },

        '& .dropzone-desc': {
          fontSize: '10.5px',
          lineHeight: '1.25047619',

          '& .dropzone-label': {
            fontSize: '10.5px',
            lineHeight: '1.25047619',
            '& > span': {
              fontWeight: '600',
            },
          },
          '& .dropzone-filetype': {
            fontSize: '10.5px',
            lineHeight: '1.25047619',
            display: 'block',
            mt: '5px',
          },
        },
      },
    },
  },
};
