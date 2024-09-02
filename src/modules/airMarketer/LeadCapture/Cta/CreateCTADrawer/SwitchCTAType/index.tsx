import { Box, Button, Typography } from '@mui/material';
import { styles } from './SwitchCTAType.style';
import { BUTTON_TYPE } from '../CtaEditorDrawer.data';

export default function SwitchCTAType({
  handleSwitch,
  ctaType,
  disabled,
}: any) {
  return (
    <Box sx={styles?.wrapper}>
      <Button
        onClick={() => handleSwitch(BUTTON_TYPE?.customized)}
        variant={'text'}
        sx={styles?.switchButton}
        className={ctaType === BUTTON_TYPE?.customized ? 'active' : ''}
        disabled={disabled}
      >
        <Typography variant="body3">Customized Button</Typography>
      </Button>
      <Button
        onClick={() => handleSwitch(BUTTON_TYPE?.image)}
        variant={'text'}
        sx={styles?.switchButton}
        className={ctaType === BUTTON_TYPE?.image ? 'active' : ''}
        disabled={disabled}
      >
        <Typography variant="body3">Image Button</Typography>
      </Button>
    </Box>
  );
}
