import { Box, Divider, Typography } from '@mui/material';
import { ClosureRulesConditions } from '../ClosureRulesConditions';
import { useTheme } from '@mui/material';
import { IClosureRuleProps } from '../ClosureRule.interface';
import { getIncidentServicesClosureRuleDataArray } from './IncidentServicesClosureRule.data';

export const IncidentServicesClosureRule = (props: IClosureRuleProps) => {
  const theme = useTheme();
  const IncidentServicesClosureRuleDataArray =
    getIncidentServicesClosureRuleDataArray(props);

  return (
    <>
      {IncidentServicesClosureRuleDataArray?.map((section, sectionIndex) => (
        <Box key={section?.title} mt={sectionIndex > 0 ? 2 : 0}>
          <Typography variant="body1" mb={1}>
            Condition For{' '}
            <Typography variant="body1" fontWeight={600} component="span">
              {section?.title}
            </Typography>
          </Typography>

          <Box
            display={'flex'}
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap={2}
            border={`.1rem solid ${theme?.palette?.grey?.[700]}`}
            p={3}
          >
            {section?.conditions?.map((condition, conditionIndex) => (
              <Box
                key={condition?.conditionText}
                display="flex"
                flexDirection="row"
                alignItems="center"
              >
                <Box>
                  <Typography variant="body1" mb={2} fontWeight={600}>
                    {condition?.conditionText}
                  </Typography>
                  <ClosureRulesConditions {...condition?.props} />
                </Box>

                {conditionIndex < section?.conditions?.length - 1 && (
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      margin: '0 2rem',
                      border: `.1rem solid ${theme?.palette?.grey?.[700]}`,
                      backgroundColor: 'transparent',
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </>
  );
};
