import { Switch, styled } from '@mui/material';

import { styles } from './SwitchButton.style';

export const SwitchBtn = styled((props: any) => (
  <Switch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
    onChange={props.handleSwitchChange}
  />
))(({ theme }) => ({
  ...styles(theme),
}));
