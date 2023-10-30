import { useTheme } from '@mui/material/styles';
export const styles = () => {
  const { palette }: any = useTheme();
  return {
    mainContainerBox: {
      backgroundColor: palette.primary.light,
      width: '100%',
      borderRadius: '0.375rem',
    },
    childContainerBox: {
      display: 'flex',
      alignItems: 'center',
      padding: '1.25rem',
    },
    borderBox: {
      borderBottom: `1px solid ${palette.grey[700]}`,
      height: '2vh',
    },
  };
};
