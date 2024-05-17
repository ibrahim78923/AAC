export const styles = {
  toolbarCont: () => ({
    marginBottom: '12px',
    display: 'flex',
  }),
  toolbarSearch: () => ({
    flex: '1',
  }),
  toolbarActions: () => ({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '10px',
    ml: '10px',
  }),
  actions: () => ({}),
  restoreBtn: (theme: any) => ({
    color: theme?.palette?.custom['main'],
  }),
};
