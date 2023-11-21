export const styles = {
  boardContainer: () => ({
    overflowX: 'auto',
  }),
  boardRow: () => ({
    display: 'grid',
    columnGap: '16px',
    gridTemplateColumns: 'repeat(auto-fill, 282px)',
    gridAutoFlow: 'column',
  }),
  boardColumn: () => ({}),
};
