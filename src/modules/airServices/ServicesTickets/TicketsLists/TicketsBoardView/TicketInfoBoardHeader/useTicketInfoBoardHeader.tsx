import { useTheme } from '@mui/material';

export default function useTicketInfoBoardHeader() {
  const theme: any = useTheme();

  const formatTotal = (value: number) =>
    value < 10 ? `0${value}` : `${value}`;
  return { theme, formatTotal };
}
