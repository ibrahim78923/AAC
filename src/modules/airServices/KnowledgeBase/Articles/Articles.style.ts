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
    articleStatus: (status: string, theme: any) => ({
      backgroundColor:
        status?.toLocaleLowerCase() === 'published'
          ? theme?.palette?.blue?.main
          : theme?.palette?.grey?.['400'],
      color:
        status?.toLocaleLowerCase() === 'published'
          ? 'white'
          : theme?.palette?.slateBlue?.main,
      padding: '0.25rem 0.75rem',
      borderRadius: '1rem',
      textTransform: 'capitalize',
    }),
  };
};
