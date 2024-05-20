import { Box, Typography } from '@mui/material';
import { styles } from './TemplatePlaceholder.style';
import { TemplatePlaceholderIcon } from '@/assets/icons';

const TemplatePlaceholder = () => {
  return (
    <Box sx={styles?.container}>
      <Box>
        <TemplatePlaceholderIcon />
      </Box>
      <Typography sx={styles?.text} variant="body1" textAlign={'center'}>
        Enter aggregation type and property from left <br /> side option to see
        a view
      </Typography>
    </Box>
  );
};

export default TemplatePlaceholder;
