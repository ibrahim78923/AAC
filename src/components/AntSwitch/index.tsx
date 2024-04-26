import { CircularProgress, Switch, styled } from '@mui/material';
import { styles } from './AntSwitch.style';

export const AntSwitch = styled(({ isLoading, ...other }: any) => {
  return isLoading ? <CircularProgress size={24} /> : <Switch {...other} />;
})(({ theme }) => styles(theme));
