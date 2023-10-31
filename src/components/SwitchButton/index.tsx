import { Switch, SwitchProps, styled } from '@mui/material';

import { styles } from './SwitchButton.style';

export const SwitchBtn = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  ...styles(theme),
}));
