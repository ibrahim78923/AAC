import { Switch, styled } from '@mui/material';
import { styles } from './AntSwitch.style';

export const AntSwitch = styled(({ ...other }: any) => {
  return <Switch {...other} />;
})(({ theme }) => styles(theme));
