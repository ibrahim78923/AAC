export const styles = () => {
  return {
    tabWrapper: (tab: string, selectedArticlesTab: string, theme: any) => ({
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      p: 1,
      background:
        tab === selectedArticlesTab ? theme?.palette?.grey?.['400'] : 'white',
      borderRadius: '0.5rem',
      cursor: 'pointer',
    }),
    selectedTabColor: (tab: string, selectedArticlesTab: string, theme: any) =>
      theme?.palette?.grey?.[tab === selectedArticlesTab ? '800' : '900'],
  };
};
