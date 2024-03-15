import { Box, Button, Typography } from '@mui/material';

export const CardLayout = ({
  title,
  btnClick,
  btnPosition,
  buttonText = 'View All',
  maxHeight = 222,
  children,
}: any) => {
  return (
    <Box bgcolor={'common.white'} p={2} borderRadius={4} height="100%">
      <Box
        display={'flex'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={1}
        mb={0.5}
        justifyContent={'space-between'}
      >
        <Typography fontWeight={600} color="grey.800">
          {title}
        </Typography>
        {btnPosition !== 'center' && (
          <Button variant="text" onClick={() => btnClick(title)}>
            {buttonText}
          </Button>
        )}
      </Box>
      <Box sx={{ height: maxHeight, overflowY: 'scroll' }}>{children}</Box>
      {btnPosition === 'center' && (
        <Box textAlign={'center'}>
          <Button variant="text" fullWidth onClick={() => btnClick(title)}>
            {buttonText}
          </Button>
        </Box>
      )}
    </Box>
  );
};
