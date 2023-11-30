import { Box, Divider, Typography } from '@mui/material';
import { ClosureRulesConditions } from '../ClosureRulesConditions';
import { useTheme } from '@mui/material';

export const IncidentClosureRule = () => {
  const theme = useTheme();
  return (
    <>
      <Typography variant="body1" mb={1}>
        Condition For Incident
      </Typography>
      <Box
        display={'flex'}
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={2}
        border={`.1rem solid ${theme?.palette?.grey?.[700]}`}
        p={3}
      >
        <Box>
          <Typography variant="body1" mb={2}>
            Close an Incident only if
          </Typography>
          <ClosureRulesConditions />
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            margin: '0 2rem',
            border: `.1rem solid ${theme?.palette?.grey[700]}`,
            backgroundColor: 'transparent',
          }}
        />
        <Box>
          <Typography variant="body1" mb={2}>
            Resolve an Incident only if
          </Typography>
          <ClosureRulesConditions />
        </Box>
      </Box>
    </>
  );
};
