export const styles = {
  countBox: { display: 'flex', gap: 1, alignItems: 'center' },

  associationCount: (theme: any) => {
    return {
      padding: '4px 7px 2px 5px',
      background: theme?.palette?.blue?.main,
      color: 'white',
      borderRadius: '4px',
    };
  },
};
