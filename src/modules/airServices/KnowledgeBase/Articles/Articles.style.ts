import { useTheme } from '@mui/material/styles';
export const styles = () => {
  const { palette }: any = useTheme();
  return {
    tabWrapper: (tab: string, selectedArticlesTab: string) => ({
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      p: 1,
      background:
        tab === selectedArticlesTab ? palette?.grey?.['400'] : 'white',
      borderRadius: '0.5rem',
      cursor: 'pointer',
    }),
    selectedTabColor: (tab: string, selectedArticlesTab: string) =>
      palette?.grey?.[tab === selectedArticlesTab ? '800' : '900'],
    articleStatus: (status: string) => ({
      backgroundColor:
        status?.toLocaleLowerCase() === 'published'
          ? palette?.blue?.main
          : palette?.grey?.['400'],
      color:
        status?.toLocaleLowerCase() === 'published'
          ? 'white'
          : palette?.slateBlue?.main,
      padding: '0.25rem 0.75rem',
      borderRadius: '1rem',
      textTransform: 'capitalize',
    }),
  };
};
