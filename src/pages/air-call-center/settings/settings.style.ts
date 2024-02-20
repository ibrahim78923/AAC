export const styles = {
  main: () => ({
    display: 'flex',
    minHeight: 'calc(100vh - 70px)',
  }),
  sidebar: (theme: any) => ({
    width: '276px',
    radius: '8px 0 0 8px',
    borderRight: `1px solid ${theme?.palette?.graph?.slate_gray}`,
    height: '100%',
  }),
  content: () => ({
    flex: '1',
  }),
};
