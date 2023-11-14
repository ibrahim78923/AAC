export const styles = {
  mainWrapperPdfViewer: () => {
    return {
      backgroundColor: '#0000007a',
      width: '100%',
      height: '100vh',
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '10000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
  },
  pdfPreviewContainer: () => {
    return {
      backgroundColor: '#00000030',
      width: '40vw',
      height: '85vh',
      borderRadius: '10px',
      overflow: 'hidden',
    };
  },
  header: (theme: any) => {
    return {
      background: theme.palette.common.black,
      width: '100%',
      height: '65px',
    };
  },
};
