import { Box, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Used = () => {
  const theme: any = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };
  return (
    <Box>
      <Typography variant="body1" color={theme?.palette?.grey[900]}>
        {' '}
        <strong style={{ color: 'black' }}>4 </strong> (out of 4)
      </Typography>
      <Typography variant="body1" mb={2} color={theme?.palette?.grey[900]}>
        Number of deals with a value for this propery
      </Typography>
      <hr />

      <Box mt={2}>
        <Box
          display={'flex'}
          alignItems={'center'}
          color={theme?.palette?.primary?.main}
        >
          {isVisible ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
          <Typography
            variant="body2"
            onClick={handleToggle}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            Workflow(1)
          </Typography>
        </Box>
        {isVisible && (
          <Typography
            variant="body2"
            color={theme?.palette?.primary?.main}
            sx={{ cursor: 'pointer', userSelect: 'none' }}
            ml={2}
          >
            Forecast Category Mapping for Pipeline Sales Pipeline
          </Typography>
        )}
      </Box>
    </Box>
  );
};
export default Used;
