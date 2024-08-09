import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';
import { RHFCheckbox } from '@/components/ReactHookForm';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ApiErrorState from '@/components/ApiErrorState';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import usePermissionsAccordion from './usePermissionsAccordion';
import { AntSwitch } from '@/components/AntSwitch';
import { Fragment } from 'react';
import { pxToRem } from '@/utils/getFontValue';

const PermissionsAccordion = (props: any) => {
  const {
    isError,
    isLoading,
    isFetching,
    data,
    theme,
    switchChangeHandler,
    isSettingPermission,
    checkAllPermissions,
  } = usePermissionsAccordion(props);

  if (isError) return <ApiErrorState />;

  if (isLoading || isFetching) return <SkeletonTable />;

  return (
    <>
      {data?.data?.permissions?.map((parent: any) => (
        <Fragment key={parent?.name}>
          {isSettingPermission?.isLoading &&
          isSettingPermission?.name === parent?.name ? (
            <Box height={pxToRem(20)} width="100%" mb={2}>
              <LinearProgress sx={{ width: '100%', my: 2 }} />
            </Box>
          ) : (
            <Accordion
              key={parent?.name}
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
                  color: theme.palette?.common?.white,
                  borderRadius: '8px',
                },
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                },
                mt: 1,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                ria-controls={`${parent?.name}-content`}
                id={`${parent?.name}-header`}
              >
                <Box>
                  <AntSwitch
                    size="small"
                    checked={checkAllPermissions(parent)}
                    onChange={(e: any) => switchChangeHandler?.(e, parent)}
                    isLoading={
                      isSettingPermission?.isLoading &&
                      isSettingPermission?.name === parent?.name
                    }
                    disabled={isSettingPermission?.isLoading}
                  />
                </Box>
                <Typography>{parent?.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {parent?.subModules?.map((subModule: any) => (
                  <Accordion
                    key={subModule?.subModule}
                    disableGutters
                    sx={{
                      '& .MuiAccordionSummary-root': {
                        backgroundColor: 'inherit',
                        color: 'inherit',
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      ria-controls={`${subModule?.name}-content`}
                      id={`${subModule?.name}-header`}
                    >
                      <Typography>{subModule?.name}</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                      <Grid container spacing={1}>
                        {subModule?.permissions?.map((item: any) => (
                          <Grid item xs={12} md={4} key={item?.slug}>
                            <RHFCheckbox name={item?.slug} label={item?.name} />
                          </Grid>
                        ))}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </AccordionDetails>
            </Accordion>
          )}
        </Fragment>
      ))}
    </>
  );
};

export default PermissionsAccordion;
