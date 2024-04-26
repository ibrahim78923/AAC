import { Box, Divider, Typography } from '@mui/material';
import { ClosureRulesConditions } from '../ClosureRulesConditions';
import { useTheme } from '@mui/material';

export const IncidentServicesClosureRule = (props: any) => {
  const {
    closeIncidentData,
    resolveIncidentData,
    serviceCloseData,
    serviceResolveData,
  } = props;
  const theme = useTheme();
  return (
    <>
      <Box>
        <Typography variant="body1" mb={1}>
          Condition For{' '}
          <Typography variant="body1" fontWeight={600} component="span">
            Incident
          </Typography>
        </Typography>
        <Box
          display={'flex'}
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap={2}
          border={`.1rem solid ${theme?.palette?.grey?.[700]}`}
          p={3}
        >
          <Box>
            <Typography variant="body1" mb={2} fontWeight={600}>
              Close an Incident only if
            </Typography>
            <ClosureRulesConditions
              closeIncident
              closeIncidentData={closeIncidentData}
            />
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
            <Typography variant="body1" mb={2} fontWeight={600}>
              Resolve an Incident only if
            </Typography>
            <ClosureRulesConditions
              resolveIncident
              resolveIncidentData={resolveIncidentData}
            />
          </Box>
        </Box>
      </Box>

      <Box mt={2}>
        <Typography variant="body1" mb={1}>
          Condition For{' '}
          <Typography variant="body1" fontWeight={600} component="span">
            Services Request
          </Typography>
        </Typography>
        <Box
          display={'flex'}
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap={2}
          border={`.1rem solid ${theme?.palette?.grey?.[700]}`}
          p={3}
        >
          <Box>
            <Typography variant="body1" mb={2} fontWeight={600}>
              Resolve an Incident only if
            </Typography>
            <ClosureRulesConditions
              serviceResolveIncident
              serviceResolveData={serviceResolveData}
            />
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
            <Typography variant="body1" mb={2} fontWeight={600}>
              Close an Incident only if
            </Typography>
            <ClosureRulesConditions
              serviceCloseIncident
              serviceCloseData={serviceCloseData}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};
