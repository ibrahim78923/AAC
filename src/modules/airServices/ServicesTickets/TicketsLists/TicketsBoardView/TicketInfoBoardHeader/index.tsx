import { Box, Typography } from '@mui/material';
import { ticketInfoBoardHeaderColor } from './TicketInfoBoardHeader.data';
import useTicketInfoBoardHeader from './useTicketInfoBoardHeader';

export default function TicketInfoBoardHeader({ title, total }: any) {
  const { theme, formatTotal } = useTicketInfoBoardHeader();

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      borderBottom={`2px solid ${theme?.['palette']?.[
        `${ticketInfoBoardHeaderColor(title)}`
      ]?.['main']}`}
      pb={0.5}
      px={2}
    >
      <Typography
        variant="h6"
        color={
          theme?.['palette']?.[`${ticketInfoBoardHeaderColor(title)}`]?.['main']
        }
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        bgcolor={
          theme?.['palette']?.[`${ticketInfoBoardHeaderColor(title)}`]?.['main']
        }
        color={theme?.palette?.common?.white}
        px={0.5}
        ml={1}
        borderRadius={1}
      >
        {formatTotal(total)}
      </Typography>
    </Box>
  );
}
