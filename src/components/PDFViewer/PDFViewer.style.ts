export const styles = {
  pdfViewer: {
    position: 'relative',
    '& .react-pdf__Document': {
      overflow: 'auto',
      height: '530px',
    },
    '& .react-pdf__Page': {
      display: 'flex',
      justifyContent: 'center',
    },
  },
};
