import { Box, Typography, useTheme } from '@mui/material';

const style = (title: string) => {
  let color;

  switch (title) {
    case 'Resolved':
      color = 'warning';
      break;

    case 'Pending':
      color = 'error';
      break;

    case 'Closed':
      color = 'success';
      break;

    default:
      color = 'info';
      break;
  }
  return color;
};

export default function TicketInfoBoardHeader({ title, total }: any) {
  const theme: any = useTheme();

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      borderBottom={`2px solid ${theme['palette'][`${style(title)}`]['main']}`}
      pb={0.5}
    >
      <Typography
        variant="h6"
        color={theme['palette'][`${style(title)}`]['main']}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        bgcolor={theme['palette'][`${style(title)}`]['main']}
        color={theme.palette.common.white}
        px={0.5}
        ml={1}
        borderRadius={1}
      >
        {total}
      </Typography>
    </Box>
  );
}
