import { Box, Typography } from '@mui/material';
import { styles } from './TemplatePlaceholder.style';
import { TemplatePlaceholderIcon } from '@/assets/icons';

const TemplatePlaceholder = () => {
  return (
    <Box sx={styles?.container}>
      <Box>
        <TemplatePlaceholderIcon />
      </Box>
      <Typography sx={styles?.text} variant="body1">
        You haven’t chosen any template yet.
      </Typography>
    </Box>
  );
};

export default TemplatePlaceholder;
