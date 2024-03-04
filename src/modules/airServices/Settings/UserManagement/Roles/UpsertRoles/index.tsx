import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';

import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  rolesAccordionsTicketsData,
  upsertRolesDefaultValues,
  upsertRolesFormData,
  upsertRolesValidationSchema,
} from './UpsertRoles.data';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const UpsertRoles = () => {
  const router: any = useRouter();
  const theme: any = useTheme();

  const methods: any = useForm({
    resolver: yupResolver(upsertRolesValidationSchema),
    defaultValues: upsertRolesDefaultValues,
  });

  const { handleSubmit } = methods;

  // const editNotes = watch('editNotes');
  // const createEditTasksInTickets = watch('createEditTasksInTickets');
  // const createEditAnnouncements = watch('createEditAnnouncements');

  const onSubmit = async () => {};

  return (
    <>
      <Box display={'flex'} alignItems={'center'} gap={1} mb={2}>
        <ArrowBackIcon
          onClick={() => router?.push(AIR_SERVICES?.USER_ROLES_SETTINGS)}
          sx={{ cursor: 'pointer' }}
        />
        <Typography variant="h3">Add New Role</Typography>
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
                        </Grid>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ),
            )}
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};

export default UpsertRoles;
