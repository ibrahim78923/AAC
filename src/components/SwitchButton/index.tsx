import { Switch, styled } from '@mui/material';
import { styles } from './SwitchButton.style';

export const SwitchBtn = styled(({ handleSwitchChange, ...props }: any) => (
  <Switch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
    onChange={handleSwitchChange}
  />
))(({ theme }) => ({
  ...styles(theme),
}));
