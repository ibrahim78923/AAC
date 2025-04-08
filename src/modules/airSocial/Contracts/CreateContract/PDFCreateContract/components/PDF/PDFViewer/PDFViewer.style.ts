export const styles = {
  pdfViewer: {
    position: 'relative',
    '& .react-pdf__Document': {
      overflowY: 'auto',
      height: '530px',
    },
    '& .react-pdf__Page': {
      display: 'flex',
      justifyContent: 'center',
    },
  },
};
