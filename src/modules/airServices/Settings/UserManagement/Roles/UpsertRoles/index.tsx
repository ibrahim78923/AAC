import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { AIR_SERVICES } from '@/constants';
import { FormProvider, RHFCheckbox } from '@/components/ReactHookForm';
import { upsertRolesFormData } from './UpsertRoles.data';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useUpsertRoles from './useUpsertRoles';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { Fragment } from 'react';

const UpsertRoles = () => {
  const {
    router,
    roleId,
    methods,
    handleSubmit,
    onSubmit,
    theme,
    getPermissionsIsLoading,
    getPermissionsIsFetching,
    getPermissionsIsError,
    getPermissionsData,
  } = useUpsertRoles();

  if (getPermissionsIsError) return <ApiErrorState />;

  if (getPermissionsIsLoading || getPermissionsIsFetching)
    return <SkeletonTable />;

  return (
    <>
      <Box display={'flex'} alignItems={'center'} gap={1} mb={2}>
        <ArrowBackIcon
          onClick={() => router?.push(AIR_SERVICES?.USER_ROLES_SETTINGS)}
          sx={{ cursor: 'pointer' }}
        />
        <Typography variant="h3">
          {roleId ? `Update Role` : `Add New Role`}
        </Typography>
      </Box>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          {upsertRolesFormData?.map((item: any) => (
            <Grid item xs={12} key={item?.id}>
              <Box width={'50%'}>
                <item.component {...item?.componentProps} size={'small'} />
              </Box>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5">Permissions</Typography>
          </Grid>
          <Grid item xs={12} my={2}>
            {getPermissionsData?.data?.map((parent: any) => (
              <Fragment key={parent?.name}>
                {parent?.subModules?.map((subModule: any) => (
                  <Accordion
                    key={subModule?.subModule}
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
                      mt: 1,
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
              </Fragment>
            ))}
          </Grid>

          <Grid item xs={12} textAlign={'end'}>
            <Button
              type={'button'}
              variant={'outlined'}
              color={'inherit'}
              sx={{ mr: 2 }}
              onClick={() => router?.push(AIR_SERVICES?.USER_ROLES_SETTINGS)}
            >
              Cancel
            </Button>
            <Button type={'submit'} variant={'contained'}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};

export default UpsertRoles;
