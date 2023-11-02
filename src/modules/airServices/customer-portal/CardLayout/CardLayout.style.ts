export const styles = {
  cardWrapper: {
    p: 2.4,
    position: 'relative',
    borderRadius: '0.75rem',
    background: 'white',
  },
  topRight: {
    top: '0.6rem',
    right: '1rem',
  },

  bottomCenter: {
    bottom: '.6rem',
    left: '50%',
    transform: 'translateX(-50%)',
  },

  viewMoreBtn: (btnPosition: string) => ({
    cursor: 'pointer',
    position: 'absolute',
    ...(btnPosition === 'center' ? styles?.bottomCenter : styles?.topRight),
  }),
};
