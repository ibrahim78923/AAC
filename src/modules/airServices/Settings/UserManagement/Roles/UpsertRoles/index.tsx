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
import { FormProvider } from '@/components/ReactHookForm';
import {
  rolesAccordionsTicketsData,
  upsertRolesFormData,
} from './UpsertRoles.data';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useUpsertRoles from './useUpsertRoles';

const UpsertRoles = () => {
  const {
    router,
    roleId,
    methods,
    handleSubmit,
    onSubmit,
    theme,
    createEditTasksInTickets,
    createEditAnnouncements,
    editNotes,
  } = useUpsertRoles();

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

          <Grid xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5">Permissions</Typography>
          </Grid>

          <Grid item xs={12} my={2}>
            {(Object?.entries(rolesAccordionsTicketsData ?? {}) ?? [])?.map(
              ([title, data]: any) => (
                <Accordion
                  key={title}
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
                    ria-controls={`${title}-content`}
                    id={`${title}-header`}
                  >
                    <Typography>{title}</Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Typography variant="h5">Agent Can</Typography>
                      </Grid>
                      {data?.map((item: any) => (
                        <Grid item xs={12} md={item?.md} key={item?.id}>
                          <item.component
                            {...item?.componentProps}
                            size={'small'}
                          />
                          {item?.componentProps?.name === 'editNotes' &&
                            editNotes &&
                            item?.children && (
                              <item.children.component
                                key={item?.children?.id}
                                {...item?.children?.componentProps}
                                size={'small'}
                              />
                            )}
                          {item?.componentProps?.name ===
                            'createEditTasksInTickets' &&
                            createEditTasksInTickets &&
                            item?.children && (
                              <item.children.component
                                key={item?.children?.id}
                                {...item?.children?.componentProps}
                                size={'small'}
                              />
                            )}
                          {item?.componentProps?.name ===
                            'createEditAnnouncements' &&
                            createEditAnnouncements &&
                            item?.children && (
                              <item.children.component
                                key={item?.children?.id}
                                {...item?.children?.componentProps}
                                size={'small'}
                              />
                            )}
                        </Grid>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ),
            )}
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
