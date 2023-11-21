import { Box, useTheme } from '@mui/material';
export const CardWrapper = ({ children }: any) => {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          borderRadius: '0.75rem',
          border: `0.063rem solid ${theme?.palette?.grey?.[700]}`,
          background: theme?.palette?.common?.white,
        }}
      >
        <br />
        {children}
      </Box>
    </>
  );
};
