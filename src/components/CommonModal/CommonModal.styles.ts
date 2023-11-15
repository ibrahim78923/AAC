export const styles = {
  parentBox: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30vw',
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
  headingText: {
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '24px',
    color: '#4B5563',
  },
};
