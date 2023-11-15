export const styles = {
  calendarHeader: () => ({
    border: `1px solid red`,
    borderRadius: '8px',
    boxShadow: `0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A`,
  }),
  parentBox: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60vw',
    bgcolor: '#fff',
    p: 2,
    borderRadius: '20px',
    '@media (max-width:1200px)': {
      width: '60vw',
    },
    '@media (max-width:581px)': {
      width: '90vw',
    },
  },
};
