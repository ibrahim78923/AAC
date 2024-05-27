import React from 'react';
import { Box, Grid, Tooltip, Typography, useTheme } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import {
  teamDurationArray,
  teamDurationDefaultValues,
  teamDurationValidationSchema,
} from './TeamDuration.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TemplateFrame from '../Describe/TemplateFrame';
import TemplateBasic from '../Describe/TemplateBasic';
import Link from 'next/link';
import { HeaderInfoIcon } from '@/assets/icons';
import { createGoal } from '@/constants';

const TeamDuration = () => {
  const theme = useTheme();

  const methods: any = useForm({
    resolver: yupResolver(teamDurationValidationSchema),
    defaultValues: teamDurationDefaultValues,
  });

  const { handleSubmit, watch } = methods;
  const onSubmit = async () => {};
  const userTeamValue = watch('userTeam');
  return (
    <Grid container xs={12} spacing={2}>
      <Grid item md={6} xs={12}>
        <FormProvider methods={methods} handleSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            {teamDurationArray(userTeamValue)?.map((item: any) => (
              <Grid
                item
                xs={12}
                md={item?.md}
                key={uuidv4()}
                sx={{ position: 'relative' }}
              >

                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
                {item?.componentProps?.name === createGoal?.setting && (
                  <Link
                    href=""
                    style={{
                      color: theme?.palette?.primary?.main,
                      marginLeft: '-10px',
                    }}
                  >
                    View Settings
                  </Link>
                )}

                {item?.componentProps?.name === createGoal?.userTeam &&
                  userTeamValue === createGoal?.team && (
                    <Box
                      sx={{ position: 'absolute', top: '22px', left: '182px' }}
                    >

                      <Tooltip
                        title={
                          <Typography variant="body4">
                            No teams set up; assign users for <br /> tracking,
                            go to settings to assign <br /> users to a team.
                          </Typography>
                        }
                        placement="top-start"
                        arrow
                        sx={{ width: 'fit-content', cursor: 'pointer' }}
                      >
                        <Box>
                          {' '}
                          <HeaderInfoIcon />{' '}
                        </Box>
                      </Tooltip>
                    </Box>

                  )}
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Grid>

      <Grid item md={6} xs={12}>
        <TemplateFrame>
          <TemplateBasic />
        </TemplateFrame>
      </Grid>
    </Grid>
  );
};

export default TeamDuration;
