export const styles = {
  pdfViewer: {
    overflowY: 'auto',
    height: '530px',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    position: 'relative',
    '& .react-pdf__Page': {
      display: 'flex',
      justifyContent: 'center',
    },
  },
};
