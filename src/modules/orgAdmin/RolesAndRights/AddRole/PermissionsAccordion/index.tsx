import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Stack,
  Box,
  FormControlLabel,
} from '@mui/material';

import { SwitchBtn } from '@/components/SwitchButton';

import usePermissionAccordion from './usePermissionAccordion';
import DashboardAccordion from './DashboardAccordion';

import { v4 as uuidv4 } from 'uuid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PermissionsAccordion = (props: any) => {
  const { permissionsData } = props;
  const {
    theme,
    // commented for future use
    // isAccordionExpanded,
    //  handleExpandAccordionChange
  } = usePermissionAccordion();

  return (
    <Stack gap={3}>
      {permissionsData?.data?.map((item: any) => (
        <Accordion
          key={uuidv4()}
          // expanded={isAccordionExpanded === item?.module?.toLowerCase()}
          // onChange={handleExpandAccordionChange(
          //   item?.module?.toLowerCase(),
          // )}
          disableGutters
          sx={{
            '&.MuiAccordion': {
              '&.Mui-expanded': {
                boxShadow: 'theme.customShadows.z8',
                borderRadius: '8px',
              },
              '&.Mui-disabled': {
                backgroundColor: 'transparent',
              },
            },
            '& .MuiAccordionSummary-root': {
              backgroundColor: theme?.palette?.blue?.main,
              color: theme.palette.common.white,
              borderRadius: '8px',
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="dashboard"
            id="dashboard"
          >
            <Box display="flex" alignItems="center">
              <FormControlLabel control={<SwitchBtn />} label="" />
              <Typography variant="h4" fontWeight={700}>
                {item?.name}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <DashboardAccordion subModules={item?.subModules} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
};

export default PermissionsAccordion;
