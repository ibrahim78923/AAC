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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { DRAWER_TYPES, ROLES_AND_RIGHTS_CONST } from '@/constants/strings';
import { v4 as uuidv4 } from 'uuid';
import { PermissionsAccordionInterface } from './PermissionsAccordion.interface';

const PermissionsAccordion = (props: PermissionsAccordionInterface) => {
  const {
    selectAllPermissions,
    getModulePermissions,
    permissionsData,
    disabled,
    watch,
    query,
  } = props;

  const {
    theme,
    selectedModule,
    handleExpandAccordionChange,
    handleChangeSubModule,
    selectedSubModule,
  } = usePermissionAccordion();

  const dataArray =
    query?.type === DRAWER_TYPES?.VIEW
      ? permissionsData?.permissions
      : permissionsData?.data;

  return (
    <Stack gap={3}>
      {dataArray?.map((item: any) => (
        <>
          <Accordion
            key={uuidv4()}
            expanded={selectedModule === item?.name?.toLowerCase()}
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
              expandIcon={
                <ExpandMoreIcon
                  onClick={() => {
                    handleExpandAccordionChange(item?.name?.toLowerCase());
                  }}
                />
              }
              aria-controls="dashboard"
              id="dashboard"
            >
              <Box display="flex" alignItems="center">
                <FormControlLabel
                  control={
                    <SwitchBtn
                      disabled={disabled}
                      checked={getModulePermissions(item?.subModules)?.every(
                        (permission: any) =>
                          watch(ROLES_AND_RIGHTS_CONST?.PERMISSIONS)?.includes(
                            permission,
                          ),
                      )}
                      handleSwitchChange={() =>
                        selectAllPermissions(item?.subModules)
                      }
                    />
                  }
                  label=""
                />

                <Typography variant="h4" fontWeight={700}>
                  {item?.name}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <DashboardAccordion
                subModules={item?.subModules}
                disabled={disabled}
                handleChangeSubModule={handleChangeSubModule}
                selectedSubModule={selectedSubModule}
              />
            </AccordionDetails>
          </Accordion>
        </>
      ))}
    </Stack>
  );
};

export default PermissionsAccordion;
